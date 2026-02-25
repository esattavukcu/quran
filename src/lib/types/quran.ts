export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  turkishName: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationOrder: number;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  transliteration: string;
  diyanet: string;
  ozturk: string;
  juz: number;
  page: number;
  sajda: boolean | { recommended: boolean; obligatory: boolean };
}

export interface SurahData {
  surah: SurahMeta;
  ayahs: Ayah[];
}

export interface WordInfo {
  position: number;
  arabic: string;
  transliteration: string;
  translation: string;
  translationTr: string;
}

export interface WordDataVerse {
  verseNumber: number;
  words: WordInfo[];
}

export interface SurahWordData {
  surahNumber: number;
  verses: WordDataVerse[];
}

export interface EtymologyResult {
  word: string;
  root: string;
  rootMeaning: string;
  morphology: string;
  relatedWords: string[];
  historicalContext: string;
}

export interface NuzulResult {
  surahNumber: number;
  verseStart: number;
  verseEnd: number;
  content: string;
}

export interface AlQuranEdition {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: AlQuranAyah[];
}

export interface AlQuranAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface AlQuranResponse {
  code: number;
  status: string;
  data: AlQuranEdition | AlQuranEdition[];
}
