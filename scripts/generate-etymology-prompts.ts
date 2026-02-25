/**
 * Her sure için ChatGPT/Gemini'ye yapıştırılabilecek hazır prompt dosyaları üretir.
 * Çıktı: prompts/etymology/{surahNum}-{surahName}.txt
 *
 * Kullanım: npx tsx scripts/generate-etymology-prompts.ts
 * Ardından: her .txt dosyasını ChatGPT'ye yapıştır, cevabı kopyala,
 *            scripts/import-etymology.ts ile içe aktar (veya manuel olarak kaydet).
 */

import * as fs from 'fs';
import * as path from 'path';

const WORDS_DIR  = path.join(process.cwd(), 'public', 'data', 'words');
const ETYM_DIR   = path.join(process.cwd(), 'public', 'data', 'etymology');
const PROMPT_DIR = path.join(process.cwd(), 'prompts', 'etymology');

// Sure isimleri (kısa liste — tam liste gerekirse surah-meta'dan al)
const SURAH_NAMES: Record<number, string> = {
  1:'Fatiha',2:'Bakara',3:'Al-i-Imran',4:'Nisa',5:'Maide',6:'Enam',7:'Araf',8:'Enfal',
  9:'Tevbe',10:'Yunus',11:'Hud',12:'Yusuf',13:'Rad',14:'Ibrahim',15:'Hicr',16:'Nahl',
  17:'Isra',18:'Kehf',19:'Meryem',20:'Taha',21:'Enbiya',22:'Hac',23:'Muminun',24:'Nur',
  25:'Furkan',26:'Suara',27:'Neml',28:'Kasas',29:'Ankebut',30:'Rum',31:'Lokman',
  32:'Secde',33:'Ahzab',34:'Sebe',35:'Fatir',36:'Yasin',37:'Saffat',38:'Sad',
  39:'Zumer',40:'Mumin',41:'Fussilet',42:'Sura',43:'Zuhruf',44:'Duhan',45:'Casiye',
  46:'Ahkaf',47:'Muhammed',48:'Fetih',49:'Hucurat',50:'Kaf',51:'Zariyat',52:'Tur',
  53:'Necm',54:'Kamer',55:'Rahman',56:'Vakia',57:'Hadid',58:'Mucadele',59:'Hasr',
  60:'Mumtehine',61:'Saf',62:'Cuma',63:'Munafikun',64:'Tegabun',65:'Talak',66:'Tahrim',
  67:'Mulk',68:'Kalem',69:'Hakka',70:'Mearic',71:'Nuh',72:'Cin',73:'Muzzemmil',
  74:'Muddessir',75:'Kiyame',76:'Insan',77:'Murselet',78:'Nebe',79:'Naziat',80:'Abese',
  81:'Tekvir',82:'Infitar',83:'Mutaffifin',84:'Insikak',85:'Buruc',86:'Tarik',
  87:'Ala',88:'Gasiye',89:'Fecr',90:'Beled',91:'Sems',92:'Leyl',93:'Duha',
  94:'Insira',95:'Tin',96:'Alak',97:'Kadir',98:'Beyyine',99:'Zilzal',100:'Adiyat',
  101:'Karia',102:'Tekasur',103:'Asr',104:'Humeze',105:'Fil',106:'Kureys',
  107:'Maun',108:'Kevser',109:'Kafirun',110:'Nasr',111:'Tebbet',112:'Ihlas',
  113:'Felak',114:'Nas',
};

function getUniqueWords(surahNum: number): Array<{ arabic: string; transliteration: string }> {
  const fp = path.join(WORDS_DIR, `${surahNum}.json`);
  if (!fs.existsSync(fp)) return [];
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  const seen = new Set<string>();
  const result: Array<{ arabic: string; transliteration: string }> = [];
  for (const verse of data.verses) {
    for (const word of verse.words) {
      if (!seen.has(word.arabic)) {
        seen.add(word.arabic);
        result.push({ arabic: word.arabic, transliteration: word.transliteration });
      }
    }
  }
  return result;
}

function isEtymologyDone(surahNum: number): boolean {
  return fs.existsSync(path.join(ETYM_DIR, `${surahNum}.json`));
}

function buildPrompt(surahNum: number, surahName: string, words: Array<{ arabic: string; transliteration: string }>): string {
  const wordList = words
    .map((w, i) => `${i + 1}. ${w.transliteration} (${w.arabic})`)
    .join('\n');

  return `Sen Arapça etimoloji uzmanısın. Kuran-ı Kerim'deki Arapça kelimelerin kök ve morfoloji analizini yapıyorsun.

## Görev
Aşağıda Sure ${surahNum} (${surahName})'den ${words.length} benzersiz Arapça kelime verilmiştir.
Her kelime için tek bir paragraf halinde analiz yaz.

## Format (her kelime için):
"transliterasyon" (Arapça)
Kök: X-X-X — temel anlam
Kalıp: morfolojik yapı ve formu
Kuran'da: Sure:Ayet referansları (2-4 örnek)

## Kelimeler (Sure ${surahNum} - ${surahName}):
${wordList}

## Kurallar:
- Her kelime için analizi TAM OLARAK şu formatta ver (yeni satırla ayrılmış 4 satır):
  "transliterasyon" (Arapça)
  Kök: ...
  Kalıp: ...
  Kuran'da: ...
- Kelimeler arasına BOŞ SATIR koy
- Başka açıklama, giriş veya sonuç ekleme
- Sadece verilen ${words.length} kelimeyi analiz et, ekstra kelime ekleme

## Beklenen çıktı örneği:
"bismī" (بِسْمِ)
Kök: S-M-Y — adlandırma, isim verme
Kalıp: ba- edatı + isim (genetif durumu)
Kuran'da: 1:1, 11:41, 27:30

"llahi" (ٱللَّهِ)
Kök: İ-L-H — tanrı, tapılan varlık
Kalıp: el- tanım edatı + Allah, genetif durum
Kuran'da: 1:1, 2:255, 3:18

---
ŞİMDİ ${words.length} KELİMENİN ANALİZİNİ YAP:`;
}

async function main() {
  fs.mkdirSync(PROMPT_DIR, { recursive: true });

  const allFiles = fs.readdirSync(WORDS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => parseInt(f))
    .sort((a, b) => a - b);

  let generated = 0;
  let skipped = 0;

  for (const surahNum of allFiles) {
    if (isEtymologyDone(surahNum)) {
      skipped++;
      continue;
    }

    const words = getUniqueWords(surahNum);
    if (words.length === 0) continue;

    const surahName = SURAH_NAMES[surahNum] || `Sure${surahNum}`;
    const prompt = buildPrompt(surahNum, surahName, words);
    const outFile = path.join(PROMPT_DIR, `${String(surahNum).padStart(3, '0')}-${surahName}.txt`);

    fs.writeFileSync(outFile, prompt, 'utf-8');
    console.log(`  ✓ ${String(surahNum).padStart(3)}-${surahName}.txt  (${words.length} kelime)`);
    generated++;
  }

  console.log(`\nToplam: ${generated} prompt oluşturuldu, ${skipped} sure zaten tamamlanmış.`);
  console.log(`\nDosyalar: prompts/etymology/ klasöründe`);
  console.log(`\nSonraki adım:`);
  console.log(`  1. Her .txt dosyasını ChatGPT/Gemini'ye yapıştır`);
  console.log(`  2. Cevabı prompts/etymology/{num}-{name}-RESPONSE.txt olarak kaydet`);
  console.log(`  3. npx tsx scripts/import-etymology.ts ile içe aktar`);
}

main().catch(console.error);
