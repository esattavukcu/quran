'use client';

import { useState } from 'react';

interface NuzulPanelProps {
  verseNumber: number;
  nuzulText: string;
}

/** Sadece ayet bazli nuzul bilgisi gosterir. Veri yoksa render edilmemeli. */
export default function NuzulPanel({ verseNumber, nuzulText }: NuzulPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors font-medium"
      >
        <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>&#9656;</span>
        <span>&#128214;</span>
        Nüzul Sebebi
        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">
          Ayete Özel
        </span>
      </button>

      {isOpen && (
        <div className="mt-2">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-2">
              Ayet {verseNumber} - İniş Sebebi
            </p>
            <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {nuzulText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
