'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useSurahData } from '@/lib/hooks/useSurahData';
import { useWordData } from '@/lib/hooks/useWordData';
import { useSurahNuzul } from '@/lib/hooks/useNuzul';
import { getNextInRevelation, getPrevInRevelation } from '@/lib/data/revelation-order';
import AyahCard from '@/components/reading/AyahCard';
import SurahNuzulBanner from '@/components/reading/SurahNuzulBanner';

export default function SurahPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = use(params);
  const surahNumber = parseInt(number, 10);
  const router = useRouter();
  const { data, loading, error } = useSurahData(surahNumber);
  const { data: wordData } = useWordData(surahNumber);
  const { surahNuzul, verseNuzulMap, loading: nuzulLoading } = useSurahNuzul(surahNumber);

  const prev = getPrevInRevelation(surahNumber);
  const next = getNextInRevelation(surahNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Skeleton header */}
        <div className="h-[62px] bg-accent" />
        <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">
          <div className="h-14 bg-card-bg border border-card-border rounded-xl animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card-bg rounded-xl border border-card-border p-5 animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-card-border/60 rounded-full shrink-0" />
                <div className="h-4 bg-card-border/60 rounded w-2/3" />
              </div>
              <div className="h-4 bg-card-border/40 rounded w-full" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-card-border/30 rounded-lg" />
                <div className="h-20 bg-card-border/30 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-lg text-red-500 mb-4">Hata: {error || 'Veri yüklenemedi'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-accent text-white px-4 py-2 rounded-lg"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  const { surah, ayahs } = data;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-accent shadow-md">
        {/* Top gold accent line */}
        <div className="h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0" />
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={() => router.push('/')}
            className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
            aria-label="Sureler listesine dön"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Surah info */}
          <div className="flex-1 min-w-0">
            <h1
              className="text-xl font-bold text-white truncate leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {surah.turkishName}
              <span
                className="text-white/50 font-normal text-base ml-1.5"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                ({surah.englishName})
              </span>
            </h1>
            <p className="text-[11px] text-white/50 mt-0.5 flex items-center gap-1.5">
              <span>{surah.numberOfAyahs} ayet</span>
              <span className="text-white/25">·</span>
              <span className={surah.revelationType === 'Meccan' ? 'text-purple-300/80' : 'text-emerald-300/80'}>
                {surah.revelationType === 'Meccan' ? 'Mekki' : 'Medeni'}
              </span>
              <span className="text-white/25">·</span>
              <span>#{surah.revelationOrder}. iniş</span>
            </p>
          </div>
        </div>
      </header>

      {/* Nuzul Banner — full width, very visible */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <SurahNuzulBanner
          surahName={surah.turkishName}
          nuzulText={surahNuzul}
          loading={nuzulLoading}
        />
      </div>

      {/* Ayah list */}
      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
        {ayahs.map((ayah) => {
          const verseWordData = wordData?.verses.find((v) => v.verseNumber === ayah.numberInSurah) || null;
          return (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              wordData={verseWordData}
              surahNumber={surahNumber}
              surahName={surah.turkishName}
              verseNuzul={verseNuzulMap[ayah.numberInSurah] || null}
            />
          );
        })}
      </main>

      {/* Bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="bg-card-bg/95 backdrop-blur-md border-t border-card-border">
          <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
            <button
              onClick={() => prev && router.push(`/surah/${prev.surahNumber}`)}
              disabled={!prev}
              className="flex items-center gap-1.5 text-sm font-semibold text-accent disabled:opacity-25 disabled:cursor-not-allowed hover:bg-accent/8 px-3 py-2 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Önceki
            </button>

            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:bg-accent/8 px-3 py-2 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                <rect x="2" y="11.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
              </svg>
              Sureler
            </button>

            <button
              onClick={() => next && router.push(`/surah/${next.surahNumber}`)}
              disabled={!next}
              className="flex items-center gap-1.5 text-sm font-semibold text-accent disabled:opacity-25 disabled:cursor-not-allowed hover:bg-accent/8 px-3 py-2 rounded-lg transition-colors"
            >
              Sonraki
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
