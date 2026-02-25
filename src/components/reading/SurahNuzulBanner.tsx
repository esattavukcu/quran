'use client';

import { useState } from 'react';

interface SurahNuzulBannerProps {
  surahName: string;
  nuzulText: string | null;
  loading: boolean;
}

export default function SurahNuzulBanner({ surahName, nuzulText, loading }: SurahNuzulBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!nuzulText && !loading) return null;

  return (
    <div className="bg-card-bg rounded-xl border border-card-border p-4 sm:p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors w-full"
      >
        <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>&#9656;</span>
        <span>&#128214;</span>
        {surahName} - Nüzul Bilgisi
      </button>

      {isOpen && (
        <div className="mt-3">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted">
              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              Yükleniyor...
            </div>
          ) : nuzulText ? (
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
              <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {nuzulText}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
