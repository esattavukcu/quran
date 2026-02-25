'use client';

import { useState, useCallback } from 'react';

const nuzulCache = new Map<string, string>();

export function useNuzul() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNuzul = useCallback(
    async (params: {
      surahNumber: number;
      surahName: string;
      verseStart: number;
      verseEnd: number;
      verseText: string;
    }) => {
      const key = `${params.surahNumber}:${params.verseStart}-${params.verseEnd}`;

      if (nuzulCache.has(key)) {
        setResult(nuzulCache.get(key)!);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/nuzul', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        nuzulCache.set(key, data.nuzul);
        setResult(data.nuzul);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { fetchNuzul, loading, result, error, reset };
}
