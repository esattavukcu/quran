'use client';

import { useEffect, useRef } from 'react';
import type { WordInfo } from '@/lib/types/quran';
import { useEtymology } from '@/lib/hooks/useEtymology';

interface WordPopoverProps {
  word: WordInfo;
  verseText: string;
  surahNumber: number;
  verseNumber: number;
  diyanetText: string;
  onClose: () => void;
}

function highlightInMeal(mealText: string, turkishMeaning: string): React.ReactNode {
  if (!turkishMeaning || turkishMeaning.length < 2) return mealText;

  // Try to find the Turkish word meaning within the Diyanet translation
  const meaningLower = turkishMeaning.toLowerCase().replace(/['"]/g, '');
  const mealLower = mealText.toLowerCase();

  // Try exact match first
  let idx = mealLower.indexOf(meaningLower);

  // Try matching each word of the meaning individually
  if (idx === -1) {
    const meaningWords = meaningLower.split(/\s+/).filter((w) => w.length > 2);
    for (const mw of meaningWords) {
      // Search for the word stem (first 3+ chars) in meal
      const stem = mw.length > 4 ? mw.slice(0, mw.length - 1) : mw;
      const words = mealText.split(/(\s+)/);
      const matchIdx = words.findIndex((w) => w.toLowerCase().startsWith(stem));
      if (matchIdx !== -1) {
        return (
          <>
            {words.slice(0, matchIdx).join('')}
            <mark className="bg-highlight font-semibold rounded px-0.5">{words[matchIdx]}</mark>
            {words.slice(matchIdx + 1).join('')}
          </>
        );
      }
    }
    return mealText;
  }

  const matchLen = turkishMeaning.length;
  return (
    <>
      {mealText.slice(0, idx)}
      <mark className="bg-highlight font-semibold rounded px-0.5">{mealText.slice(idx, idx + matchLen)}</mark>
      {mealText.slice(idx + matchLen)}
    </>
  );
}

export default function WordPopover({
  word,
  verseText,
  surahNumber,
  verseNumber,
  diyanetText,
  onClose,
}: WordPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { fetchEtymology, loading: aiLoading, result: aiResult, error: aiError, reset } = useEtymology();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    reset();
  }, [word, reset]);

  const turkishMeaning = word.translationTr || '';
  const englishMeaning = word.translation || '';

  return (
    <div ref={ref} className="mt-3 bg-white rounded-xl shadow-lg border-2 border-accent/20 overflow-hidden">
      {/* Header */}
      <div className="bg-accent text-white p-3 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">{word.transliteration}</p>
          <p className="text-xs opacity-80 mt-0.5">{word.arabic}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white w-7 h-7 flex items-center justify-center text-xl"
        >
          &times;
        </button>
      </div>

      {/* Turkish meaning (primary) */}
      <div className="p-3 border-b border-card-border">
        <div className="flex items-start gap-2">
          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded font-semibold shrink-0">
            Turkce
          </span>
          <p className="text-sm text-foreground font-medium">
            {turkishMeaning || englishMeaning || 'Bilgi yok'}
          </p>
        </div>
        {turkishMeaning && englishMeaning && (
          <div className="flex items-start gap-2 mt-2">
            <span className="text-xs bg-card-border/50 text-muted px-2 py-0.5 rounded font-medium shrink-0">
              EN
            </span>
            <p className="text-xs text-muted">{englishMeaning}</p>
          </div>
        )}
      </div>

      {/* Meal correspondence */}
      <div className="p-3 border-b border-card-border bg-accent/[0.02]">
        <p className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Mealdeki karsiligi</p>
        <p className="text-sm text-foreground/70 leading-relaxed">
          {highlightInMeal(diyanetText, turkishMeaning)}
        </p>
      </div>

      {/* AI Etymology */}
      <div className="p-3">
        {!aiResult && !aiLoading && !aiError && (
          <button
            onClick={() =>
              fetchEtymology({
                word: word.arabic,
                transliteration: word.transliteration,
                verseText,
                surahNumber,
                verseNumber,
              })
            }
            className="w-full flex items-center justify-center gap-2 bg-accent/5 hover:bg-accent/10 text-accent text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            <span>&#129302;</span>
            Detayli Etimoloji (AI)
          </button>
        )}

        {aiLoading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Etimoloji yukleniyor...
          </div>
        )}

        {aiError && (
          <p className="text-sm text-red-500">Hata: {aiError}</p>
        )}

        {aiResult && (
          <div className="text-sm text-foreground/80 leading-relaxed max-h-[200px] overflow-y-auto space-y-1">
            {aiResult.split('\n').map((line, i) => {
              // Bold: **text**
              const rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return (
                <p
                  key={i}
                  className={line.startsWith('-') ? 'pl-2' : line.match(/^\d+\./) ? 'font-semibold text-accent mt-2' : ''}
                  dangerouslySetInnerHTML={{ __html: rendered || '&nbsp;' }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
