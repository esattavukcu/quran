'use client';

import { useState, useEffect } from 'react';
import type { SurahWordData } from '../types/quran';

const cache = new Map<number, SurahWordData>();

export function useWordData(surahNumber: number) {
  const [data, setData] = useState<SurahWordData | null>(cache.get(surahNumber) || null);
  const [loading, setLoading] = useState(!cache.has(surahNumber));

  useEffect(() => {
    if (cache.has(surahNumber)) {
      setData(cache.get(surahNumber)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/data/words/${surahNumber}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: SurahWordData) => {
        if (!cancelled) {
          cache.set(surahNumber, json);
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [surahNumber]);

  return { data, loading };
}
