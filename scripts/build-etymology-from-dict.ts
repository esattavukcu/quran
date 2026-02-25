/**
 * Statik sözlükten ve mevcut filtrelenmiş verilerden etimoloji JSON'larını oluşturur.
 * API kullanmaz — tüm veri scripts/data/quran-etymology-dict.ts içinde.
 *
 * Öncelik: Sözlük > Mevcut filtrelenmiş giriş
 *
 * Kullanım: npx tsx scripts/build-etymology-from-dict.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { ETYMOLOGY_DICT } from './data/quran-etymology-dict';

const WORDS_DIR = path.join(process.cwd(), 'public', 'data', 'words');
const ETYM_DIR  = path.join(process.cwd(), 'public', 'data', 'etymology');

function normalizeArabic(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '') // hareke kaldır
    .replace(/[^\u0621-\u064A]/g, '');                   // sadece temel harfler
}

async function main() {
  fs.mkdirSync(ETYM_DIR, { recursive: true });

  // Sözlüğü normalize edilmiş formla indeksle (hareke farklılıklarını tolere etmek için)
  const dictByNorm = new Map<string, string>();
  const dictByExact = new Map<string, string>();
  for (const [arabic, analysis] of Object.entries(ETYMOLOGY_DICT)) {
    dictByExact.set(arabic, analysis);
    const norm = normalizeArabic(arabic);
    if (norm && !dictByNorm.has(norm)) {
      dictByNorm.set(norm, analysis);
    }
  }

  const surahFiles = fs.readdirSync(WORDS_DIR)
    .filter(f => /^\d+\.json$/.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  let totalSurahs  = 0;
  let totalAdded   = 0;
  let totalSkipped = 0;

  for (const fname of surahFiles) {
    const surahNum = parseInt(fname);
    const wordData = JSON.parse(fs.readFileSync(path.join(WORDS_DIR, fname), 'utf-8'));

    // Mevcut etymology dosyasını yükle
    const etymPath = path.join(ETYM_DIR, `${surahNum}.json`);
    let existing: { surahNumber: number; words: Record<string, string> } = {
      surahNumber: surahNum,
      words: {},
    };
    if (fs.existsSync(etymPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(etymPath, 'utf-8'));
      } catch {
        existing = { surahNumber: surahNum, words: {} };
      }
    }

    let added = 0;

    // Her kelime için sözlükten bak
    for (const verse of wordData.verses) {
      for (const word of verse.words) {
        const arabic = word.arabic as string;
        if (!arabic) continue;

        // 1. Tam eşleşme
        let entry = dictByExact.get(arabic);

        // 2. Normalize eşleşme (hareke farklılığı toleransı)
        if (!entry) {
          const norm = normalizeArabic(arabic);
          if (norm) entry = dictByNorm.get(norm);

          // 3. Ön ek soyarak eşleşme: و (ve) veya ف (then) ön ekini soy
          if (!entry && norm) {
            let stripped = norm;
            // Birden fazla ön ek olabilir (وَفَ gibi) — en fazla 2 kez soy
            for (let i = 0; i < 2; i++) {
              if (stripped.startsWith('و') || stripped.startsWith('ف')) {
                stripped = stripped.slice(1);
                const found = dictByNorm.get(stripped);
                if (found) { entry = found; break; }
              } else {
                break;
              }
            }
          }
        }

        if (entry && entry !== existing.words[arabic]) {
          existing.words[arabic] = entry;
          added++;
        }
      }
    }

    if (added > 0) {
      fs.writeFileSync(etymPath, JSON.stringify(existing, null, 2), 'utf-8');
      console.log(`  Sure ${String(surahNum).padStart(3)}: ${added} kelime eklendi`);
      totalAdded += added;
    } else {
      totalSkipped++;
    }

    totalSurahs++;
  }

  const dictSize = Object.keys(ETYMOLOGY_DICT).length;
  console.log('');
  console.log(`Sözlük boyutu : ${dictSize} giriş`);
  console.log(`İşlenen sure  : ${totalSurahs}`);
  console.log(`Eklenen kelime: ${totalAdded}`);
  console.log(`Değişmeyen    : ${totalSkipped} sure`);
  console.log('');
  console.log('Kalite kontrolü için: npx tsx scripts/audit-etymology.ts');
}

main().catch(console.error);
