'use client';

import { useState, useCallback } from 'react';

const etymologyCache = new Map<number, Record<string, string>>();

async function loadSurahEtymology(surahNumber: number): Promise<Record<string, string>> {
  if (etymologyCache.has(surahNumber)) return etymologyCache.get(surahNumber)!;

  try {
    const res = await fetch(`/data/etymology/${surahNumber}.json`);
    if (!res.ok) return {};
    const data = await res.json();
    const words = data.words || {};
    etymologyCache.set(surahNumber, words);
    return words;
  } catch {
    return {};
  }
}

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
      setLoading(true);
      setError(null);

      try {
        const words = await loadSurahEtymology(params.surahNumber);
        const content = words[params.word];
        if (content) {
          setResult(content);
        } else {
          setError('Bu kelime icin etimoloji bilgisi henuz eklenmedi');
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
    setResult(null);
    setError(null);
  }, []);

  return { fetchEtymology, loading, result, error, reset };
}
