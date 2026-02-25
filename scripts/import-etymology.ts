/**
 * ChatGPT/Gemini'den alınan etimoloji cevaplarını içe aktarır.
 *
 * Giriş : prompts/etymology/{num}-{name}-RESPONSE.txt
 * Çıktı : public/data/etymology/{num}.json
 *
 * Kullanım: npx tsx scripts/import-etymology.ts
 *
 * Cevap dosyası formatı (her kelime arasına boş satır):
 *   "transliterasyon" (Arapça)
 *   Kök: ROOT — anlam
 *   Kalıp: morfoloji
 *   Kuran'da: sure:ayet referansları
 */

import * as fs from 'fs';
import * as path from 'path';

const WORDS_DIR    = path.join(process.cwd(), 'public', 'data', 'words');
const ETYM_DIR     = path.join(process.cwd(), 'public', 'data', 'etymology');
const RESPONSE_DIR = path.join(process.cwd(), 'prompts', 'etymology');

// ──────────────────────────────────────────────────────────────
// Parser: response metnini kelime bloklarına ayırır
// ──────────────────────────────────────────────────────────────
function parseResponse(text: string): Array<{ arabic: string; analysis: string }> {
  const results: Array<{ arabic: string; analysis: string }> = [];

  // Boş satırla ayrılmış blokları al
  const blocks = text
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(b => b.length > 0);

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) continue;

    // 1. satırdan Arapça harfleri ayıkla: "transliterasyon" (بِسْمِ)
    const firstLine = lines[0];

    // Parantez içindeki son bölümü al
    const arabicMatch = firstLine.match(/\(([^)]+)\)\s*$/);
    if (!arabicMatch) {
      // Parantez yoksa satır atla
      continue;
    }

    const arabic = arabicMatch[1].trim();

    // Kök / Kalıp / Kuran'da satırlarını doğrula
    const hasKok    = lines.some(l => l.startsWith('Kök:') || l.startsWith('Kok:'));
    const hasKalip  = lines.some(l => l.startsWith('Kalıp:') || l.startsWith('Kalip:'));
    const hasKuranda = lines.some(l => l.startsWith('Kuran') || l.startsWith("Kur'an"));

    if (!hasKok && !hasKalip && !hasKuranda) continue; // format uygun değil

    results.push({ arabic, analysis: lines.join('\n') });
  }

  return results;
}

// ──────────────────────────────────────────────────────────────
// Surah'ın benzersiz Arapça kelimelerini sıralı döndür
// ──────────────────────────────────────────────────────────────
function getUniqueArabicWords(surahNum: number): string[] {
  const fp = path.join(WORDS_DIR, `${surahNum}.json`);
  if (!fs.existsSync(fp)) return [];
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  const seen = new Set<string>();
  const result: string[] = [];
  for (const verse of data.verses) {
    for (const word of verse.words) {
      if (!seen.has(word.arabic)) {
        seen.add(word.arabic);
        result.push(word.arabic);
      }
    }
  }
  return result;
}

// ──────────────────────────────────────────────────────────────
// Ana fonksiyon
// ──────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(RESPONSE_DIR)) {
    console.error(`Hata: "${RESPONSE_DIR}" dizini bulunamadı.`);
    console.error('Önce şunu çalıştırın: npx tsx scripts/generate-etymology-prompts.ts');
    process.exit(1);
  }

  fs.mkdirSync(ETYM_DIR, { recursive: true });

  const responseFiles = fs.readdirSync(RESPONSE_DIR)
    .filter(f => f.endsWith('-RESPONSE.txt'))
    .sort();

  if (responseFiles.length === 0) {
    console.log('Hiç cevap dosyası bulunamadı.');
    console.log('');
    console.log('Beklenen dosya adı formatı:');
    console.log('  prompts/etymology/001-Fatiha-RESPONSE.txt');
    console.log('  prompts/etymology/002-Bakara-RESPONSE.txt');
    console.log('  ...');
    return;
  }

  let imported = 0;
  let skipped  = 0;
  let errors   = 0;

  for (const fname of responseFiles) {
    // Dosya adından sure numarasını çıkar: "001-Fatiha-RESPONSE.txt" → 1
    const numMatch = fname.match(/^(\d+)-/);
    if (!numMatch) {
      console.warn(`  ⚠  ${fname}: geçersiz dosya adı formatı`);
      continue;
    }
    const surahNum = parseInt(numMatch[1], 10);

    const responseText = fs.readFileSync(
      path.join(RESPONSE_DIR, fname),
      'utf-8'
    );

    const parsed = parseResponse(responseText);

    if (parsed.length === 0) {
      console.error(`  ✗  ${fname}: hiç kelime parse edilemedi (format hatalı?)`);
      errors++;
      continue;
    }

    // Mevcut JSON dosyasını yükle (varsa üstüne yaz / yoksa sıfırdan)
    const outPath = path.join(ETYM_DIR, `${surahNum}.json`);
    let existing: { surahNumber: number; words: Record<string, string> } = {
      surahNumber: surahNum,
      words: {},
    };
    if (fs.existsSync(outPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(outPath, 'utf-8'));
      } catch {
        // Bozuk dosya → sıfırla
        existing = { surahNumber: surahNum, words: {} };
      }
    }

    // Kelimeleri eşleştir
    const knownWords = new Set(getUniqueArabicWords(surahNum));
    let added    = 0;
    let unknown  = 0;

    for (const { arabic, analysis } of parsed) {
      if (knownWords.size > 0 && !knownWords.has(arabic)) {
        // Sure'nin kelime listesinde yoksa uyarı ver ama yine de ekle
        unknown++;
      }
      existing.words[arabic] = analysis;
      added++;
    }

    fs.writeFileSync(outPath, JSON.stringify(existing, null, 2), 'utf-8');

    const warnStr = unknown > 0 ? `  ⚠ ${unknown} bilinmeyen kelime` : '';
    console.log(
      `  ✓  Sure ${String(surahNum).padStart(3)}: ${added} kelime → ${surahNum}.json${warnStr}`
    );
    imported++;
  }

  console.log('');
  console.log(`Tamamlandı: ${imported} sure içe aktarıldı` +
    (skipped  > 0 ? `, ${skipped} atlandı` : '') +
    (errors   > 0 ? `, ${errors} HATA` : '') + '.'
  );

  if (errors > 0) {
    console.log('');
    console.log('Hatalı dosyalar için:');
    console.log('  - Cevabın doğru formatta olduğunu kontrol et');
    console.log('  - Kelimeler arasında boş satır olmalı');
    console.log('  - Her kelime "transliterasyon (Arapça)" satırıyla başlamalı');
  }
}

main().catch(console.error);
