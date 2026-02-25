/**
 * Enhanced nuzul (revelation context) data generator for all 114 surahs.
 * Uses Claude Sonnet with detailed prompts for rich historical content.
 *
 * Requires ANTHROPIC_API_KEY in .env.local
 *
 * Usage:
 *   npx tsx scripts/build-nuzul-data-v2.ts                # resume mode (skip existing)
 *   npx tsx scripts/build-nuzul-data-v2.ts --force         # regenerate all
 *   npx tsx scripts/build-nuzul-data-v2.ts --start=102 --end=102  # single surah
 *   npx tsx scripts/build-nuzul-data-v2.ts --validate      # validate existing data
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MODEL = 'claude-sonnet-4-6';
const RATE_LIMIT_MS = 2000;

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'data', 'nuzul');
const BACKUP_DIR = path.join(process.cwd(), 'public', 'data', 'nuzul-backup');

const TURKISH_NAMES: Record<number, string> = {
  1:'Fatiha',2:'Bakara',3:'Al-i İmran',4:'Nisa',5:'Maide',6:'Enam',7:'Araf',
  8:'Enfal',9:'Tevbe',10:'Yunus',11:'Hud',12:'Yusuf',13:'Rad',14:'İbrahim',
  15:'Hicr',16:'Nahl',17:'İsra',18:'Kehf',19:'Meryem',20:'Taha',21:'Enbiya',
  22:'Hac',23:'Müminun',24:'Nur',25:'Furkan',26:'Şuara',27:'Neml',28:'Kasas',
  29:'Ankebut',30:'Rum',31:'Lokman',32:'Secde',33:'Ahzab',34:'Sebe',35:'Fatır',
  36:'Yasin',37:'Saffat',38:'Sad',39:'Zümer',40:'Mümin',41:'Fussilet',42:'Şura',
  43:'Zuhruf',44:'Duhan',45:'Casiye',46:'Ahkaf',47:'Muhammed',48:'Fetih',49:'Hucurat',
  50:'Kaf',51:'Zariyat',52:'Tur',53:'Necm',54:'Kamer',55:'Rahman',56:'Vakıa',
  57:'Hadid',58:'Mücadele',59:'Haşr',60:'Mümtehine',61:'Saff',62:'Cuma',63:'Münafikun',
  64:'Tegabun',65:'Talak',66:'Tahrim',67:'Mülk',68:'Kalem',69:'Hakka',70:'Mearic',
  71:'Nuh',72:'Cin',73:'Müzzemmil',74:'Müddessir',75:'Kıyame',76:'İnsan',77:'Mürselat',
  78:'Nebe',79:'Naziat',80:'Abese',81:'Tekvir',82:'İnfitar',83:'Mutaffifin',84:'İnşikak',
  85:'Büruc',86:'Tarık',87:'Ala',88:'Gaşiye',89:'Fecr',90:'Beled',91:'Şems',92:'Leyl',
  93:'Duha',94:'İnşirah',95:'Tin',96:'Alak',97:'Kadir',98:'Beyyine',99:'Zilzal',
  100:'Adiyat',101:'Karia',102:'Tekasür',103:'Asr',104:'Hümeze',105:'Fil',106:'Kureyş',
  107:'Maun',108:'Kevser',109:'Kafirun',110:'Nasr',111:'Tebbet',112:'İhlas',113:'Felak',114:'Nas',
};

const AYAH_COUNTS: Record<number, number> = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
  11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135,
  21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60,
  31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85,
  41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45,
  51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13,
  61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44,
  71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42,
  81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20,
  91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
  101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3,
  111: 5, 112: 4, 113: 5, 114: 6,
};

const SURAH_SYSTEM_PROMPT = `Sen Kuran'ın iniş sebepleri (Esbab-ı Nüzul) konusunda uzman bir İslam tarihçisi ve müfessirsin. Vahidi'nin "Esbab-ı Nüzul"ünü, Suyuti'nin "ed-Dürrü'l-Mensur" ve "Lübab'ün-Nükul"ünü, Taberi'nin tefsirini, İbn Kesir'in tefsirini ve hadis kaynaklarını (Buhari, Müslim, Tirmizi, Ebu Davud, Nesai, İbn Mace) iyi bilirsin.

Verilen sure hakkında KAPSAMLI nüzul bilgisi ver. 5 bölüm halinde yaz:

1. **Ne Zaman**: Mekki mi Medeni mi? Hangi yılda indi (Hicri ve Miladi tahmini)? İniş sırası nedir? Hangi olaydan önce/sonra indi? Birden fazla dönemde indiyse her dönemi belirt.

2. **Neden İndi**: Surenin inmesine sebep olan spesifik olay(lar). Kim sordu, ne oldu, hangi durum vardı? Kişiler ve kabileler adlarıyla. Birden fazla rivayet varsa en güçlü olanı öne çıkar, diğerlerini de kısaca zikret.

3. **Tarihsel Bağlam**: O dönemin sosyal, siyasi, ekonomik durumu. Müslümanların o sırada ne yaşadığı, hangi sorunlarla karşılaştığı. Diğer din mensuplarıyla (Yahudi, Hristiyan, müşrik) ilişkiler. Mekke/Medine'deki genel atmosfer.

4. **Ana Tema ve Mesaj**: Surenin temel mesajı, hitap ettiği kitle, getirdiği hükümler veya ahlaki öğretiler. Kuran'ın bütünlüğü içindeki yeri ve diğer surelerle ilişkisi.

5. **Kaynak**: Bilgilerin dayandığı klasik kaynaklar (yazar adı ve eser adı).

Önemli kurallar:
- DETAYLI ve BİLGİLENDİRİCİ yaz. En az 400 kelime olmalı.
- Kısa sureler için bile (3-8 ayet) detaylı tarihsel bağlam ve analiz sun.
- Kişi ve kabile adlarını MUTLAKA zikret.
- Rivayetlerin senedini (kimden nakledildiğini) mümkün olduğunda belirt.
- Bilimsel, nesnel ve akademik üslupla yaz.
- Türkçe yaz.`;

function getVerseSystemPrompt(surahName: string, surahNumber: number, ayahCount: number): string {
  return `Sen Kuran'ın iniş sebepleri (Esbab-ı Nüzul) konusunda uzman bir müfessirsin. Vahidi, Suyuti, Taberi, İbn Kesir ve hadis kaynaklarını iyi bilirsin.

${surahName} suresi (${surahNumber}. sure, ${ayahCount} ayet) hakkında AYET BAZINDA iniş sebeplerini ver.

Her ayet veya ayet grubu için şu bilgileri dahil et:
- Hangi SPESİFİK OLAY bu ayetin inmesine sebep oldu
- Olaya karışan KİŞİLER (sahabe, müşrik, Yahudi vb.) ADLARIYLA
- TARİH (mümkünse Hicri yıl / Miladi yıl)
- Olayın SONUCU (ne değişti, hangi hüküm geldi)
- KAYNAK (hadis kitabı veya tefsir)

Kurallar:
- İniş sebebi bilinen HER ayet veya ayet grubunu dahil et
- İniş sebebi hakkında rivayet OLMAYAN ayetleri ATLA (boş girdi oluşturma)
- Ayet aralığını "başlangıç-bitiş" formatında ver (örneğin "1-5", "6", "7-10")
- Her girdi en az 3-4 cümle olmalı, detaylı açıklama içermeli
- "Çoğalma yarışı" veya "Zamana yemin" gibi TEK CÜMLELİK açıklamalar KESİNLİKLE YASAKTIR
  Bunun yerine olayı, kişileri, zamanı, bağlamı ve kaynağı detaylı anlat
- Kısa sureler için bile (3-8 ayet) her ayetin iniş bağlamını en az 3 cümleyle açıkla
- ${ayahCount <= 10 ? 'Bu kısa bir sure. Her ayet veya küçük ayet grupları için AYRI girdiler oluştur, tüm ayetleri tek bir aralığa sıkıştırma.' : ''}
- Türkçe yaz

Yanıtı SADECE JSON olarak ver, başka bir şey yazma. Format:
{
  "1-3": "Detaylı açıklama burada...",
  "4": "Detaylı açıklama burada...",
  "5-8": "Detaylı açıklama burada..."
}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function backupFile(surahNumber: number): void {
  const src = path.join(OUTPUT_DIR, `${surahNumber}.json`);
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const dst = path.join(BACKUP_DIR, `${surahNumber}.json`);
  fs.copyFileSync(src, dst);
}

async function generateSurahNuzul(client: Anthropic, surahNumber: number): Promise<string> {
  const surahName = TURKISH_NAMES[surahNumber] || `Sure ${surahNumber}`;
  const ayahCount = AYAH_COUNTS[surahNumber] || 7;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: SURAH_SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Sure: ${surahName} (${surahNumber}. sure, ${ayahCount} ayet)`,
    }],
  });

  return message.content[0]?.type === 'text' ? message.content[0].text : '';
}

async function generateVerseNuzul(
  client: Anthropic,
  surahNumber: number
): Promise<Record<string, string>> {
  const surahName = TURKISH_NAMES[surahNumber] || `Sure ${surahNumber}`;
  const ayahCount = AYAH_COUNTS[surahNumber] || 7;
  const maxTokens = ayahCount > 30 ? 8192 : 4096;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: getVerseSystemPrompt(surahName, surahNumber, ayahCount),
    messages: [{
      role: 'user',
      content: `${surahName} suresi (${surahNumber}. sure, ${ayahCount} ayet) için ayet bazında nüzul sebeplerini JSON formatında ver.`,
    }],
  });

  const text = message.content[0]?.type === 'text' ? message.content[0].text : '';

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.warn(`    Warning: No JSON found in verse response for surah ${surahNumber}`);
    return {};
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    console.warn(`    Warning: JSON parse error for surah ${surahNumber} verse data`);
    return {};
  }
}

function validateOutput(surahNumber: number, surahText: string, verses: Record<string, string>): string[] {
  const issues: string[] = [];
  const ayahCount = AYAH_COUNTS[surahNumber] || 7;

  if (surahText.length < 300) {
    issues.push(`Surah text too short (${surahText.length} chars)`);
  }

  const verseCount = Object.keys(verses).length;
  if (verseCount === 0) {
    issues.push('No verse entries');
  }

  // Check for very short verse entries
  for (const [key, value] of Object.entries(verses)) {
    if (value.length < 80) {
      issues.push(`Verse ${key} too short (${value.length} chars)`);
    }
  }

  return issues;
}

function runValidation(): void {
  console.log('Validating existing nuzul data...\n');
  let totalIssues = 0;

  for (let i = 1; i <= 114; i++) {
    const fp = path.join(OUTPUT_DIR, `${i}.json`);
    if (!fs.existsSync(fp)) {
      console.log(`  Surah ${i.toString().padStart(3)}: ${TURKISH_NAMES[i]} - MISSING`);
      totalIssues++;
      continue;
    }

    const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
    const issues = validateOutput(i, data.surah || '', data.verses || {});
    const verseCount = Object.keys(data.verses || {}).length;
    const size = fs.statSync(fp).size;

    if (issues.length > 0) {
      console.log(`  Surah ${i.toString().padStart(3)}: ${TURKISH_NAMES[i]} (${size}B, ${verseCount} verses) - ${issues.join('; ')}`);
      totalIssues += issues.length;
    } else {
      console.log(`  Surah ${i.toString().padStart(3)}: ${TURKISH_NAMES[i]} (${size}B, ${verseCount} verses) - OK`);
    }
  }

  console.log(`\nValidation complete. ${totalIssues} issues found.`);
}

function parseArgs(): { force: boolean; start: number; end: number; validate: boolean } {
  const args = process.argv.slice(2);
  let force = false;
  let start = 1;
  let end = 114;
  let validate = false;

  for (const arg of args) {
    if (arg === '--force') force = true;
    else if (arg === '--validate') validate = true;
    else if (arg.startsWith('--start=')) start = parseInt(arg.split('=')[1], 10);
    else if (arg.startsWith('--end=')) end = parseInt(arg.split('=')[1], 10);
  }

  return { force, start, end, validate };
}

async function main() {
  const { force, start, end, validate } = parseArgs();

  if (validate) {
    runValidation();
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not found in .env.local');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Track which surahs have already been regenerated (v2 marker)
  const v2MarkerDir = path.join(process.cwd(), '.nuzul-v2-done');
  if (!force) fs.mkdirSync(v2MarkerDir, { recursive: true });

  console.log(`Generating enhanced nuzul data (model: ${MODEL})...`);
  console.log(`Range: surah ${start} to ${end}${force ? ' (FORCE mode)' : ''}\n`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = start; i <= end; i++) {
    const surahName = TURKISH_NAMES[i] || `Sure ${i}`;

    // Resume support: skip if already processed by v2
    if (!force) {
      const marker = path.join(v2MarkerDir, `${i}`);
      if (fs.existsSync(marker)) {
        console.log(`  Surah ${i.toString().padStart(3)}: ${surahName} - SKIP (already v2)`);
        skipped++;
        continue;
      }
    }

    try {
      // Backup existing data
      backupFile(i);

      // Generate surah-level nuzul
      console.log(`  Surah ${i.toString().padStart(3)}: ${surahName} - generating surah text...`);
      const surahText = await generateSurahNuzul(client, i);
      await sleep(RATE_LIMIT_MS);

      // Generate verse-level nuzul
      console.log(`  Surah ${i.toString().padStart(3)}: ${surahName} - generating verse data...`);
      const verses = await generateVerseNuzul(client, i);
      await sleep(RATE_LIMIT_MS);

      // Validate
      const issues = validateOutput(i, surahText, verses);
      if (issues.length > 0) {
        console.warn(`    Validation warnings: ${issues.join('; ')}`);
      }

      // Write output
      const output = { surah: surahText, verses };
      const filePath = path.join(OUTPUT_DIR, `${i}.json`);
      fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

      // Mark as done
      if (!force) {
        fs.writeFileSync(path.join(v2MarkerDir, `${i}`), '');
      }

      const verseCount = Object.keys(verses).length;
      console.log(`  Surah ${i.toString().padStart(3)}: ${surahName} - OK (${verseCount} verse entries, ${surahText.length} chars)\n`);
      processed++;
    } catch (err) {
      console.error(`  ERROR Surah ${i}: ${err}`);
      errors++;
      // Wait extra on error (might be rate limit)
      await sleep(5000);
    }
  }

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  if (fs.existsSync(BACKUP_DIR)) {
    console.log(`Backup: ${BACKUP_DIR}`);
  }
}

main().catch(console.error);
