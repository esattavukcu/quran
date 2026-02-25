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
      <header className="sticky top-0 z-40 bg-accent shadow-lg">
        {/* Top gold accent line */}
        <div className="h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/60 to-amber-400/0" />

        <div
          className="max-w-2xl mx-auto px-4 pt-4 pb-2"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Kuran
              </h1>
              <p className="text-white/50 text-[11px] tracking-widest uppercase mt-0.5">
                Transliterasyon · Meal · Etimoloji
              </p>
            </div>
            <p className="text-white/30 text-xs mb-0.5">114 sure</p>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="max-w-2xl mx-auto px-4 pb-3 pt-2 flex gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Sure ara…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 text-white placeholder:text-white/35 text-sm pl-8 pr-3 py-2 rounded-lg outline-none focus:bg-white/18 transition-colors border border-white/10 focus:border-white/25"
            />
          </div>
          <div className="flex bg-white/10 rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setSortMode('revelation')}
              className={`text-xs px-3 py-2 font-semibold transition-colors ${
                sortMode === 'revelation' ? 'bg-white text-accent' : 'text-white/65 hover:text-white'
              }`}
            >
              İniş
            </button>
            <button
              onClick={() => setSortMode('mushaf')}
              className={`text-xs px-3 py-2 font-semibold transition-colors ${
                sortMode === 'mushaf' ? 'bg-white text-accent' : 'text-white/65 hover:text-white'
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
            className="w-full flex items-center bg-card-bg border border-card-border rounded-xl overflow-hidden hover:shadow-md hover:border-accent/20 active:scale-[0.99] transition-all text-left group"
          >
            {/* Revelation-type color bar on left */}
            <div
              className={`w-1 self-stretch shrink-0 ${
                surah.revelationType === 'Meccan' ? 'bg-meccan/30' : 'bg-medinan/30'
              }`}
            />

            {/* Order number */}
            <div className="px-3 py-3 shrink-0">
              <div className="w-9 h-9 bg-accent/8 border border-accent/12 text-accent rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-accent/15 transition-colors">
                {sortMode === 'revelation' ? surah.revelationOrder : surah.number}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 py-3 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                  {surah.turkishName}
                </span>
                <span className="text-xs text-muted shrink-0 truncate">({surah.englishName})</span>
              </div>
              <p className="text-[11px] text-muted mt-0.5 truncate">
                {surah.englishNameTranslation} · {surah.numberOfAyahs} ayet
                {sortMode === 'mushaf' && (
                  <span className="ml-1 text-muted/60">· #{surah.revelationOrder}. iniş</span>
                )}
              </p>
            </div>

            {/* Right: type badge + chevron */}
            <div className="pr-3 py-3 flex items-center gap-2 shrink-0">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  surah.revelationType === 'Meccan'
                    ? 'bg-meccan/8 text-meccan'
                    : 'bg-medinan/8 text-medinan'
                }`}
              >
                {surah.revelationType === 'Meccan' ? 'Mekki' : 'Medeni'}
              </span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="text-card-border group-hover:text-accent/40 transition-colors"
              >
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}

        {sortedSurahs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-3 opacity-30">🔍</div>
            <p className="text-muted text-sm">Sonuç bulunamadı</p>
          </div>
        )}
      </main>
    </div>
  );
}
