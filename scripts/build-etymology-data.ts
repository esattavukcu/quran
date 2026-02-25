/**
 * Build-time script: generates etymology data for unique words across all 114 surahs
 * using Anthropic Claude API and saves as static JSON per surah.
 *
 * Requires ANTHROPIC_API_KEY in .env.local
 * Usage: npx tsx scripts/build-etymology-data.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface WordData {
  position: number;
  arabic: string;
  transliteration: string;
  translation: string;
  translationTr: string;
}

interface VerseData {
  verseNumber: number;
  words: WordData[];
}

interface SurahWordData {
  surahNumber: number;
  verses: VerseData[];
}

async function generateEtymologyBatch(
  client: Anthropic,
  words: { arabic: string; transliteration: string }[]
): Promise<Record<string, string>> {
  const wordList = words.map((w, i) => `${i + 1}. "${w.transliteration}" (${w.arabic})`).join('\n');

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    system: `Sen Kuran Arapçası konusunda uzman bir dilbilimcisin. Verilen kelimelerin her biri için kısa bir etimolojik bilgi ver. Her kelime için:
- Arapça kök (3-4 harf)
- Kök anlamı
- Morfolojik kalıp
- Kuran'daki diğer kullanımlar (1-2 örnek)

Her kelimeyi numarası ile başlat. Her kelime için 2-3 cümle yeterli. Türkçe yaz.`,
    messages: [
      {
        role: 'user',
        content: `Şu Kurani kelimelerin etimolojisini ver:\n\n${wordList}`,
      },
    ],
  });

  const text = message.content[0]?.type === 'text' ? message.content[0].text : '';

  // Parse response - split by numbered items
  const result: Record<string, string> = {};
  const sections = text.split(/\n(?=\d+\.)/);

  for (let i = 0; i < sections.length && i < words.length; i++) {
    const section = sections[i].replace(/^\d+\.\s*/, '').trim();
    if (section) {
      result[words[i].arabic] = section;
    }
  }

  return result;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not found in .env.local');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const wordsDir = path.join(process.cwd(), 'public', 'data', 'words');
  const outputDir = path.join(process.cwd(), 'public', 'data', 'etymology');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Generating etymology data for all surahs...\n');

  // Collect all unique words across the Quran
  const globalEtymology: Record<string, string> = {};

  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    const outputPath = path.join(outputDir, `${surahNum}.json`);

    // Skip if already done
    if (fs.existsSync(outputPath)) {
      console.log(`  Surah ${surahNum.toString().padStart(3)}: SKIP (already exists)`);
      // Load existing data into global cache
      const existing = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      Object.assign(globalEtymology, existing.words);
      continue;
    }

    const wordFilePath = path.join(wordsDir, `${surahNum}.json`);
    if (!fs.existsSync(wordFilePath)) {
      console.log(`  Surah ${surahNum.toString().padStart(3)}: SKIP (no word data)`);
      continue;
    }

    const surahData: SurahWordData = JSON.parse(fs.readFileSync(wordFilePath, 'utf-8'));

    // Get unique words for this surah that we haven't seen yet
    const uniqueWords = new Map<string, { arabic: string; transliteration: string }>();
    for (const verse of surahData.verses) {
      for (const word of verse.words) {
        if (!globalEtymology[word.arabic] && !uniqueWords.has(word.arabic)) {
          uniqueWords.set(word.arabic, { arabic: word.arabic, transliteration: word.transliteration });
        }
      }
    }

    const newWords = Array.from(uniqueWords.values());
    const surahEtymology: Record<string, string> = {};

    // Copy already-known etymologies for words in this surah
    for (const verse of surahData.verses) {
      for (const word of verse.words) {
        if (globalEtymology[word.arabic]) {
          surahEtymology[word.arabic] = globalEtymology[word.arabic];
        }
      }
    }

    if (newWords.length > 0) {
      // Process in batches of 15 words
      const batchSize = 15;
      for (let bi = 0; bi < newWords.length; bi += batchSize) {
        const batch = newWords.slice(bi, bi + batchSize);
        try {
          const results = await generateEtymologyBatch(client, batch);
          Object.assign(surahEtymology, results);
          Object.assign(globalEtymology, results);
        } catch (err) {
          console.error(`    Batch error at surah ${surahNum}, batch ${bi}:`, err);
        }
        // Rate limit
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    // Save per-surah etymology
    fs.writeFileSync(outputPath, JSON.stringify({ surahNumber: surahNum, words: surahEtymology }, null, 2));
    console.log(`  Surah ${surahNum.toString().padStart(3)}: ${newWords.length} new words, ${Object.keys(surahEtymology).length} total`);
  }

  console.log(`\nDone! Etymology data saved to public/data/etymology/`);
  console.log(`Total unique words with etymology: ${Object.keys(globalEtymology).length}`);
}

main().catch(console.error);
