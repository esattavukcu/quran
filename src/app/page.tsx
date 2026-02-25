'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SURAHS } from '@/lib/data/surah-meta';
import { REVELATION_ORDER } from '@/lib/data/revelation-order';
import type { SurahMeta } from '@/lib/types/quran';

type SortMode = 'revelation' | 'mushaf';

export default function HomePage() {
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>('revelation');
  const [search, setSearch] = useState('');

  const sortedSurahs = useMemo(() => {
    let list: SurahMeta[];

    if (sortMode === 'revelation') {
      list = REVELATION_ORDER.map((entry) => {
        const surah = SURAHS.find((s) => s.number === entry.surahNumber);
        return surah!;
      }).filter(Boolean);
    } else {
      list = [...SURAHS];
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.turkishName.toLowerCase().includes(q) ||
          s.englishName.toLowerCase().includes(q) ||
          s.number.toString() === q ||
          s.revelationOrder.toString() === q
      );
    }

    return list;
  }, [sortMode, search]);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-accent text-white">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-3" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
          <h1 className="text-2xl font-bold tracking-tight">Kuran Okuma</h1>
          <p className="text-white/70 text-sm mt-0.5">Transliterasyon &middot; Etimoloji &middot; Meal</p>
        </div>

        {/* Search & Sort */}
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          <input
            type="text"
            placeholder="Sure ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/15 text-white placeholder:text-white/50 text-sm px-3 py-2 rounded-lg outline-none focus:bg-white/25 transition-colors"
          />
          <div className="flex bg-white/15 rounded-lg overflow-hidden">
            <button
              onClick={() => setSortMode('revelation')}
              className={`text-xs px-3 py-2 font-medium transition-colors ${
                sortMode === 'revelation' ? 'bg-white text-accent' : 'text-white/80 hover:text-white'
              }`}
            >
              Inis Sirasi
            </button>
            <button
              onClick={() => setSortMode('mushaf')}
              className={`text-xs px-3 py-2 font-medium transition-colors ${
                sortMode === 'mushaf' ? 'bg-white text-accent' : 'text-white/80 hover:text-white'
              }`}
            >
              Mushaf
            </button>
          </div>
        </div>
      </header>

      {/* Surah list */}
      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-2">
        {sortedSurahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => router.push(`/surah/${surah.number}`)}
            className="w-full flex items-center gap-3 bg-card-bg border border-card-border rounded-xl p-3 hover:border-accent/30 hover:shadow-sm transition-all text-left group"
          >
            {/* Order number */}
            <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
              {sortMode === 'revelation' ? surah.revelationOrder : surah.number}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                  {surah.turkishName}
                </span>
                <span className="text-xs text-muted">({surah.englishName})</span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                {surah.englishNameTranslation} &middot; {surah.numberOfAyahs} ayet
              </p>
            </div>

            {/* Type badge */}
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                surah.revelationType === 'Meccan'
                  ? 'bg-meccan/10 text-meccan'
                  : 'bg-medinan/10 text-medinan'
              }`}
            >
              {surah.revelationType === 'Meccan' ? 'Mekki' : 'Medeni'}
            </span>

            {/* Revelation order indicator (when in mushaf mode) */}
            {sortMode === 'mushaf' && (
              <span className="text-[10px] text-muted bg-background px-1.5 py-0.5 rounded shrink-0">
                #{surah.revelationOrder}
              </span>
            )}
          </button>
        ))}

        {sortedSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">Sonuc bulunamadi</p>
          </div>
        )}
      </main>
    </div>
  );
}
