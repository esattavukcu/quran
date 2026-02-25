/** Bölüm A — Edatlar, partiküller, zamirler, bağlaçlar (~110 giriş) */
export const PART_A: Record<string, string> = {

  // ── Edatlar (Prepositions) ──────────────────────────────────────────
  "مِن": '"min" (مِن)\nKök: — yapısal edat\nKalıp: Harfü\'l-cerr; menşe, parça, nedensellik anlamı\nKur\'an\'da: 3226 kez — Kuran\'ın en sık edatı',
  "مِنَ": '"mina" (مِنَ)\nKök: — yapısal edat\nKalıp: min edatının elif-lam\'dan önce gelen açık sesli biçimi\nKur\'an\'da: 2:19, 3:14 — çok yaygın kullanım',
  "مِّن": '"min" (مِّن)\nKök: — yapısal edat\nKalıp: min edatının şeddeli (idgamlı) yazımı\nKur\'an\'da: önceki sessizle birleştiğinde bu biçim alır',
  "مِّنَ": '"mina" (مِّنَ)\nKök: — yapısal edat\nKalıp: min edatının şeddeli + açık sesli biçimi\nKur\'an\'da: yaygın variant',
  "فِى": '"fī" (فِى)\nKök: — yapısal edat\nKalıp: Zarfiyet edatı; mekan, zaman, soyut içerik\nKur\'an\'da: 1732 kez — mekânsal ve mecazî kullanımlar',
  "فِيهِ": '"fīhi" (فِيهِ)\nKök: — edat + zamir\nKalıp: fī + hi (3. tekil erkek zamiri); "onda/içinde"\nKur\'an\'da: 2:2 (lā rayba fīhi — onda şüphe yok)',
  "فِيهَا": '"fīhā" (فِيهَا)\nKök: — edat + zamir\nKalıp: fī + hā (3. tekil dişi zamiri); "onda/içinde"\nKur\'an\'da: yaygın kullanım; جَنَّةٍ فِيهَا gibi',
  "عَلَى": '"ʿalā" (عَلَى)\nKök: ʿ-L-W — yükselmek, üstte olmak\nKalıp: Harfü\'l-cerr; üstünde, hakkında, aleyhine\nKur\'an\'da: 1375 kez — çok yaygın',
  "عَلَيْهِمْ": '"ʿalayhim" (عَلَيْهِمْ)\nKök: ʿ-L-W + çoğul zamir\nKalıp: ʿalay + him; "onların üzerine"\nKur\'an\'da: 1:7, 4:69 — son derece yaygın',
  "عَلَيْهِ": '"ʿalayhi" (عَلَيْهِ)\nKök: ʿ-L-W + 3. tekil zamir\nKalıp: ʿalay + hi; "onun üzerine/hakkında"\nKur\'an\'da: 2:37, çok yaygın',
  "عَلَيْكُمْ": '"ʿalaykum" (عَلَيْكُمْ)\nKök: ʿ-L-W + 2. çoğul zamir\nKalıp: ʿalay + kum; "sizin üzerinize"\nKur\'an\'da: 2:183, 4:1 — yaygın hitap formu',
  "عَلَيْكَ": '"ʿalayka" (عَلَيْكَ)\nKök: ʿ-L-W + 2. tekil zamir\nKalıp: ʿalay + ka; "senin üzerine"\nKur\'an\'da: 2:119, 42:48 — peygambere hitap',
  "إِلَى": '"ilā" (إِلَى)\nKök: — yapısal edat\nKalıp: Harfü\'l-cerr; yön, hedef, sınır\nKur\'an\'da: 742 kez — hareket yönü bildiren edat',
  "إِلَيْهِ": '"ilayhi" (إِلَيْهِ)\nKök: — edat + 3. tekil zamir\nKalıp: ilā + hi; "ona doğru/onun yanına"\nKur\'an\'da: 2:28, yaygın',
  "إِلَيْكَ": '"ilayka" (إِلَيْكَ)\nKök: — edat + 2. tekil zamir\nKalıp: ilā + ka; "sana doğru"\nKur\'an\'da: 4:105, 17:86 — peygambere hitap',
  "عَن": '"ʿan" (عَن)\nKök: — yapısal edat\nKalıp: Harfü\'l-cerr; uzaklık, hakkında, bundan dolayı\nKur\'an\'da: çok yaygın — عَنِ ٱلْمُؤْمِنِينَ gibi',
  "عَنِ": '"ʿani" (عَنِ)\nKök: — yapısal edat\nKalıp: ʿan edatının elif-lam\'dan önce gelen biçimi\nKur\'an\'da: 9:67, 102:8 — لَتُسْـَٔلُنَّ عَنِ ٱلنَّعِيمِ',
  "عَنْهُ": '"ʿanhu" (عَنْهُ)\nKök: — edat + 3. tekil zamir\nKalıp: ʿan + hu; "ondan/onun hakkında"\nKur\'an\'da: 2:255, yaygın',
  "مَعَ": '"maʿa" (مَعَ)\nKök: — yapısal edat\nKalıp: beraberlik anlamı; refakat, birliktelik\nKur\'an\'da: 2:153 — إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
  "حَتَّىٰ": '"ḥattā" (حَتَّىٰ)\nKök: — yapısal edat\nKalıp: nihayete kadar, sonunda; edat ve bağlaç işlevi\nKur\'an\'da: 2:187, yaygın — sınır/varış ifadesi',
  "بَعْدِ": '"baʿdi" (بَعْدِ)\nKök: B-ʿ-D — uzaklık, sonralık\nKalıp: İsim-edat işlevli; genetif; "sonra"\nKur\'an\'da: 2:27, yaygın',
  "بَعْدَ": '"baʿda" (بَعْدَ)\nKök: B-ʿ-D — uzaklık, sonralık\nKalıp: İsim-edat; akuzatif hali\nKur\'an\'da: 2:209, yaygın — zamanlama ifadesi',
  "قَبْلِ": '"qabli" (قَبْلِ)\nKök: Q-B-L — önde olmak, kabul etmek\nKalıp: İsim-edat; genetif; "önce"\nKur\'an\'da: 2:25, yaygın',
  "قَبْلَ": '"qabla" (قَبْلَ)\nKök: Q-B-L — önde olmak\nKalıp: İsim-edat; akuzatif; "öncesinde"\nKur\'an\'da: 2:102, yaygın',

  // ── Bağlaçlar (Conjunctions) ────────────────────────────────────────
  "ثُمَّ": '"thumma" (ثُمَّ)\nKök: — yapısal bağlaç\nKalıp: Atıf harfi; sıralama ve zaman aralığı ifadesi; "sonra, ardından"\nKur\'an\'da: 2:28, çok yaygın',
  "أَوْ": '"aw" (أَوْ)\nKök: — yapısal bağlaç\nKalıp: Seçenek/şüphe bağlacı; "ya da, veya"\nKur\'an\'da: 2:19, yaygın',
  "وَمِن": '"wamin" (وَمِن)\nKök: — bağlaç + edat\nKalıp: wa (ve) + min (den); bağlantılı edat öbeği\nKur\'an\'da: 2:8, yaygın',
  "أَمَّا": '"ammā" (أَمَّا)\nKök: — yapısal partikül\nKalıp: Şart anlamı taşıyan konu başlatma edatı; "ama, şuna gelince"\nKur\'an\'da: 101:6, 101:8 — فَأَمَّا مَن وَأَمَّا مَن',
  "وَأَمَّا": '"wa-ammā" (وَأَمَّا)\nKök: — bağlaç + partikül\nKalıp: wa + ammā; önceki maddeyle karşıtlık ifadesi\nKur\'an\'da: 101:8, yaygın',
  "فَأَمَّا": '"fa-ammā" (فَأَمَّا)\nKök: — fa + ammā\nKalıp: fa (öyleyse) + ammā; sonuç bildiren konu başlatma\nKur\'an\'da: 101:6, yaygın',

  // ── Olumsuzluk (Negation) ───────────────────────────────────────────
  "لَا": '"lā" (لَا)\nKök: — yapısal olumsuzluk edatı\nKalıp: Muzari olumsuzluk, emir yasağı (nahiy), varlık olumsuzlaması\nKur\'an\'da: binden fazla kez — en temel olumsuzluk',
  "لَّا": '"lā" (لَّا)\nKök: — yapısal olumsuzluk\nKalıp: lā edatının şeddeli biçimi; önceki sessizle birleşir\nKur\'an\'da: yaygın variant',
  "لَآ": '"lā" (لَآ)\nKök: — yapısal olumsuzluk\nKalıp: lā edatının uzatmalı yazımı; med-i lazım\nKur\'an\'da: 2:6, 109:2 — لَآ أَعْبُدُ',
  "لَمْ": '"lam" (لَمْ)\nKök: — yapısal partikül\nKalıp: Muzari fiilin geçmiş olumsuzunu yapar; cezm eder\nKur\'an\'da: 112:3 — لَمْ يَلِدْ وَلَمْ يُولَدْ',
  "وَلَمْ": '"walam" (وَلَمْ)\nKök: — bağlaç + olumsuzluk\nKalıp: wa + lam; "ve ... -medi/-madı"\nKur\'an\'da: 112:3, yaygın',
  "لَن": '"lan" (لَن)\nKök: — yapısal partikül\nKalıp: Gelecek olumsuzluk; muzariyi nasb eder; "asla -meyecek"\nKur\'an\'da: 2:80, yaygın',
  "وَلَآ": '"walā" (وَلَآ)\nKök: — bağlaç + olumsuzluk\nKalıp: wa + lā; "ve ... -mez, ve ... -ma"\nKur\'an\'da: 107:3, yaygın',
  "وَلَا": '"walā" (وَلَا)\nKök: — bağlaç + olumsuzluk\nKalıp: wa + lā; birleşik yazım\nKur\'an\'da: Bakara\'da 82 kez — en sık kombinasyon',
  "مَا": '"mā" (مَا)\nKök: — yapısal partikül\nKalıp: İsim (ne?/hangi?), olumsuzluk, mevsul zamiri\nKur\'an\'da: 61 kez Bakara\'da tek başına; toplam binlerce',
  "مَآ": '"mā" (مَآ)\nKök: — yapısal partikül\nKalıp: mā edatının med-i lazım ile uzatmalı yazımı\nKur\'an\'da: 111:2, yaygın',
  "إِلَّا": '"illā" (إِلَّا)\nKök: — yapısal istisna edatı\nKalıp: İstisna (hariç); "... dışında, ancak, yalnızca"\nKur\'an\'da: 2:9, çok yaygın — tevhid cümleleri dahil',

  // ── Onay/Teyit (Assertive Particles) ───────────────────────────────
  "إِنَّ": '"inna" (إِنَّ)\nKök: — yapısal teyit edatı\nKalıp: İsim cümlesini nasb eder; "gerçekten, şüphesiz ki"\nKur\'an\'da: 742 kez — teolojik teyit için temel araç',
  "إِنَّهُۥ": '"innahu" (إِنَّهُۥ)\nKök: — teyit edatı + zamir\nKalıp: inna + hu; "şüphesiz O/o ki"\nKur\'an\'da: 110:3, çok yaygın',
  "إِنَّهَا": '"innahā" (إِنَّهَا)\nKök: — teyit edatı + dişi zamir\nKalıp: inna + hā; "şüphesiz o (dişil)"\nKur\'an\'da: 104:8, yaygın',
  "إِنَّآ": '"innā" (إِنَّآ)\nKök: — teyit edatı + 1. çoğul zamir\nKalıp: inna + nā; "şüphesiz Biz/biz"\nKur\'an\'da: 108:1, yaygın — ilahi bildiriler',
  "أَنَّ": '"anna" (أَنَّ)\nKök: — yapısal teyit edatı\nKalıp: Fiil cümlesi tamamlayıcısı; nasb eder; "ki, olduğunu"\nKur\'an\'da: 2:26, yaygın',
  "قَدْ": '"qad" (قَدْ)\nKök: — yapısal partikül\nKalıp: Mazi fiilin gerçekleştiğini teyit eder; "gerçekten, kesinlikle"\nKur\'an\'da: 2:60, yaygın',

  // ── Şart (Conditionals) ────────────────────────────────────────────
  "إِن": '"in" (إِن)\nKök: — yapısal şart edatı\nKalıp: Şart/koşul bağlacı; cezm eder; "eğer"\nKur\'an\'da: 2:23, yaygın',
  "لَوْ": '"law" (لَوْ)\nKök: — yapısal şart edatı\nKalıp: Gerçekleşmemiş şart (imkânsız/geçmiş); "keşke, eğer olsaydı"\nKur\'an\'da: 102:5, yaygın',
  "إِذَا": '"idhā" (إِذَا)\nKök: — yapısal şart/zaman edatı\nKalıp: Zamansal bağlaç; "ne zaman ki, -dığında"\nKur\'an\'da: 110:1, yaygın',
  "إِذْ": '"idh" (إِذْ)\nKök: — yapısal zaman edatı\nKalıp: Geçmiş zamanlı atıf; "bir zamanlar, o vakit ki"\nKur\'an\'da: 2:30, yaygın',

  // ── Gösterme Zamirleri (Demonstratives) ────────────────────────────
  "هَـٰذَا": '"hādhā" (هَـٰذَا)\nKök: — yapısal gösterme zamiri\nKalıp: Yakın gösteri, eril tekil; "bu"\nKur\'an\'da: 106:3, yaygın',
  "هَـٰذِهِ": '"hādhihi" (هَـٰذِهِ)\nKök: — yapısal gösterme zamiri\nKalıp: Yakın gösteri, dişil tekil; "bu"\nKur\'an\'da: yaygın',
  "ذَٰلِكَ": '"dhālika" (ذَٰلِكَ)\nKök: — yapısal gösterme zamiri\nKalıp: Uzak gösteri, eril tekil; "şu, o"\nKur\'an\'da: 2:2 (dhālika l-kitābu), çok yaygın',
  "فَذَٰلِكَ": '"fadhālika" (فَذَٰلِكَ)\nKök: — fa + dhālika\nKalıp: Sonuç bildirici + gösterme zamiri\nKur\'an\'da: 107:2 — فَذَٰلِكَ ٱلَّذِى يَدُعُّ ٱلْيَتِيمَ',
  "أُو۟لَـٰٓئِكَ": '"ulāika" (أُو۟لَـٰٓئِكَ)\nKök: — yapısal gösterme zamiri\nKalıp: Uzak gösteri, çoğul; "onlar, işte onlar"\nKur\'an\'da: 2:5, yaygın',

  // ── Kişi Zamirleri (Personal Pronouns) ────────────────────────────
  "هُوَ": '"huwa" (هُوَ)\nKök: — kişi zamiri\nKalıp: 3. tekil eril; "o (erkek/şey)"\nKur\'an\'da: 112:1, çok yaygın',
  "هِىَ": '"hiya" (هِىَ)\nKök: — kişi zamiri\nKalıp: 3. tekil dişil; "o (dişi/şey)"\nKur\'an\'da: yaygın',
  "هُمْ": '"hum" (هُمْ)\nKök: — kişi zamiri\nKalıp: 3. çoğul eril; "onlar"\nKur\'an\'da: 107:5, çok yaygın',
  "فَهُوَ": '"fahuwa" (فَهُوَ)\nKök: — fa + huwa\nKalıp: Sonuç bağlacı + zamir; "o halde o"\nKur\'an\'da: 101:7, yaygın',
  "أَنتُمْ": '"antum" (أَنتُمْ)\nKök: — kişi zamiri\nKalıp: 2. çoğul eril; "siz"\nKur\'an\'da: 109:3, yaygın',
  "أَنتَ": '"anta" (أَنتَ)\nKök: — kişi zamiri\nKalıp: 2. tekil eril; "sen"\nKur\'an\'da: 109:4, yaygın',
  "أَنَا۠": '"anā" (أَنَا۠)\nKök: — kişi zamiri\nKalıp: 1. tekil; "ben"\nKur\'an\'da: 109:4, yaygın',
  "لَكُمْ": '"lakum" (لَكُمْ)\nKök: — lam edatı + 2. çoğul zamir\nKalıp: li + kum; "size ait, sizin için"\nKur\'an\'da: 109:6, yaygın',
  "وَلِيَ": '"waliya" (وَلِيَ)\nKök: — wa + li + 1. tekil zamir\nKalıp: wa + li + ya; "ve benim için/bana ait"\nKur\'an\'da: 109:6',
  "لَّهُۥ": '"lahu" (لَّهُۥ)\nKök: — lam edatı + 3. tekil zamir\nKalıp: li + hu; "ona ait, onun için"\nKur\'an\'da: 112:4, çok yaygın',

  // ── Soru Zamirleri (Interrogatives) ────────────────────────────────
  "مَن": '"man" (مَن)\nKök: — yapısal soru/mevsul zamiri\nKalıp: Şahıs sorusu "kim?"; mevsul olarak "kim ki"\nKur\'an\'da: 101:6, 101:8, yaygın',
  "مَنْ": '"man" (مَنْ)\nKök: — yapısal soru/mevsul zamiri\nKalıp: man edatının sükun ile yazımı\nKur\'an\'da: yaygın variant',
  "كَيْفَ": '"kayfa" (كَيْفَ)\nKök: — yapısal soru\nKalıp: Hal sorusu; "nasıl?"\nKur\'an\'da: 105:1, 2:28',
  "أَلَمْ": '"alam" (أَلَمْ)\nKök: — soru + olumsuzluk\nKalıp: hamza-l-istifhām (soru hemzesi) + lam; "Görmedi mi? Olmadı mı?"\nKur\'an\'da: 105:1, yaygın',

  // ── İlgi Zamirleri (Relative Pronouns) ─────────────────────────────
  "ٱلَّذِى": '"alladhī" (ٱلَّذِى)\nKök: — yapısal mevsul zamir\nKalıp: Eril tekil mevsul sıfat; "o ki, şu ki"\nKur\'an\'da: 107:1, 104:2, yaygın',
  "ٱلَّذِىٓ": '"alladhī" (ٱلَّذِىٓ)\nKök: — yapısal mevsul zamir\nKalıp: Med-i lazım ile yazım; aynı biçim\nKur\'an\'da: 106:4, yaygın',
  "ٱلَّتِى": '"allatī" (ٱلَّتِى)\nKök: — yapısal mevsul zamir\nKalıp: Dişil tekil mevsul sıfat; "o ki (dişil)"\nKur\'an\'da: 104:7, yaygın',
  "ٱلَّذِينَ": '"alladhīna" (ٱلَّذِينَ)\nKök: — yapısal mevsul zamir\nKalıp: Çoğul eril mevsul sıfat; "onlar ki, kimseler"\nKur\'an\'da: 103:3, 107:5, çok yaygın',

  // ── Zaman Zarfları (Temporal) ──────────────────────────────────────
  "يَوْمَ": '"yawma" (يَوْمَ)\nKök: Y-W-M — gün\nKalıp: Akuzatif zarf; "gün, günde"\nKur\'an\'da: 101:4, yaygın — يَوْمَ يَكُونُ gibi',
  "يَوْمَئِذٍ": '"yawma-idhin" (يَوْمَئِذٍ)\nKök: Y-W-M + idh (zaman)\nKalıp: Bileşik zaman zarfı; "o gün"\nKur\'an\'da: 100:11, 102:8',
  "يَوْمَئِذٍۢ": '"yawma-idhin" (يَوْمَئِذٍۢ)\nKök: Y-W-M + idh\nKalıp: yawma-idhin\'in tenvinsiz yazımı\nKur\'an\'da: 100:11',
  "سَوْفَ": '"sawfa" (سَوْفَ)\nKök: — yapısal gelecek edatı\nKalıp: Muzari fiilin geleceğini teyit eder; "yakında, ileride"\nKur\'an\'da: 102:3',

  // ── Pekiştirme (Emphatic) ──────────────────────────────────────────
  "كَلَّا": '"kallā" (كَلَّا)\nKök: — yapısal red/pekiştirme edatı\nKalıp: Güçlü inkâr ve uyarı; "kesinlikle hayır, asla!"\nKur\'an\'da: 102:3, 104:4 — güçlü reddiyelerde',
  "كَلَّا ۖ": '"kallā" (كَلَّا ۖ)\nKök: — yapısal red edatı\nKalıp: Vakf (durak) işaretli biçim\nKur\'an\'da: 104:4',
  "وَيْلٌۭ": '"waylun" (وَيْلٌۭ)\nKök: W-Y-L — helak, eziyet\nKalıp: İsim, refa tenvinli; beddua/uyarı; "Vay haline!"\nKur\'an\'da: 107:4, 104:1',
  "فَوَيْلٌۭ": '"fawaylun" (فَوَيْلٌۭ)\nKök: W-Y-L — helak\nKalıp: fa (öyleyse) + vayl; "o hâlde vay haline"\nKur\'an\'da: 107:4',

  // ── Sıklıkta Geçen Diğer Partiküller ──────────────────────────────
  "وَإِنَّ": '"wa-inna" (وَإِنَّ)\nKök: — bağlaç + teyit\nKalıp: wa + inna; "ve gerçekten ki"\nKur\'an\'da: yaygın',
  "وَإِنَّهُۥ": '"wa-innahu" (وَإِنَّهُۥ)\nKök: — bağlaç + teyit + zamir\nKalıp: wa + inna + hu; "ve şüphesiz o"\nKur\'an\'da: 100:7',
  "لَفِى": '"lafī" (لَفِى)\nKök: — lam-i te\'kid + fī\nKalıp: Pekiştirme lamlı iç edat; "gerçekten içindedir"\nKur\'an\'da: 103:2',
};
