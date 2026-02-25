'use client';

import { useState, useCallback } from 'react';

interface NuzulData {
  surah: string;
  verses: Record<string, string>;
}

const nuzulCache = new Map<number, NuzulData>();

async function loadSurahNuzul(surahNumber: number): Promise<NuzulData> {
  if (nuzulCache.has(surahNumber)) return nuzulCache.get(surahNumber)!;
  const res = await fetch(`/quran/data/nuzul/${surahNumber}.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: NuzulData = await res.json();
  nuzulCache.set(surahNumber, data);
  return data;
}

/**
 * Ayet numarasina gore nuzul bilgisi arar.
 * Oncelik sirasi:
 * 1. Tam eslesme: "5"
 * 2. Aralik eslesme: "1-5" - sadece araligin ILK ayetinde gosterir
 *    (ornegin "1-5" araliği sadece ayet 1'de gosterilir, 2-5'te tekrar edilmez)
 * 3. Bulunamazsa null doner
 */
function findVerseNuzul(verses: Record<string, string>, verseNumber: number): string | null {
  // Tam eslesme
  const exact = verses[String(verseNumber)];
  if (exact) return exact;

  // Aralik eslesme - sadece araligin ilk ayetinde goster
  for (const key of Object.keys(verses)) {
    if (key.includes('-')) {
      const [start] = key.split('-').map(Number);
      if (verseNumber === start) {
        return verses[key];
      }
    }
  }

  return null;
}

export function useNuzul() {
  const [loading, setLoading] = useState(false);
  const [surahResult, setSurahResult] = useState<string | null>(null);
  const [verseResult, setVerseResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNuzul = useCallback(
    async (params: {
      surahNumber: number;
      surahName: string;
      verseNumber: number;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const data = await loadSurahNuzul(params.surahNumber);

        // Ayet bazli nuzul ara
        const verseContent = findVerseNuzul(data.verses, params.verseNumber);
        setVerseResult(verseContent);

        // Sure bazli nuzul
        if (data.surah) {
          setSurahResult(data.surah);
        } else {
          setSurahResult(null);
          if (!verseContent) {
            setError('Bu ayet icin nuzul bilgisi bulunamadi');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata olustu');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setSurahResult(null);
    setVerseResult(null);
    setError(null);
  }, []);

  return { fetchNuzul, loading, surahResult, verseResult, error, reset };
}
