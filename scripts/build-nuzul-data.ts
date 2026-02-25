/**
 * Build-time script: generates nuzul (revelation context) data for all 114 surahs
 * using Anthropic Claude API and saves as static JSON.
 *
 * Requires ANTHROPIC_API_KEY in .env.local
 * Usage: npx tsx scripts/build-nuzul-data.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

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

async function generateNuzul(client: Anthropic, surahNumber: number): Promise<string> {
  const surahName = TURKISH_NAMES[surahNumber] || `Sure ${surahNumber}`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 800,
    system: `Sen Esbab-ı Nüzul (Kuran ayetlerinin iniş sebepleri) konusunda uzman bir İslam alimisin. Verilen sure hakkında genel nüzul bilgisini Türkçe olarak ver:

1. **Ne Zaman**: Bu sure ne zaman indi (Mekki/Medeni dönem, yaklaşık yıl)
2. **Neden**: Hangi olay veya durum bu surenin inmesine sebep oldu
3. **Tarihsel Bağlam**: O dönemdeki sosyal ve siyasi ortam
4. **Ana Tema**: Surenin ana konusu ve mesajı
5. **Kaynak**: Bu bilgilerin dayandığı klasik kaynaklar (Vahidi, Suyuti vb.)

Yanıtını 300 kelimeyi geçmeyecek şekilde kısa ve öz tut. Bilimsel ve nesnel ol.`,
    messages: [
      {
        role: 'user',
        content: `Sure: ${surahName} (${surahNumber}. sure)`,
      },
    ],
  });

  return message.content[0]?.type === 'text' ? message.content[0].text : '';
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not found in .env.local');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const outputDir = path.join(process.cwd(), 'public', 'data', 'nuzul');
  fs.mkdirSync(outputDir, { recursive: true });

  // Check which surahs already have data (resume support)
  const existing = new Set<number>();
  for (let i = 1; i <= 114; i++) {
    const fp = path.join(outputDir, `${i}.json`);
    if (fs.existsSync(fp)) existing.add(i);
  }

  if (existing.size > 0) {
    console.log(`Resuming: ${existing.size} surahs already done, ${114 - existing.size} remaining.\n`);
  }

  console.log('Generating nuzul data for 114 surahs...\n');

  for (let i = 1; i <= 114; i++) {
    if (existing.has(i)) {
      console.log(`  Surah ${i.toString().padStart(3)}: ${TURKISH_NAMES[i]} - SKIP (already exists)`);
      continue;
    }

    try {
      const nuzul = await generateNuzul(client, i);
      const data = { surahNumber: i, surahName: TURKISH_NAMES[i], content: nuzul };
      const filePath = path.join(outputDir, `${i}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  Surah ${i.toString().padStart(3)}: ${TURKISH_NAMES[i]} - OK`);
    } catch (err) {
      console.error(`  ERROR Surah ${i}:`, err);
    }

    // Rate limit - 1 second between calls
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log('\nDone! Nuzul data saved to public/data/nuzul/');
}

main().catch(console.error);
