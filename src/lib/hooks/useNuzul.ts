'use client';

import { useState, useCallback } from 'react';

let nuzulData: Record<string, string> | null = null;

async function loadNuzulData(): Promise<Record<string, string>> {
  if (nuzulData) return nuzulData;
  const res = await fetch('/data/nuzul.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  nuzulData = await res.json();
  return nuzulData!;
}

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
      setLoading(true);
      setError(null);

      try {
        const data = await loadNuzulData();
        const content = data[String(params.surahNumber)];
        if (content) {
          setResult(content);
        } else {
          setError('Bu sure icin nuzul bilgisi bulunamadi');
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

  return { fetchNuzul, loading, result, error, reset };
}
