'use client';

import { useState, useCallback } from 'react';

const etymologyCache = new Map<string, string>();

export function useEtymology() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEtymology = useCallback(
    async (params: {
      word: string;
      transliteration: string;
      verseText: string;
      surahNumber: number;
      verseNumber: number;
    }) => {
      const key = `${params.surahNumber}:${params.verseNumber}:${params.word}`;

      if (etymologyCache.has(key)) {
        setResult(etymologyCache.get(key)!);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/etymology', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        etymologyCache.set(key, data.etymology);
        setResult(data.etymology);
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

  return { fetchEtymology, loading, result, error, reset };
}
