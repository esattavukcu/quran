/**
 * Fetches additional Turkish translations from acikkuran.com API
 * and merges them into existing public/data/surahs/{n}.json files.
 *
 * Usage: npx tsx scripts/add-translations.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const AUTHORS = [
  { id: 14,  key: 'elmali',       name: 'Elmalılı Hamdi Yazır' },
  { id: 38,  key: 'islamoglu',    name: 'Mustafa İslamoğlu' },
  { id: 6,   key: 'bulac',        name: 'Ali Bulaç' },
  { id: 22,  key: 'esed',         name: 'Muhammed Esed' },
  { id: 52,  key: 'suleymaniye',  name: 'Süleymaniye Vakfı' },
  { id: 27,  key: 'ates',         name: 'Süleyman Ateş' },
  { id: 3,   key: 'hulusi',       name: 'Ahmed Hulusi' },
  { id: 8,   key: 'bayrakli',     name: 'Bayraktar Bayraklı' },
  { id: 15,  key: 'elmali_sade',  name: 'Elmalılı (Sadeleştirilmiş)' },
  { id: 19,  key: 'cantay',       name: 'Hasan Basri Çantay' },
  { id: 25,  key: 'piris',        name: 'Şaban Piriş' },
  { id: 26,  key: 'yildirim',     name: 'Suat Yıldırım' },
  { id: 51,  key: 'safa',         name: 'Ali Rıza Safa' },
  { id: 104, key: 'yuksel',       name: 'Edip Yüksel' },
  { id: 105, key: 'aktas',        name: 'Erhan Aktaş' },
  { id: 107, key: 'okuyan',       name: 'Mehmet Okuyan' },
];

const SURAH_DIR = path.join(process.cwd(), 'public', 'data', 'surahs');
const DELAY_MS = 300; // rate limit

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchSurahTranslation(surahId: number, authorId: number): Promise<Record<number, string>> {
  const url = `https://api.acikkuran.com/surah/${surahId}?author=${authorId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();
  const result: Record<number, string> = {};
  for (const verse of data.data.verses) {
    result[verse.verse_number] = verse.translation?.text || '';
  }
  return result;
}

async function main() {
  const surahFiles = fs.readdirSync(SURAH_DIR)
    .filter(f => f.endsWith('.json'))
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Found ${surahFiles.length} surah files`);
  console.log(`Adding ${AUTHORS.length} translations: ${AUTHORS.map(a => a.key).join(', ')}\n`);

  for (const file of surahFiles) {
    const surahNum = parseInt(file);
    const filePath = path.join(SURAH_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Check which authors already done
    const firstAyah = data.ayahs[0];
    const needed = AUTHORS.filter(a => !firstAyah[a.key]);

    if (needed.length === 0) {
      console.log(`  Surah ${surahNum.toString().padStart(3)}: SKIP (all translations exist)`);
      continue;
    }

    process.stdout.write(`  Surah ${surahNum.toString().padStart(3)}: fetching ${needed.map(a => a.key).join(', ')}...`);

    for (const author of needed) {
      try {
        const translations = await fetchSurahTranslation(surahNum, author.id);
        for (const ayah of data.ayahs) {
          ayah[author.key] = translations[ayah.numberInSurah] || '';
        }
        await sleep(DELAY_MS);
      } catch (err) {
        console.error(`\n    Error fetching ${author.key} for surah ${surahNum}:`, err);
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(' ✓');
  }

  console.log('\nDone!');
}

main().catch(console.error);
