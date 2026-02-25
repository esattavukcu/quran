'use client';

import { useNuzul } from '@/lib/hooks/useNuzul';

interface NuzulPanelProps {
  surahNumber: number;
  surahName: string;
  verseStart: number;
  verseEnd: number;
  verseText: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function NuzulPanel({
  surahNumber,
  surahName,
  verseStart,
  verseEnd,
  verseText,
  isOpen,
  onToggle,
}: NuzulPanelProps) {
  const { fetchNuzul, loading, result, error } = useNuzul();

  const handleToggle = () => {
    if (!isOpen && !result && !loading) {
      fetchNuzul({ surahNumber, surahName, verseStart, verseEnd, verseText });
    }
    onToggle();
  };

  return (
    <div className="mt-3">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors font-medium"
      >
        <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>&#9656;</span>
        <span>&#128214;</span>
        Nüzul Sebebi
      </button>

      {isOpen && (
        <div className="mt-2 bg-accent/5 rounded-lg p-4 border border-accent/10">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              Nüzul sebebi yükleniyor...
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500">Hata: {error}</p>
          )}

          {result && (
            <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
