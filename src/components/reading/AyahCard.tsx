'use client';

import { useState, useCallback } from 'react';
import type { Ayah, WordInfo, WordDataVerse } from '@/lib/types/quran';
import TransliterationLine from './TransliterationLine';
import TranslationPair from './TranslationPair';
import WordPopover from './WordPopover';
import NuzulPanel from './NuzulPanel';

interface AyahCardProps {
  ayah: Ayah;
  wordData: WordDataVerse | null;
  surahNumber: number;
  surahName: string;
  verseNuzul: string | null;
}

export default function AyahCard({ ayah, wordData, surahNumber, surahName, verseNuzul }: AyahCardProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: WordInfo;
    index: number;
  } | null>(null);

  const handleWordClick = useCallback((word: WordInfo, index: number) => {
    setSelectedWord((prev) =>
      prev?.index === index ? null : { word, index }
    );
  }, []);

  const handleClosePopover = useCallback(() => {
    setSelectedWord(null);
  }, []);

  return (
    <div className="bg-card-bg rounded-xl border border-card-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Top bar: verse number + sajda */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-card-border/50">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-accent text-white text-xs font-bold rounded-full shadow-sm">
            {ayah.numberInSurah}
          </span>
          {wordData && (
            <span className="text-[10px] text-muted/55 font-medium">
              {wordData.words.length} kelime
            </span>
          )}
        </div>
        {ayah.sajda && (
          <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
            Secde
          </span>
        )}
      </div>

      {/* Transliteration */}
      <div className="px-4 pt-3 pb-1">
        <TransliterationLine
          verseTransliteration={ayah.transliteration}
          words={wordData?.words || null}
          selectedWordIndex={selectedWord?.index ?? null}
          onWordClick={handleWordClick}
        />
      </div>

      {/* Translations + extras */}
      <div className="px-4 pb-4">
        <TranslationPair ayah={ayah} />

        {/* Nüzul Panel — sadece ayet bazlı veri varsa */}
        {verseNuzul && (
          <NuzulPanel
            verseNumber={ayah.numberInSurah}
            nuzulText={verseNuzul}
          />
        )}

        {/* Word Popover (inline) */}
        {selectedWord && (
          <WordPopover
            word={selectedWord.word}
            verseText={ayah.transliteration}
            surahNumber={surahNumber}
            verseNumber={ayah.numberInSurah}
            diyanetText={ayah.diyanet}
            onClose={handleClosePopover}
          />
        )}
      </div>
    </div>
  );
}
