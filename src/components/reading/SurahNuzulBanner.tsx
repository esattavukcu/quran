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

  const previewText = nuzulText
    ? nuzulText.replace(/\*\*/g, '').replace(/\n/g, ' ').slice(0, 110).trim() + '…'
    : '';

  return (
    <div className="rounded-xl overflow-hidden border border-amber-200 bg-amber-50 nuzul-banner-hint">
      {/* Clickable header — obviously a button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-amber-100/70 active:bg-amber-100 cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Icon badge */}
        <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 text-xl shadow-sm">
          📖
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-amber-900 leading-tight">
              Nüzul Bilgisi
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              {surahName}
            </span>
          </div>
          {!isOpen && nuzulText && (
            <p className="text-xs text-amber-700/75 mt-0.5 leading-relaxed line-clamp-2">
              {previewText}
            </p>
          )}
          {isOpen && (
            <p className="text-xs text-amber-600/70 mt-0.5">Kapatmak için tekrar tıkla</p>
          )}
        </div>

        {/* Animated chevron — makes it obvious this is expandable */}
        <div
          className={`shrink-0 w-7 h-7 rounded-full bg-amber-200 border border-amber-300 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="#92600a"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="border-t border-amber-200/80">
          {loading ? (
            <div className="flex items-center gap-2.5 p-4 text-sm text-amber-700">
              <div className="w-4 h-4 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin shrink-0" />
              Nüzul bilgisi yükleniyor…
            </div>
          ) : nuzulText ? (
            <div className="p-4 bg-white/50">
              <div
                className="text-foreground/80 leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: '0.95rem', lineHeight: '1.8' }}
              >
                {nuzulText}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
