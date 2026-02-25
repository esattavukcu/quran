/**
 * Etymology JSON dosyalarındaki düşük kaliteli ("otomatik tahmin") girişleri temizler.
 *
 * Kullanım: npx tsx scripts/filter-etymology.ts
 *
 * Sadece "Kalıp:" satırında "otomatik tahmin" içeren kelimeleri siler.
 * İyi kaliteli girişler (gerçek analiz) korunur.
 */

import * as fs from 'fs';
import * as path from 'path';

const ETYM_DIR = path.join(process.cwd(), 'public', 'data', 'etymology');

function isBadEntry(value: string): boolean {
  return value.includes('otomatik tahmin');
}

async function main() {
  if (!fs.existsSync(ETYM_DIR)) {
    console.error('Hata: public/data/etymology/ dizini bulunamadı.');
    process.exit(1);
  }

  const files = fs.readdirSync(ETYM_DIR)
    .filter(f => /^\d+\.json$/.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  let totalRemoved = 0;
  let totalKept    = 0;

  for (const fname of files) {
    const num = parseInt(fname);
    const fpath = path.join(ETYM_DIR, fname);
    const raw = fs.readFileSync(fpath, 'utf-8');

    let data: { surahNumber: number; words: Record<string, string> };
    try {
      data = JSON.parse(raw);
    } catch {
      console.warn(`  ⚠ ${fname}: JSON parse hatası, atlandı`);
      continue;
    }

    const words = data.words || {};
    const before = Object.keys(words).length;

    // Kötü girişleri filtrele
    const filtered: Record<string, string> = {};
    for (const [arabic, analysis] of Object.entries(words)) {
      if (!isBadEntry(analysis)) {
        filtered[arabic] = analysis;
      }
    }

    const after   = Object.keys(filtered).length;
    const removed = before - after;

    if (removed > 0) {
      data.words = filtered;
      fs.writeFileSync(fpath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`  Sure ${String(num).padStart(3)}: ${removed} kötü giriş silindi, ${after} kelime kaldı`);
    } else {
      // Zaten temiz
    }

    totalRemoved += removed;
    totalKept    += after;
  }

  console.log('');
  console.log(`Tamamlandı:`);
  console.log(`  Silinen  : ${totalRemoved} kötü giriş`);
  console.log(`  Kalan    : ${totalKept} iyi giriş`);
  console.log('');
  console.log('Yüksek kaliteli veri üretmek için:');
  console.log('  START_SURAH=2 FORCE_REBUILD=true npx tsx scripts/build-etymology-data.ts');
}

main().catch(console.error);
