'use client';

import type { WordInfo } from '@/lib/types/quran';

interface TransliterationLineProps {
  verseTransliteration: string;
  words: WordInfo[] | null;
  selectedWordIndex: number | null;
  onWordClick: (word: WordInfo, index: number) => void;
}

export default function TransliterationLine({
  verseTransliteration,
  words,
  selectedWordIndex,
  onWordClick,
}: TransliterationLineProps) {
  // If no word-level data, render the full verse as non-clickable text
  if (!words || words.length === 0) {
    return (
      <p className="transliteration-text text-transliteration font-medium leading-relaxed">
        {verseTransliteration}
      </p>
    );
  }

  return (
    <p className="transliteration-text text-transliteration font-medium leading-relaxed flex flex-wrap gap-y-1">
      {words.map((word, idx) => (
        <span
          key={`${word.position}-${idx}`}
          className={`word-clickable inline-block ${
            selectedWordIndex === idx ? 'word-selected' : ''
          }`}
          onClick={() => onWordClick(word, idx)}
        >
          {word.transliteration}
        </span>
      ))}
    </p>
  );
}
