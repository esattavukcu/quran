/**
 * Build-time script: fetches word-by-word data from Quran.com API v4
 * for all 114 surahs and saves as static JSON files in public/data/words/
 *
 * Usage: npx tsx scripts/build-word-data.ts
 */

interface QuranComWord {
  id: number;
  position: number;
  text_uthmani: string;
  char_type_name: string;
  translation: { text: string; language_name: string } | null;
  transliteration: { text: string; language_name: string } | null;
}

interface QuranComVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  words: QuranComWord[];
}

interface QuranComResponse {
  verses: QuranComVerse[];
  pagination: { total_pages: number; current_page: number; total_records: number };
}

interface OutputWord {
  position: number;
  arabic: string;
  transliteration: string;
  translation: string;
  translationTr: string;
}

interface OutputVerse {
  verseNumber: number;
  words: OutputWord[];
}

interface OutputSurah {
  surahNumber: number;
  verses: OutputVerse[];
}

const AYAH_COUNTS: Record<number, number> = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
  11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135,
  21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60,
  31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85,
  41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45,
  51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13,
  61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44,
  71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42,
  81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20,
  91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
  101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3,
  111: 5, 112: 4, 113: 5, 114: 6,
};

async function fetchVerseWords(
  surahNumber: number,
  language: string,
  perPage: number,
  page: number
): Promise<QuranComResponse> {
  const url = `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=${language}&words=true&word_fields=text_uthmani&translation_fields=text&per_page=${perPage}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Quran.com API error for surah ${surahNumber} page ${page} lang=${language}: ${res.status}`);
  }
  return res.json();
}

async function fetchSurahWords(surahNumber: number): Promise<OutputSurah> {
  const perPage = 50;
  const totalAyahs = AYAH_COUNTS[surahNumber] || 7;
  const totalPages = Math.ceil(totalAyahs / perPage);
  const allVerses: OutputVerse[] = [];

  for (let page = 1; page <= totalPages; page++) {
    // Fetch both English and Turkish word translations in parallel
    const [enData, trData] = await Promise.all([
      fetchVerseWords(surahNumber, 'en', perPage, page),
      fetchVerseWords(surahNumber, 'tr', perPage, page),
    ]);

    for (let vi = 0; vi < enData.verses.length; vi++) {
      const enVerse = enData.verses[vi];
      const trVerse = trData.verses[vi];
      const enWords = enVerse.words.filter((w) => w.char_type_name === 'word');
      const trWords = trVerse.words.filter((w) => w.char_type_name === 'word');

      const words: OutputWord[] = enWords.map((w, wi) => ({
        position: w.position,
        arabic: w.text_uthmani,
        transliteration: w.transliteration?.text || '',
        translation: w.translation?.text || '',
        translationTr: trWords[wi]?.translation?.text || '',
      }));

      allVerses.push({
        verseNumber: enVerse.verse_number,
        words,
      });
    }

    // Rate limit
    if (page < totalPages) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  return { surahNumber, verses: allVerses };
}

async function main() {
  const fs = await import('fs');
  const path = await import('path');

  const outputDir = path.join(process.cwd(), 'public', 'data', 'words');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Building word-by-word data for 114 surahs...\n');

  for (let i = 1; i <= 114; i++) {
    try {
      const data = await fetchSurahWords(i);
      const filePath = path.join(outputDir, `${i}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data));
      const totalWords = data.verses.reduce((sum, v) => sum + v.words.length, 0);
      console.log(`  Surah ${i.toString().padStart(3)}: ${data.verses.length} verses, ${totalWords} words`);
    } catch (err) {
      console.error(`  ERROR Surah ${i}:`, err);
    }

    // Rate limit between surahs
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log('\nDone! Word data saved to public/data/words/');
}

main().catch(console.error);
