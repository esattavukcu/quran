'use client';

import { useState } from 'react';

interface NuzulPanelProps {
  verseNumber: number;
  nuzulText: string;
}

/** Sadece ayet bazlı nüzul bilgisi gösterir. Veri yoksa render edilmemeli. */
export default function NuzulPanel({ verseNumber, nuzulText }: NuzulPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-emerald-200 bg-emerald-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-emerald-100/60 active:bg-emerald-100 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Small icon */}
        <div className="w-6 h-6 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-sm">
          📖
        </div>
        {/* Labels */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold text-emerald-800">Nüzul Sebebi</span>
          <span className="text-[10px] bg-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold shrink-0">
            {verseNumber}. ayet
          </span>
        </div>
        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="#065f46"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-emerald-200 p-3 bg-white/50">
          <div
            className="text-foreground/80 leading-relaxed whitespace-pre-wrap"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: '0.9rem', lineHeight: '1.75' }}
          >
            {nuzulText}
          </div>
        </div>
      )}
    </div>
  );
}
