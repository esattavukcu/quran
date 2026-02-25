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
}

export default function AyahCard({ ayah, wordData, surahNumber, surahName }: AyahCardProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: WordInfo;
    index: number;
  } | null>(null);
  const [nuzulOpen, setNuzulOpen] = useState(false);

  const handleWordClick = useCallback((word: WordInfo, index: number) => {
    setSelectedWord((prev) =>
      prev?.index === index ? null : { word, index }
    );
  }, []);

  const handleClosePopover = useCallback(() => {
    setSelectedWord(null);
  }, []);

  return (
    <div className="bg-card-bg rounded-xl border border-card-border p-4 sm:p-5 relative">
      {/* Verse number badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center justify-center w-8 h-8 bg-accent text-white text-xs font-bold rounded-full">
          {ayah.numberInSurah}
        </span>
        {ayah.sajda && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">
            Secde
          </span>
        )}
      </div>

      {/* Transliteration (clickable words) */}
      <TransliterationLine
        verseTransliteration={ayah.transliteration}
        words={wordData?.words || null}
        selectedWordIndex={selectedWord?.index ?? null}
        onWordClick={handleWordClick}
      />

      {/* Translations */}
      <TranslationPair diyanet={ayah.diyanet} ozturk={ayah.ozturk} />

      {/* Nuzul Panel */}
      <NuzulPanel
        surahNumber={surahNumber}
        surahName={surahName}
        verseNumber={ayah.numberInSurah}
        isOpen={nuzulOpen}
        onToggle={() => setNuzulOpen(!nuzulOpen)}
      />

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
  );
}
