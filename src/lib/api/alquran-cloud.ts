import type { AlQuranResponse, AlQuranEdition } from '../types/quran';

const BASE_URL = 'https://api.alquran.cloud/v1';

export async function fetchSurahEditions(
  surahNumber: number,
  editions: string[] = ['en.transliteration', 'tr.diyanet', 'tr.ozturk']
): Promise<AlQuranEdition[]> {
  const editionStr = editions.join(',');
  const res = await fetch(`${BASE_URL}/surah/${surahNumber}/editions/${editionStr}`, {
    next: { revalidate: 60 * 60 * 24 * 30 }, // 30 days cache
  });

  if (!res.ok) {
    throw new Error(`AlQuran API error: ${res.status} ${res.statusText}`);
  }

  const json: AlQuranResponse = await res.json();
  return json.data as AlQuranEdition[];
}
