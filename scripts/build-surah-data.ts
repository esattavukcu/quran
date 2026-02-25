/**
 * Build-time script: fetches surah data (transliteration + 2 Turkish translations)
 * from AlQuran Cloud API for all 114 surahs and saves as static JSON.
 *
 * Usage: npx tsx scripts/build-surah-data.ts
 */

interface AlQuranAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

interface AlQuranEdition {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: AlQuranAyah[];
}

interface AlQuranResponse {
  code: number;
  status: string;
  data: AlQuranEdition[];
}

// Revelation order from Tanzil.net
const REVELATION_ORDER: Record<number, number> = {
  96:1,68:2,73:3,74:4,1:5,111:6,81:7,87:8,92:9,89:10,
  93:11,94:12,103:13,100:14,108:15,102:16,107:17,109:18,105:19,113:20,
  114:21,112:22,53:23,80:24,97:25,91:26,85:27,95:28,106:29,101:30,
  75:31,104:32,77:33,50:34,90:35,86:36,54:37,38:38,7:39,72:40,
  36:41,25:42,35:43,19:44,20:45,56:46,26:47,27:48,28:49,17:50,
  10:51,11:52,12:53,15:54,6:55,37:56,31:57,34:58,39:59,40:60,
  41:61,42:62,43:63,44:64,45:65,46:66,51:67,88:68,18:69,16:70,
  71:71,14:72,21:73,23:74,32:75,52:76,67:77,69:78,70:79,78:80,
  79:81,82:82,84:83,30:84,29:85,83:86,2:87,8:88,3:89,33:90,
  60:91,4:92,99:93,57:94,47:95,13:96,55:97,76:98,65:99,98:100,
  59:101,24:102,22:103,63:104,58:105,49:106,66:107,64:108,61:109,62:110,
  48:111,5:112,9:113,110:114,
};

// Turkish names for all surahs
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

async function fetchSurah(surahNumber: number): Promise<AlQuranEdition[]> {
  const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/en.transliteration,tr.diyanet,tr.ozturk`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AlQuran API error for surah ${surahNumber}: ${res.status}`);
  const json: AlQuranResponse = await res.json();
  return json.data;
}

async function main() {
  const fs = await import('fs');
  const path = await import('path');

  const outputDir = path.join(process.cwd(), 'public', 'data', 'surahs');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Building surah data for 114 surahs...\n');

  for (let i = 1; i <= 114; i++) {
    try {
      const [transliteration, diyanet, ozturk] = await fetchSurah(i);

      const data = {
        surah: {
          number: i,
          name: transliteration.name,
          englishName: transliteration.englishName,
          englishNameTranslation: transliteration.englishNameTranslation,
          turkishName: TURKISH_NAMES[i] || transliteration.englishName,
          numberOfAyahs: transliteration.numberOfAyahs,
          revelationType: transliteration.revelationType === 'Meccan' ? 'Meccan' : 'Medinan',
          revelationOrder: REVELATION_ORDER[i] || 0,
        },
        ayahs: transliteration.ayahs.map((ayah, idx) => ({
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          transliteration: ayah.text,
          diyanet: diyanet.ayahs[idx].text,
          ozturk: ozturk.ayahs[idx].text,
          juz: ayah.juz,
          page: ayah.page,
          sajda: ayah.sajda,
        })),
      };

      const filePath = path.join(outputDir, `${i}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log(`  Surah ${i.toString().padStart(3)}: ${TURKISH_NAMES[i]} - ${data.ayahs.length} ayets`);
    } catch (err) {
      console.error(`  ERROR Surah ${i}:`, err);
    }

    // Rate limit
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('\nDone! Surah data saved to public/data/surahs/');
}

main().catch(console.error);
