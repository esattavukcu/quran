'use client';

import { useState, useEffect } from 'react';

interface NuzulData {
  surah: string;
  verses: Record<string, string>;
}

/** Ayet -> nuzul text eslesmesi (pre-computed) */
export interface VerseNuzulMap {
  [verseNumber: number]: string;
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
 * Tum ayet nuzul bilgilerini onceden hesaplar.
 * Aralik anahtarlari (orn. "1-5") sadece ilk ayete atanir.
 */
function buildVerseNuzulMap(verses: Record<string, string>): VerseNuzulMap {
  const map: VerseNuzulMap = {};
  for (const [key, value] of Object.entries(verses)) {
    if (key.includes('-')) {
      const [start] = key.split('-').map(Number);
      map[start] = value;
    } else {
      map[Number(key)] = value;
    }
  }
  return map;
}

/**
 * Sure bazinda nuzul verisini bir kez yukler.
 * surahNuzul: sure genel bilgisi (ust banner icin)
 * verseNuzulMap: ayet -> nuzul text (her AyahCard icin)
 */
export function useSurahNuzul(surahNumber: number) {
  const [loading, setLoading] = useState(true);
  const [surahNuzul, setSurahNuzul] = useState<string | null>(null);
  const [verseNuzulMap, setVerseNuzulMap] = useState<VerseNuzulMap>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadSurahNuzul(surahNumber)
      .then((data) => {
        if (cancelled) return;
        setSurahNuzul(data.surah || null);
        setVerseNuzulMap(buildVerseNuzulMap(data.verses));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Bir hata olustu');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [surahNumber]);

  return { surahNuzul, verseNuzulMap, loading, error };
}
