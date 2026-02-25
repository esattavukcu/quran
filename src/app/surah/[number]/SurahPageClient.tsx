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
        <div className="max-w-2xl mx-auto px-4 pt-6">
          {/* Skeleton header */}
          <div className="h-8 bg-card-border/50 rounded-lg w-48 mb-2 animate-pulse" />
          <div className="h-5 bg-card-border/50 rounded w-32 mb-8 animate-pulse" />
          {/* Skeleton cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card-bg rounded-xl border border-card-border p-5 mb-4 animate-pulse">
              <div className="h-8 w-8 bg-card-border/50 rounded-full mb-3" />
              <div className="h-6 bg-card-border/50 rounded w-full mb-2" />
              <div className="h-6 bg-card-border/50 rounded w-3/4 mb-4" />
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
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-card-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="w-8 h-8 flex items-center justify-center text-accent hover:bg-accent/10 rounded-lg transition-colors"
          >
            &#8592;
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground truncate">
              {surah.turkishName}
              <span className="text-muted font-normal ml-1.5 text-sm">({surah.englishName})</span>
            </h1>
            <p className="text-xs text-muted">
              {surah.numberOfAyahs} ayet &middot;{' '}
              <span className={surah.revelationType === 'Meccan' ? 'text-meccan' : 'text-medinan'}>
                {surah.revelationType === 'Meccan' ? 'Mekki' : 'Medeni'}
              </span>
              {' '}&middot; Inis sirasi: #{surah.revelationOrder}
            </p>
          </div>
        </div>
      </header>

      {/* Surah nuzul banner */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <SurahNuzulBanner
          surahName={surah.turkishName}
          nuzulText={surahNuzul}
          loading={nuzulLoading}
        />
      </div>

      {/* Ayah list */}
      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-card-border z-40">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
          <button
            onClick={() => prev && router.push(`/surah/${prev.surahNumber}`)}
            disabled={!prev}
            className="flex items-center gap-1.5 text-sm font-medium text-accent disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/10 px-3 py-2 rounded-lg transition-colors"
          >
            &#8592; Onceki
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm font-medium text-accent hover:bg-accent/10 px-3 py-2 rounded-lg transition-colors"
          >
            &#9776; Sureler
          </button>

          <button
            onClick={() => next && router.push(`/surah/${next.surahNumber}`)}
            disabled={!next}
            className="flex items-center gap-1.5 text-sm font-medium text-accent disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/10 px-3 py-2 rounded-lg transition-colors"
          >
            Sonraki &#8594;
          </button>
        </div>
      </nav>
    </div>
  );
}
