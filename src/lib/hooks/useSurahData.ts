'use client';

import { useState, useEffect } from 'react';
import type { SurahData } from '../types/quran';

const cache = new Map<number, SurahData>();

export function useSurahData(surahNumber: number) {
  const [data, setData] = useState<SurahData | null>(cache.get(surahNumber) || null);
  const [loading, setLoading] = useState(!cache.has(surahNumber));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache.has(surahNumber)) {
      setData(cache.get(surahNumber)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/quran/data/surahs/${surahNumber}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: SurahData) => {
        if (!cancelled) {
          cache.set(surahNumber, json);
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [surahNumber]);

  return { data, loading, error };
}
