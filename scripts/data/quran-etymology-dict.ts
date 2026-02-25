// Ana etimoloji sözlüğü — tüm parçaları birleştirir
import { PART_A } from './part-a-function-words';
import { PART_B } from './part-b-surahs-100-114';
import { PART_C1 } from './part-c1-surahs-88-99';
import { PART_C2 } from './part-c2-surahs-78-87';
import { PART_D } from './part-d-common-words';

export const ETYMOLOGY_DICT: Record<string, string> = {
  ...PART_A,
  ...PART_B,
  ...PART_C1,
  ...PART_C2,
  ...PART_D,
};
