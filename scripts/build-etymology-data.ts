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

function buildWordReferences(wordsDir: string): Record<string, string[]> {
  const refsByArabic: Record<string, string[]> = {};
  const files = fs.readdirSync(wordsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => parseInt(f.replace('.json', ''), 10))
    .filter(n => !Number.isNaN(n))
    .sort((a, b) => a - b);

  for (const surahNum of files) {
    const fp = path.join(wordsDir, `${surahNum}.json`);
    const data: SurahWordData = JSON.parse(fs.readFileSync(fp, 'utf-8'));
    for (const verse of data.verses) {
      const ref = `${surahNum}:${verse.verseNumber}`;
      for (const word of verse.words) {
        if (!refsByArabic[word.arabic]) refsByArabic[word.arabic] = [];
        const arr = refsByArabic[word.arabic];
        if (arr[arr.length - 1] !== ref) arr.push(ref);
      }
    }
  }

  return refsByArabic;
}

function normalizeArabic(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[^\u0621-\u064A]/g, '');
}

function extractJsonArray(text: string): string | null {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

async function generateEtymologyBatch(
  client: Anthropic,
  words: { arabic: string; transliteration: string; gloss?: string; ref?: string; refs?: string[] }[],
  model: string,
  maxTokens: number
): Promise<Record<string, string>> {
  const wordList = words
    .map((w, i) => {
      const parts = [`${i + 1}. "${w.transliteration}" (${w.arabic})`];
      if (w.gloss) parts.push(`anlam: ${w.gloss}`);
      if (w.ref) parts.push(`ilk_geçiş: ${w.ref}`);
      if (w.refs && w.refs.length > 0) parts.push(`doğrulanmış_refler: ${w.refs.slice(0, 6).join(', ')}`);
      return parts.join(' — ');
    })
    .join('\n');

  const message = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: `Sen Kur'an Arapçası, sarf/nahiv ve etimoloji alanında uzmansın.
YALNIZCA geçerli JSON array döndür, başka hiçbir metin döndürme.

Her öğe şu alanlara sahip olsun:
- "arabic": girişte verilen Arapça kelimeyi aynen yaz
- "transliteration": girişte verilen transliterasyonu aynen yaz
- "kok": Arapça kök + Latin kök + temel anlam nüansı (detaylı)
- "kalip": sarf/nahiv kalıbı, kelime türü, çekim/i'rab, ek/edat-zamir bileşimi (detaylı)
- "baglam_notu": Kur'an içi kullanımın kısa, akademik bağlam açıklaması (1 cümle)

Kurallar:
- Uydurma yapma; belirsizlik varsa "muhtemel" de.
- "otomatik tahmin" yazma.
- JSON dışında markdown, açıklama, başlık ekleme.`,
    temperature: 0.2,
    messages: [
      {
        role: 'user',
        content: `Aşağıdaki kelimeleri sırayı bozmadan analiz et:\n\n${wordList}`,
      },
    ],
  });

  const text = message.content[0]?.type === 'text' ? message.content[0].text : '';

  const result: Record<string, string> = {};
  const jsonPayload = extractJsonArray(text);
  if (!jsonPayload) {
    throw new Error('model output did not contain JSON array');
  }

  let entries: unknown;
  try {
    entries = JSON.parse(jsonPayload);
  } catch (err) {
    throw new Error(`failed to parse model JSON: ${String(err)}`);
  }
  if (!Array.isArray(entries)) {
    throw new Error('model output JSON is not an array');
  }

  const byArabic = new Map<string, { arabic: string; transliteration: string; ref?: string; refs?: string[] }>();
  const byTrans = new Map<string, { arabic: string; transliteration: string; ref?: string; refs?: string[] }>();
  for (const w of words) {
    byArabic.set(normalizeArabic(w.arabic), { arabic: w.arabic, transliteration: w.transliteration, ref: w.ref, refs: w.refs });
    byTrans.set(w.transliteration.trim().toLowerCase(), { arabic: w.arabic, transliteration: w.transliteration, ref: w.ref, refs: w.refs });
  }

  const used = new Set<string>();

  for (const raw of entries) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Record<string, unknown>;
    const arabicRaw = typeof item.arabic === 'string' ? item.arabic.trim() : '';
    const translitRaw = typeof item.transliteration === 'string' ? item.transliteration.trim() : '';

    let target = arabicRaw ? byArabic.get(normalizeArabic(arabicRaw)) : undefined;
    if (!target && translitRaw) {
      target = byTrans.get(translitRaw.toLowerCase());
    }
    if (!target || used.has(target.arabic)) continue;

    const kokRaw =
      (typeof item.kok === 'string' && item.kok) ||
      (typeof item.kök === 'string' && item.kök) ||
      (typeof item.root === 'string' && item.root) ||
      'muhtemel kök — doğrulama gerekli';

    const kalipRaw =
      (typeof item.kalip === 'string' && item.kalip) ||
      (typeof item.kalıp === 'string' && item.kalıp) ||
      (typeof item.pattern === 'string' && item.pattern) ||
      'doğrulama gerekli';

    const baglamRaw =
      (typeof item.baglam_notu === 'string' && item.baglam_notu) ||
      (typeof item.bağlam_notu === 'string' && item.bağlam_notu) ||
      (typeof item.kuranda === 'string' && item.kuranda) ||
      (typeof item["kur'an'da"] === 'string' && item["kur'an'da"]) ||
      'bağlam doğrulama gerekli';

    const kok = kokRaw.replace(/^kök:\s*/i, '').replace(/\s+/g, ' ').trim();
    const kalip = kalipRaw.replace(/^kal[ıi]p:\s*/i, '').replace(/\s+/g, ' ').trim();
    const baglam = baglamRaw
      .replace(/^kur['’]?an'?da:\s*/i, '')
      .replace(/^baglam[_\s-]?notu:\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    const refs = (target.refs && target.refs.length > 0)
      ? target.refs.slice(0, 5).join(', ')
      : (target.ref || 'doğrulama gerekli');
    const kuranda = baglam ? `${refs} — ${baglam}` : refs;

    result[target.arabic] =
      `"${target.transliteration}" (${target.arabic})\n` +
      `Kök: ${kok}\n` +
      `Kalıp: ${kalip}\n` +
      `Kur'an'da: ${kuranda}`;
    used.add(target.arabic);
  }

  return result;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not found in .env.local');
    process.exit(1);
  }

  const wordsDir = path.join(process.cwd(), 'public', 'data', 'words');
  const outputDir = path.join(process.cwd(), 'public', 'data', 'etymology');
  fs.mkdirSync(outputDir, { recursive: true });
  const refsByArabic = buildWordReferences(wordsDir);

  // Optional: limit to specific surah range for testing (e.g. START_SURAH=1 END_SURAH=1)
  const startSurah = parseInt(process.env.START_SURAH || '1');
  const endSurah = parseInt(process.env.END_SURAH || '114');
  const forceRebuild = ['1', 'true', 'yes'].includes((process.env.FORCE_REBUILD || '').toLowerCase());
  const seedExistingCache = !['0', 'false', 'no'].includes((process.env.SEED_EXISTING_CACHE || 'true').toLowerCase());
  const batchSize = parseInt(process.env.ETYM_BATCH_SIZE || '12', 10);
  const delayMs = parseInt(process.env.ETYM_DELAY_MS || '1200', 10);
  const maxRetries = parseInt(process.env.ETYM_MAX_RETRIES || '3', 10);
  const model = process.env.ETYM_MODEL || 'claude-haiku-4-5-20251001';
  const maxTokens = parseInt(process.env.ETYM_MAX_TOKENS || '6000', 10);
  const httpTimeoutMs = parseInt(process.env.ETYM_HTTP_TIMEOUT_MS || '120000', 10);
  const httpRetries = parseInt(process.env.ETYM_HTTP_RETRIES || '1', 10);
  const client = new Anthropic({ apiKey, timeout: httpTimeoutMs, maxRetries: httpRetries });
  // Collect all unique words across the Quran
  const globalEtymology: Record<string, string> = {};

  // Seed cache from already existing earlier surahs so repeated words do not re-hit API.
  if (seedExistingCache) {
    for (let seedSurah = 1; seedSurah < startSurah; seedSurah++) {
      const seedPath = path.join(outputDir, `${seedSurah}.json`);
      if (!fs.existsSync(seedPath)) continue;
      try {
        const existing = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
        Object.assign(globalEtymology, existing.words);
      } catch {
        // Ignore malformed seed files and continue.
      }
    }
  }

  console.log(`Generating etymology data for surahs ${startSurah}-${endSurah}...\n`);
  console.log(`Options: forceRebuild=${forceRebuild}, seedExistingCache=${seedExistingCache}, batchSize=${batchSize}, delayMs=${delayMs}, maxRetries=${maxRetries}, model=${model}, maxTokens=${maxTokens}, httpTimeoutMs=${httpTimeoutMs}, httpRetries=${httpRetries}\n`);

  for (let surahNum = startSurah; surahNum <= endSurah; surahNum++) {
    const outputPath = path.join(outputDir, `${surahNum}.json`);

    // Skip if already done
    if (fs.existsSync(outputPath) && !forceRebuild) {
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
    const uniqueWords = new Map<string, {
      arabic: string;
      transliteration: string;
      gloss?: string;
      ref?: string;
      refs?: string[];
    }>();
    for (const verse of surahData.verses) {
      for (const word of verse.words) {
        if (!globalEtymology[word.arabic] && !uniqueWords.has(word.arabic)) {
          uniqueWords.set(word.arabic, {
            arabic: word.arabic,
            transliteration: word.transliteration,
            gloss: word.translationTr || word.translation,
            ref: `${surahNum}:${verse.verseNumber}`,
            refs: refsByArabic[word.arabic] || [`${surahNum}:${verse.verseNumber}`],
          });
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
      const totalBatches = Math.ceil(newWords.length / batchSize);
      for (let bi = 0; bi < newWords.length; bi += batchSize) {
        const batch = newWords.slice(bi, bi + batchSize);
        const batchNo = Math.floor(bi / batchSize) + 1;
        if (batchNo === 1 || batchNo % 10 === 0 || batchNo === totalBatches) {
          console.log(`    Surah ${surahNum.toString().padStart(3)} batch ${batchNo}/${totalBatches}`);
        }
        let success = false;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            const results = await generateEtymologyBatch(client, batch, model, maxTokens);
            const missing = batch.filter(w => !results[w.arabic]);

            for (const [arabic, analysis] of Object.entries(results)) {
              surahEtymology[arabic] = analysis;
              globalEtymology[arabic] = analysis;
            }

            if (missing.length > 0) {
              console.warn(`    Partial batch at surah ${surahNum}, batch ${bi}: missing ${missing.length}/${batch.length}, retrying as single words`);
              for (const missingWord of missing) {
                let singleOk = false;
                for (let singleAttempt = 1; singleAttempt <= maxRetries; singleAttempt++) {
                  try {
                    const singleResult = await generateEtymologyBatch(client, [missingWord], model, maxTokens);
                    const analysis = singleResult[missingWord.arabic];
                    if (!analysis) throw new Error('single word missing from model output');
                    surahEtymology[missingWord.arabic] = analysis;
                    globalEtymology[missingWord.arabic] = analysis;
                    singleOk = true;
                    break;
                  } catch (singleErr) {
                    if (singleAttempt === maxRetries) {
                      throw new Error(`single word retry failed for ${missingWord.arabic}: ${String(singleErr)}`);
                    }
                    await new Promise((r) => setTimeout(r, delayMs));
                  }
                }
                if (!singleOk) {
                  throw new Error(`single word generation failed for ${missingWord.arabic}`);
                }
              }
            }

            success = true;
            break;
          } catch (err) {
            if (attempt === maxRetries) {
              console.error(`    Batch error at surah ${surahNum}, batch ${bi}:`, err);
            } else {
              console.warn(`    Retry ${attempt}/${maxRetries} at surah ${surahNum}, batch ${bi}`);
              await new Promise((r) => setTimeout(r, delayMs));
            }
          }
        }

        if (!success) {
          throw new Error(`Failed to generate complete etymology batch at surah ${surahNum}, offset ${bi}`);
        }

        if (batchNo % 20 === 0 || batchNo === totalBatches) {
          fs.writeFileSync(outputPath, JSON.stringify({ surahNumber: surahNum, words: surahEtymology }, null, 2));
          console.log(`    Checkpoint saved: Surah ${surahNum.toString().padStart(3)} words=${Object.keys(surahEtymology).length}`);
        }

        // Rate limit
        await new Promise((r) => setTimeout(r, delayMs));
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
