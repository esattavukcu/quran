'use client';

import { useState, useEffect, useCallback } from 'react';
import { TRANSLATION_OPTIONS, type TranslationKey } from '@/lib/types/quran';

const STORAGE_KEY = 'quran-selected-translations';

const DEFAULT_KEYS: TranslationKey[] = TRANSLATION_OPTIONS
  .filter(o => o.isDefault)
  .map(o => o.key);

export function useTranslationSettings() {
  const [selected, setSelected] = useState<TranslationKey[]>(DEFAULT_KEYS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TranslationKey[];
        // Always keep defaults first, then extras
        const defaultKeys = DEFAULT_KEYS;
        const extras = parsed.filter(k => !defaultKeys.includes(k));
        setSelected([...defaultKeys, ...extras]);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const toggle = useCallback((key: TranslationKey) => {
    // Can't toggle off defaults
    if (DEFAULT_KEYS.includes(key)) return;

    setSelected(prev => {
      const next = prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isSelected = useCallback((key: TranslationKey) => selected.includes(key), [selected]);

  return { selected, toggle, isSelected, loaded };
}
