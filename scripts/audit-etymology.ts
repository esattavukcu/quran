/**
 * Etimoloji JSON dosyalarının kalite raporunu çıkarır.
 *
 * Kullanım: npx tsx scripts/audit-etymology.ts
 *
 * Kalite kriterleri:
 *   İYİ   : "otomatik tahmin" oranı < %20
 *   ORTA  : %20 – %50
 *   KÖTÜ  : > %50
 */

import * as fs from 'fs';
import * as path from 'path';

const ETYM_DIR = path.join(process.cwd(), 'public', 'data', 'etymology');

interface SurahReport {
  num: number;
  total: number;
  bad: number;
  pct: number;
  grade: 'İYİ' | 'ORTA' | 'KÖTÜ' | 'BOŞ';
}

function gradeOf(pct: number, total: number): SurahReport['grade'] {
  if (total === 0) return 'BOŞ';
  if (pct < 20)   return 'İYİ';
  if (pct < 50)   return 'ORTA';
  return 'KÖTÜ';
}

async function main() {
  if (!fs.existsSync(ETYM_DIR)) {
    console.error('Hata: public/data/etymology/ dizini bulunamadı.');
    process.exit(1);
  }

  const files = fs.readdirSync(ETYM_DIR)
    .filter(f => /^\d+\.json$/.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  const reports: SurahReport[] = [];

  for (const fname of files) {
    const num = parseInt(fname);
    const raw = fs.readFileSync(path.join(ETYM_DIR, fname), 'utf-8');
    let data: { surahNumber: number; words: Record<string, string> };
    try {
      data = JSON.parse(raw);
    } catch {
      console.warn(`  ⚠ ${fname}: JSON parse hatası`);
      continue;
    }

    const words = Object.values(data.words || {});
    const total = words.length;
    const bad   = words.filter(v => v.includes('otomatik tahmin')).length;
    const pct   = total === 0 ? 0 : Math.round((bad / total) * 100);
    const grade = gradeOf(pct, total);
    reports.push({ num, total, bad, pct, grade });
  }

  // ── Özet tablo ──────────────────────────────────────────────
  console.log('\n┌──────┬────────┬──────┬────────┬────────┐');
  console.log('│ Sure │ Toplam │ Kötü │   %    │ Kalite │');
  console.log('├──────┼────────┼──────┼────────┼────────┤');

  const counts = { good: 0, mid: 0, bad: 0, empty: 0 };

  for (const r of reports) {
    const grade  = r.grade.padEnd(4);
    const num    = String(r.num).padStart(3);
    const total  = String(r.total).padStart(6);
    const bad    = String(r.bad).padStart(4);
    const pct    = (String(r.pct) + '%').padStart(6);
    const symbol = r.grade === 'İYİ' ? '✓' : r.grade === 'ORTA' ? '~' : r.grade === 'BOŞ' ? '-' : '✗';
    console.log(`│ ${num}  │ ${total} │ ${bad} │ ${pct}  │ ${symbol} ${grade}│`);

    if (r.grade === 'İYİ')  counts.good++;
    else if (r.grade === 'ORTA') counts.mid++;
    else if (r.grade === 'KÖTÜ') counts.bad++;
    else counts.empty++;
  }

  console.log('└──────┴────────┴──────┴────────┴────────┘\n');

  // ── Özet ────────────────────────────────────────────────────
  const totalWords = reports.reduce((s, r) => s + r.total, 0);
  const totalBad   = reports.reduce((s, r) => s + r.bad, 0);
  const overallPct = totalWords === 0 ? 0 : Math.round((totalBad / totalWords) * 100);

  console.log(`Toplam kelime : ${totalWords}`);
  console.log(`Kötü giriş   : ${totalBad} (%${overallPct})`);
  console.log('');
  console.log(`✓ İYİ   : ${counts.good} sure`);
  console.log(`~ ORTA  : ${counts.mid} sure`);
  console.log(`✗ KÖTÜ  : ${counts.bad} sure`);
  if (counts.empty) console.log(`- BOŞ   : ${counts.empty} sure`);

  // ── Kötü sureleri listele ────────────────────────────────────
  const badSurahs = reports.filter(r => r.grade === 'KÖTÜ' || r.grade === 'ORTA');
  if (badSurahs.length > 0) {
    console.log('\nYeniden üretilmesi önerilen sureler:');
    for (const r of badSurahs) {
      console.log(`  Sure ${r.num}: %${r.pct} kötü (${r.bad}/${r.total} kelime)`);
    }
  }

  console.log('\nTemizlemek için:');
  console.log('  npx tsx scripts/filter-etymology.ts');
}

main().catch(console.error);
