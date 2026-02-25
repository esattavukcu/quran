// Revelation order based on the traditional Egyptian/standard chronology
// Source: Tanzil.net (https://tanzil.net/docs/revelation_order)
// This maps revelationOrder (1-114) to surahNumber (mushaf order)

export interface RevelationEntry {
  revelationOrder: number;
  surahNumber: number;
  type: 'Meccan' | 'Medinan';
}

export const REVELATION_ORDER: RevelationEntry[] = [
  { revelationOrder: 1, surahNumber: 96, type: 'Meccan' },
  { revelationOrder: 2, surahNumber: 68, type: 'Meccan' },
  { revelationOrder: 3, surahNumber: 73, type: 'Meccan' },
  { revelationOrder: 4, surahNumber: 74, type: 'Meccan' },
  { revelationOrder: 5, surahNumber: 1, type: 'Meccan' },
  { revelationOrder: 6, surahNumber: 111, type: 'Meccan' },
  { revelationOrder: 7, surahNumber: 81, type: 'Meccan' },
  { revelationOrder: 8, surahNumber: 87, type: 'Meccan' },
  { revelationOrder: 9, surahNumber: 92, type: 'Meccan' },
  { revelationOrder: 10, surahNumber: 89, type: 'Meccan' },
  { revelationOrder: 11, surahNumber: 93, type: 'Meccan' },
  { revelationOrder: 12, surahNumber: 94, type: 'Meccan' },
  { revelationOrder: 13, surahNumber: 103, type: 'Meccan' },
  { revelationOrder: 14, surahNumber: 100, type: 'Meccan' },
  { revelationOrder: 15, surahNumber: 108, type: 'Meccan' },
  { revelationOrder: 16, surahNumber: 102, type: 'Meccan' },
  { revelationOrder: 17, surahNumber: 107, type: 'Meccan' },
  { revelationOrder: 18, surahNumber: 109, type: 'Meccan' },
  { revelationOrder: 19, surahNumber: 105, type: 'Meccan' },
  { revelationOrder: 20, surahNumber: 113, type: 'Meccan' },
  { revelationOrder: 21, surahNumber: 114, type: 'Meccan' },
  { revelationOrder: 22, surahNumber: 112, type: 'Meccan' },
  { revelationOrder: 23, surahNumber: 53, type: 'Meccan' },
  { revelationOrder: 24, surahNumber: 80, type: 'Meccan' },
  { revelationOrder: 25, surahNumber: 97, type: 'Meccan' },
  { revelationOrder: 26, surahNumber: 91, type: 'Meccan' },
  { revelationOrder: 27, surahNumber: 85, type: 'Meccan' },
  { revelationOrder: 28, surahNumber: 95, type: 'Meccan' },
  { revelationOrder: 29, surahNumber: 106, type: 'Meccan' },
  { revelationOrder: 30, surahNumber: 101, type: 'Meccan' },
  { revelationOrder: 31, surahNumber: 75, type: 'Meccan' },
  { revelationOrder: 32, surahNumber: 104, type: 'Meccan' },
  { revelationOrder: 33, surahNumber: 77, type: 'Meccan' },
  { revelationOrder: 34, surahNumber: 50, type: 'Meccan' },
  { revelationOrder: 35, surahNumber: 90, type: 'Meccan' },
  { revelationOrder: 36, surahNumber: 86, type: 'Meccan' },
  { revelationOrder: 37, surahNumber: 54, type: 'Meccan' },
  { revelationOrder: 38, surahNumber: 38, type: 'Meccan' },
  { revelationOrder: 39, surahNumber: 7, type: 'Meccan' },
  { revelationOrder: 40, surahNumber: 72, type: 'Meccan' },
  { revelationOrder: 41, surahNumber: 36, type: 'Meccan' },
  { revelationOrder: 42, surahNumber: 25, type: 'Meccan' },
  { revelationOrder: 43, surahNumber: 35, type: 'Meccan' },
  { revelationOrder: 44, surahNumber: 19, type: 'Meccan' },
  { revelationOrder: 45, surahNumber: 20, type: 'Meccan' },
  { revelationOrder: 46, surahNumber: 56, type: 'Meccan' },
  { revelationOrder: 47, surahNumber: 26, type: 'Meccan' },
  { revelationOrder: 48, surahNumber: 27, type: 'Meccan' },
  { revelationOrder: 49, surahNumber: 28, type: 'Meccan' },
  { revelationOrder: 50, surahNumber: 17, type: 'Meccan' },
  { revelationOrder: 51, surahNumber: 10, type: 'Meccan' },
  { revelationOrder: 52, surahNumber: 11, type: 'Meccan' },
  { revelationOrder: 53, surahNumber: 12, type: 'Meccan' },
  { revelationOrder: 54, surahNumber: 15, type: 'Meccan' },
  { revelationOrder: 55, surahNumber: 6, type: 'Meccan' },
  { revelationOrder: 56, surahNumber: 37, type: 'Meccan' },
  { revelationOrder: 57, surahNumber: 31, type: 'Meccan' },
  { revelationOrder: 58, surahNumber: 34, type: 'Meccan' },
  { revelationOrder: 59, surahNumber: 39, type: 'Meccan' },
  { revelationOrder: 60, surahNumber: 40, type: 'Meccan' },
  { revelationOrder: 61, surahNumber: 41, type: 'Meccan' },
  { revelationOrder: 62, surahNumber: 42, type: 'Meccan' },
  { revelationOrder: 63, surahNumber: 43, type: 'Meccan' },
  { revelationOrder: 64, surahNumber: 44, type: 'Meccan' },
  { revelationOrder: 65, surahNumber: 45, type: 'Meccan' },
  { revelationOrder: 66, surahNumber: 46, type: 'Meccan' },
  { revelationOrder: 67, surahNumber: 51, type: 'Meccan' },
  { revelationOrder: 68, surahNumber: 88, type: 'Meccan' },
  { revelationOrder: 69, surahNumber: 18, type: 'Meccan' },
  { revelationOrder: 70, surahNumber: 16, type: 'Meccan' },
  { revelationOrder: 71, surahNumber: 71, type: 'Meccan' },
  { revelationOrder: 72, surahNumber: 14, type: 'Meccan' },
  { revelationOrder: 73, surahNumber: 21, type: 'Meccan' },
  { revelationOrder: 74, surahNumber: 23, type: 'Meccan' },
  { revelationOrder: 75, surahNumber: 32, type: 'Meccan' },
  { revelationOrder: 76, surahNumber: 52, type: 'Meccan' },
  { revelationOrder: 77, surahNumber: 67, type: 'Meccan' },
  { revelationOrder: 78, surahNumber: 69, type: 'Meccan' },
  { revelationOrder: 79, surahNumber: 70, type: 'Meccan' },
  { revelationOrder: 80, surahNumber: 78, type: 'Meccan' },
  { revelationOrder: 81, surahNumber: 79, type: 'Meccan' },
  { revelationOrder: 82, surahNumber: 82, type: 'Meccan' },
  { revelationOrder: 83, surahNumber: 84, type: 'Meccan' },
  { revelationOrder: 84, surahNumber: 30, type: 'Meccan' },
  { revelationOrder: 85, surahNumber: 29, type: 'Meccan' },
  { revelationOrder: 86, surahNumber: 83, type: 'Meccan' },
  { revelationOrder: 87, surahNumber: 2, type: 'Medinan' },
  { revelationOrder: 88, surahNumber: 8, type: 'Medinan' },
  { revelationOrder: 89, surahNumber: 3, type: 'Medinan' },
  { revelationOrder: 90, surahNumber: 33, type: 'Medinan' },
  { revelationOrder: 91, surahNumber: 60, type: 'Medinan' },
  { revelationOrder: 92, surahNumber: 4, type: 'Medinan' },
  { revelationOrder: 93, surahNumber: 99, type: 'Medinan' },
  { revelationOrder: 94, surahNumber: 57, type: 'Medinan' },
  { revelationOrder: 95, surahNumber: 47, type: 'Medinan' },
  { revelationOrder: 96, surahNumber: 13, type: 'Medinan' },
  { revelationOrder: 97, surahNumber: 55, type: 'Medinan' },
  { revelationOrder: 98, surahNumber: 76, type: 'Medinan' },
  { revelationOrder: 99, surahNumber: 65, type: 'Medinan' },
  { revelationOrder: 100, surahNumber: 98, type: 'Medinan' },
  { revelationOrder: 101, surahNumber: 59, type: 'Medinan' },
  { revelationOrder: 102, surahNumber: 24, type: 'Medinan' },
  { revelationOrder: 103, surahNumber: 22, type: 'Medinan' },
  { revelationOrder: 104, surahNumber: 63, type: 'Medinan' },
  { revelationOrder: 105, surahNumber: 58, type: 'Medinan' },
  { revelationOrder: 106, surahNumber: 49, type: 'Medinan' },
  { revelationOrder: 107, surahNumber: 66, type: 'Medinan' },
  { revelationOrder: 108, surahNumber: 64, type: 'Medinan' },
  { revelationOrder: 109, surahNumber: 61, type: 'Medinan' },
  { revelationOrder: 110, surahNumber: 62, type: 'Medinan' },
  { revelationOrder: 111, surahNumber: 48, type: 'Medinan' },
  { revelationOrder: 112, surahNumber: 5, type: 'Medinan' },
  { revelationOrder: 113, surahNumber: 9, type: 'Medinan' },
  { revelationOrder: 114, surahNumber: 110, type: 'Medinan' },
];

// Lookup: surah number -> revelation order
const surahToRevelation = new Map<number, number>();
REVELATION_ORDER.forEach((e) => surahToRevelation.set(e.surahNumber, e.revelationOrder));

export function getRevelationOrder(surahNumber: number): number {
  return surahToRevelation.get(surahNumber) ?? 0;
}

export function getSurahByRevelationOrder(order: number): RevelationEntry | undefined {
  return REVELATION_ORDER.find((e) => e.revelationOrder === order);
}

export function getNextInRevelation(surahNumber: number): RevelationEntry | undefined {
  const current = getRevelationOrder(surahNumber);
  return getSurahByRevelationOrder(current + 1);
}

export function getPrevInRevelation(surahNumber: number): RevelationEntry | undefined {
  const current = getRevelationOrder(surahNumber);
  return getSurahByRevelationOrder(current - 1);
}
