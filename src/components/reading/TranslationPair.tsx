'use client';

import { useState, useRef, useEffect } from 'react';
import { TRANSLATION_OPTIONS, type TranslationKey, type Ayah } from '@/lib/types/quran';
import { useTranslationSettings } from '@/lib/hooks/useTranslationSettings';

interface TranslationPairProps {
  ayah: Pick<Ayah, TranslationKey>;
}

export default function TranslationPair({ ayah }: TranslationPairProps) {
  const { selected, toggle, isSelected, loaded } = useTranslationSettings();
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    }
    if (panelOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [panelOpen]);

  if (!loaded) return null;

  const extras = TRANSLATION_OPTIONS.filter(o => !o.isDefault);

  return (
    <div className="mt-3 space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {selected.map(key => {
          const opt = TRANSLATION_OPTIONS.find(o => o.key === key)!;
          const text = (ayah as Record<string, string | undefined>)[key];
          if (!text) return null;
          return (
            <div key={key} className="bg-card-bg border border-card-border rounded-lg p-3 relative group">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1.5">
                {opt.label}
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed">{text}</p>
              {!opt.isDefault && (
                <button
                  onClick={() => toggle(key)}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full text-muted hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all text-xs flex items-center justify-center"
                  title="Meali kaldır"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {/* Add translation button */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setPanelOpen(p => !p)}
            className="w-full h-full min-h-[64px] border-2 border-dashed border-card-border rounded-lg flex items-center justify-center gap-2 text-muted hover:text-accent hover:border-accent/40 transition-colors text-sm"
          >
            <span className="text-lg leading-none">+</span>
            <span>Meal ekle</span>
          </button>

          {panelOpen && (
            <div className="absolute bottom-full mb-2 left-0 z-50 bg-white border border-card-border rounded-xl shadow-xl p-3 w-64">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Meal seç</p>
              <div className="space-y-1">
                {extras.map(opt => {
                  const active = isSelected(opt.key as TranslationKey);
                  const available = !!(ayah as Record<string, string | undefined>)[opt.key];
                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        toggle(opt.key as TranslationKey);
                        if (!active) setPanelOpen(false);
                      }}
                      disabled={!available}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? 'bg-accent text-white'
                          : available
                          ? 'hover:bg-accent/5 text-foreground'
                          : 'text-muted/40 cursor-not-allowed'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {active && <span className="text-xs">✓</span>}
                      {!available && <span className="text-xs opacity-60">yakında</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
