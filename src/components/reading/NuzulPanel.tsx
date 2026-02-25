'use client';

import { useState } from 'react';
import { useNuzul } from '@/lib/hooks/useNuzul';

interface NuzulPanelProps {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function NuzulPanel({
  surahNumber,
  surahName,
  verseNumber,
  isOpen,
  onToggle,
}: NuzulPanelProps) {
  const { fetchNuzul, loading, surahResult, verseResult, error } = useNuzul();
  const [showSurahInfo, setShowSurahInfo] = useState(false);

  const handleToggle = () => {
    if (!isOpen && !surahResult && !verseResult && !loading) {
      fetchNuzul({ surahNumber, surahName, verseNumber });
    }
    onToggle();
  };

  const hasVerseSpecific = !!verseResult;
  const hasSurahGeneral = !!surahResult;

  return (
    <div className="mt-3">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors font-medium"
      >
        <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>&#9656;</span>
        <span>&#128214;</span>
        Nüzul Sebebi
        {hasVerseSpecific && isOpen && (
          <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-semibold">
            Ayete Özel
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {loading && (
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                Nüzul sebebi yükleniyor...
              </div>
            </div>
          )}

          {error && (
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
              <p className="text-sm text-red-500">Hata: {error}</p>
            </div>
          )}

          {/* Ayet bazli nuzul */}
          {hasVerseSpecific && (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-2">
                Ayet {verseNumber} - Inis Sebebi
              </p>
              <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {verseResult}
              </div>
            </div>
          )}

          {/* Sure genel nuzul */}
          {hasSurahGeneral && (
            <>
              {hasVerseSpecific ? (
                /* Ayet bazli varsa, sure bilgisini katlanabilir goster */
                <div>
                  <button
                    onClick={() => setShowSurahInfo(!showSurahInfo)}
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors font-medium"
                  >
                    <span className={`transition-transform ${showSurahInfo ? 'rotate-90' : ''}`}>&#9656;</span>
                    Sure Genel Bilgisi ({surahName})
                  </button>
                  {showSurahInfo && (
                    <div className="mt-1.5 bg-accent/5 rounded-lg p-4 border border-accent/10">
                      <div className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">
                        {surahResult}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Ayet bazli yoksa, sure bilgisini direkt goster */
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">
                    Sure Genel Bilgisi
                  </p>
                  <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {surahResult}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
