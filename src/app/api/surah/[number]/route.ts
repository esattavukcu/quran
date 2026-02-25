import { NextResponse } from 'next/server';
import { fetchSurahEditions } from '@/lib/api/alquran-cloud';
import { getRevelationOrder } from '@/lib/data/revelation-order';
import { getSurahMeta } from '@/lib/data/surah-meta';
import type { Ayah, SurahData } from '@/lib/types/quran';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const surahNum = parseInt(number, 10);

  if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
    return NextResponse.json({ error: 'Invalid surah number' }, { status: 400 });
  }

  try {
    const editions = await fetchSurahEditions(surahNum);
    const [transliteration, diyanet, ozturk] = editions;
    const meta = getSurahMeta(surahNum);

    const ayahs: Ayah[] = transliteration.ayahs.map((ayah, i) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      transliteration: ayah.text,
      diyanet: diyanet.ayahs[i].text,
      ozturk: ozturk.ayahs[i].text,
      juz: ayah.juz,
      page: ayah.page,
      sajda: ayah.sajda,
    }));

    const data: SurahData = {
      surah: {
        number: surahNum,
        name: transliteration.name,
        englishName: transliteration.englishName,
        englishNameTranslation: transliteration.englishNameTranslation,
        turkishName: meta?.turkishName || transliteration.englishName,
        numberOfAyahs: transliteration.numberOfAyahs,
        revelationType: transliteration.revelationType as 'Meccan' | 'Medinan',
        revelationOrder: getRevelationOrder(surahNum),
      },
      ayahs,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Surah API error:', error);
    return NextResponse.json({ error: 'Failed to fetch surah data' }, { status: 500 });
  }
}
