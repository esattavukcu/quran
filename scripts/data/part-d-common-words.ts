// Kur'an genelinde sık geçen içerik kelimeleri:
// Allah'ın isimleri, inanç terimleri, peygamberler, temel fiiller, önemli kavramlar

export const PART_D: Record<string, string> = {

  // === ALLAH'IN İSİMLERİ VE SIFATLARI ===
  "ٱللَّهُ": '"Allāh" (ٱللَّهُ)\nKök: İ-L-H — ilah, tapılan\nKalıp: Özel isim; yalnızca Allah için\nKur\'an\'da: 2:255 (Ayetü\'l-kürsî) — Kur\'an\'ın en sık kelimesi, 2698 kez',

  "ٱللَّهِ": '"Allāhi" (ٱللَّهِ)\nKök: İ-L-H — ilah, tapılan\nKalıp: Özel isim cer hâli; "Allah\'ın"\nKur\'an\'da: 1:1 ve binlerce ayette — Tamlama ve bağlantı hâlinde',

  "ٱللَّهَ": '"Allāha" (ٱللَّهَ)\nKök: İ-L-H — ilah, tapılan\nKalıp: Özel isim mefʿul hâli; "Allah\'ı"\nKur\'an\'da: "Allaha itaat edin" gibi emirlerde',

  "ٱلرَّحْمَٰنُ": '"er-Raḥmān" (ٱلرَّحْمَٰنُ)\nKök: r-ḥ-m — rahmet, şefkat\nKalıp: Mübalağa sıfatı; "son derece merhametli"\nKur\'an\'da: 1:1, 55:1 — Yalnızca Allah için; 57 sure besmeleyle başlar',

  "ٱلرَّحِيمُ": '"er-Raḥīm" (ٱلرَّحِيمُ)\nKök: r-ḥ-m — rahmet, şefkat\nKalıp: Fâil sıfat; "sürekli merhametli"\nKur\'an\'da: 1:3 — Rahmān genel, Rahīm müminine özel merhamet',

  "ٱلرَّبُّ": '"er-Rabb" (ٱلرَّبُّ)\nKök: r-b-b — terbiye etmek, yetiştirmek\nKalıp: İsim; "rab, yetiştiren, besleyen"\nKur\'an\'da: 1:2 — "Âlemlerin Rabbi"; en temel ilahi sıfat',

  "رَبِّ": '"rabbi" (رَبِّ)\nKök: r-b-b — terbiye etmek\nKalıp: İsim cer; "Rabbim, Rabbinin"\nKur\'an\'da: çok ayette — Dua ve hitapta kullanılır',

  "ٱلْعَزِيزُ": '"el-ʿAzīz" (ٱلْعَزِيزُ)\nKök: ʿ-z-z — güçlü, nadir\nKalıp: Mübalağa; "mutlak güçlü, yenilmez"\nKur\'an\'da: çok ayette — Allah\'ın en sık geçen isimlerinden',

  "ٱلْحَكِيمُ": '"el-Ḥakīm" (ٱلْحَكِيمُ)\nKök: ḥ-k-m — hikmet, hüküm\nKalıp: Mübalağa; "en büyük hikmet sahibi"\nKur\'an\'da: çok ayette — Genellikle Aziz ile birlikte geçer',

  "ٱلْعَلِيمُ": '"el-ʿAlīm" (ٱلْعَلِيمُ)\nKök: ʿ-l-m — bilmek\nKalıp: Mübalağa; "her şeyi bilen"\nKur\'an\'da: 157 kez — "Allah her şeyi bilendir"',

  "ٱلسَّمِيعُ": '"es-Samīʿ" (ٱلسَّمِيعُ)\nKök: s-m-ʿ — işitmek\nKalıp: Mübalağa; "her şeyi işiten"\nKur\'an\'da: çok ayette — Genellikle Alīm ile birlikte',

  "ٱلْبَصِيرُ": '"el-Baṣīr" (ٱلْبَصِيرُ)\nKök: b-ṣ-r — görmek\nKalıp: Mübalağa; "her şeyi gören"\nKur\'an\'da: çok ayette — Semīʿ ile birlikte "işiten ve gören Allah"',

  "ٱلْقَدِيرُ": '"el-Qadīr" (ٱلْقَدِيرُ)\nKök: q-d-r — güç, ölçü\nKalıp: Mübalağa; "her şeye gücü yeten"\nKur\'an\'da: 45 kez — "Allah her şeye gücü yetendir"',

  "ٱلْغَفُورُ": '"el-Ğafūr" (ٱلْغَفُورُ)\nKök: ğ-f-r — örtmek, bağışlamak\nKalıp: Mübalağa; "çok bağışlayan"\nKur\'an\'da: 91 kez — Kur\'an\'ın en sık geçen Allah isimlerinden',

  "ٱلتَّوَّابُ": '"et-Tawwāb" (ٱلتَّوَّابُ)\nKök: t-w-b — dönmek, tövbe\nKalıp: Mübalağa; "tövbeleri çok kabul eden"\nKur\'an\'da: 11 kez — Allah\'ın rahmetinin kapısı daima açık',

  "ٱلْوَاحِدُ": '"el-Wāḥid" (ٱلْوَاحِدُ)\nKök: w-ḥ-d — bir, tek\nKalıp: İsm-i fâil; "bir ve tek"\nKur\'an\'da: 2:163 — "Allahınız tek bir Allah\'tır"',

  "ٱلصَّمَدُ": '"eṣ-Ṣamad" (ٱلصَّمَدُ)\nKök: ṣ-m-d — sağlam, hiçbir şeye muhtaç olmayan\nKalıp: İsim; "her şeyin sığındığı, Kendisi ihtiyaçsız"\nKur\'an\'da: 112:2 — Yalnızca Allah için kullanılan isim',

  "ٱلْقَيُّومُ": '"el-Qayyūm" (ٱلْقَيُّومُ)\nKök: q-w-m — ayakta durmak\nKalıp: Mübalağa; "kendi kendine var, her şeyi ayakta tutan"\nKur\'an\'da: 2:255 (Ayetü\'l-kürsî), 3:2 — Allah\'ın en yüce sıfatı',

  "ٱلْحَيُّ": '"el-Ḥayy" (ٱلْحَيُّ)\nKök: ḥ-y-y — diri olmak\nKalıp: İsm-i fâil; "diri, ölümsüz"\nKur\'an\'da: 2:255 — "Hayy, Qayyum": Dipdiri ve kendi kendine var olan',

  // === TEMEL İNANÇ TERİMLERİ ===
  "ٱلْإِسْلَامُ": '"el-islām" (ٱلْإِسْلَامُ)\nKök: s-l-m — esenlik, teslim\nKalıp: Mastar if\'al; "teslim olma, esenliğe kavuşma"\nKur\'an\'da: 3:19 — "Allah katında din İslam\'dır"',

  "ٱلْإِيمَانُ": '"el-imān" (ٱلْإِيمَانُ)\nKök: e-m-n — güven, emin\nKalıp: Mastar if\'al; "iman, kalp ile inanma"\nKur\'an\'da: 49:14 — İslam güvence, iman ise kalbi tasdik',

  "ٱلتَّقْوَىٰ": '"et-taqwā" (ٱلتَّقْوَىٰ)\nKök: w-q-y — korumak, sakınmak\nKalıp: Mastar; "Allah\'tan sakınma, erdem"\nKur\'an\'da: 2:177 — İslam\'ın özü; "En üstün elbise takvadır" (7:26)',

  "ٱلصَّلَاةُ": '"eṣ-ṣalāt" (ٱلصَّلَاةُ)\nKök: ṣ-l-w — bağlantı, dua\nKalıp: İsim; "namaz, dua"\nKur\'an\'da: 100\'den fazla ayette — İslam\'ın ikinci rüknü',

  "ٱلزَّكَاةُ": '"ez-zakāt" (ٱلزَّكَاةُ)\nKök: z-k-w — arınmak, büyümek\nKalıp: İsim; "zekat, arındırıcı bağış"\nKur\'an\'da: 32 ayette — Namazla daima birlikte anılır',

  "ٱلصِّيَامُ": '"eṣ-ṣiyām" (ٱلصِّيَامُ)\nKök: ṣ-w-m — imsak, oruç\nKalıp: Mastar; "oruç"\nKur\'an\'da: 2:183-187 — "Oruç size farz kılındı"',

  "ٱلْحَجُّ": '"el-ḥajj" (ٱلْحَجُّ)\nKök: ḥ-j-j — niyet, ziyaret\nKalıp: Mastar; "hac ibadeti"\nKur\'an\'da: 2:196-197 — İslam\'ın beşinci rüknü',

  "ٱلْجَنَّةُ": '"el-janna" (ٱلْجَنَّةُ)\nKök: j-n-n — gizlemek, ağaçlık\nKalıp: İsm-i fâil; "cennet, gizli bahçe"\nKur\'an\'da: 147 kez — İman edenlerin mükafatı',

  "جَنَّةٍ": '"jannatin" (جَنَّةٍ)\nKök: j-n-n — gizlemek\nKalıp: Tenvîn; "bir cennet"\nKur\'an\'da: çok ayette — Nekre hâlinde kullanımı',

  "ٱلنَّارُ": '"en-nār" (ٱلنَّارُ)\nKök: n-w-r — ateş, nur\nKalıp: İsim; "ateş, cehennem"\nKur\'an\'da: 145 kez — Kâfirlerin azabı; aydınlatıcı ve yakıcı',

  "جَهَنَّمُ": '"jahannamu" (جَهَنَّمُ)\nKök: İbranice "ge-hinnom" — cehennem vadisi\nKalıp: Özel isim; "cehennem"\nKur\'an\'da: 77 kez — Kâfirlerin yurdu',

  "ٱلْآخِرَةُ": '"el-āhira" (ٱلْآخِرَةُ)\nKök: e-h-r — son, arka\nKalıp: Sıfat isim; "son, öteki âlem, ahiret"\nKur\'an\'da: 115 kez — Dünya hayatının karşıtı; gerçek hayat',

  "ٱلدُّنْيَا": '"ed-dunyā" (ٱلدُّنْيَا)\nKök: d-n-w — yakın olmak\nKalıp: Sıfat; "en yakın, bu dünya"\nKur\'an\'da: 115 kez — Geçici dünya; ahiretin karşıtı',

  "ٱلْقِيَامَةُ": '"el-qiyāma" (ٱلْقِيَامَةُ)\nKök: q-w-m — kalkmak, ayağa kalkmak\nKalıp: Mastar; "yeniden kalkış, kıyamet"\nKur\'an\'da: 70 kez — "Yevmü\'l-qiyāma": Herkesin kalktığı gün',

  "ٱلسَّاعَةُ": '"es-sāʿa" (ٱلسَّاعَةُ)\nKök: s-w-ʿ — süre, saat\nKalıp: İsim; "an, kıyamet vakti"\nKur\'an\'da: 48 kez — Kıyamet saatinin bir adı',

  "ٱلْبَعْثُ": '"el-baʿṯ" (ٱلْبَعْثُ)\nKök: b-ʿ-ṯ — göndermek, diriltmek\nKalıp: Mastar; "yeniden diriltme, öldükten sonra dirilme"\nKur\'an\'da: çok ayette — Ahiretin temel ilkesi',

  "ٱلْحِسَابُ": '"el-ḥisāb" (ٱلْحِسَابُ)\nKök: ḥ-s-b — saymak, hesaplamak\nKalıp: Mastar; "hesap, hesaplaşma"\nKur\'an\'da: çok ayette — Kıyamet günü hesap görülür',

  "ٱلْمِيزَانُ": '"el-mīzān" (ٱلْمِيزَانُ)\nKök: w-z-n — tartmak\nKalıp: İsm-i âlet; "terazi, ölçek"\nKur\'an\'da: çok ayette — Adil kıyamet terazisi',

  "ٱلصِّرَاطَ": '"eṣ-ṣirāṭ" (ٱلصِّرَاطَ)\nKök: s-r-ṭ — yol, geçit\nKalıp: İsim; "yol, doğru yol"\nKur\'an\'da: 1:6 — "Bizi doğru yola ilet"',

  "ٱلْمُسْتَقِيمَ": '"el-mustaqīm" (ٱلْمُسْتَقِيمَ)\nKök: q-w-m — doğru durmak\nKalıp: İsm-i fâil; "doğru, düz, dürüst"\nKur\'an\'da: 1:6, 6:153 — Fatiha\'nın en önemli duası',

  "ٱلشَّيْطَانُ": '"eş-šayṭān" (ٱلشَّيْطَانُ)\nKök: ş-ṭ-n — uzaklaşmak (ya da İbranice satan)\nKalıp: İsim; "şeytan, isyancı"\nKur\'an\'da: 87 kez — Allah\'ın emrine karşı gelen kovulmuş varlık',

  "إِبْلِيسَ": '"iblīs" (إِبْلِيسَ)\nKök: b-l-s — umutsuz, şaşkın\nKalıp: Özel isim; "İblis"\nKur\'an\'da: 2:34 — Secde etmeyi reddeden ve kovulan cin/melek',

  "ٱلْوَحْيُ": '"el-waḥy" (ٱلْوَحْيُ)\nKök: w-ḥ-y — gizli iletişim\nKalıp: Mastar; "vahiy, ilahi mesaj"\nKur\'an\'da: 53:4 — "O, hevadan konuşmuyor; o sadece vahiydir"',

  "ٱلنُّبُوَّةُ": '"en-nubuwwa" (ٱلنُّبُوَّةُ)\nKök: n-b-ʾ — haber\nKalıp: Mastar; "peygamberlik"\nKur\'an\'da: 3:79 — İlahi mesajı taşıma görevi',

  "ٱلرِّسَالَةُ": '"er-risāla" (ٱلرِّسَالَةُ)\nKök: r-s-l — göndermek\nKalıp: Mastar; "mesaj, risalet, elçilik"\nKur\'an\'da: 7:62 — Peygamberin ilettiği mesaj',

  "ٱلْكِتَابُ": '"el-kitāb" (ٱلْكِتَابُ)\nKök: k-t-b — yazmak\nKalıp: İsim; "kitap, yazılı belge"\nKur\'an\'da: 255 kez — İlahi kitap, Kur\'an ve önceki kitaplar',

  "ٱلْقُرْآنُ": '"el-qurʾān" (ٱلْقُرْآنُ)\nKök: q-r-ʾ — okumak, toplamak\nKalıp: Mastar; "okunan, toplanan"\nKur\'an\'da: 70 kez — Allah\'ın son kitabı; okunmak için gelen',

  "ٱلتَّوْرَاةُ": '"et-tawrāt" (ٱلتَّوْرَاةُ)\nKök: İbranice tōrāh — öğreti, yasa\nKalıp: Özel isim; "Tevrat"\nKur\'an\'da: 18 kez — Musa\'ya indirilen kitap',

  "ٱلْإِنجِيلُ": '"el-injīl" (ٱلْإِنجِيلُ)\nKök: Rumca euangelion — müjde\nKalıp: Özel isim; "İncil"\nKur\'an\'da: 12 kez — İsa\'ya indirilen kitap',

  // === PEYGAMBERLER ===
  "مُحَمَّدٌ": '"Muḥammad" (مُحَمَّدٌ)\nKök: ḥ-m-d — övmek\nKalıp: İsm-i mefʿul tef\'il; "çokça övülen"\nKur\'an\'da: 3:144, 33:40, 47:2, 48:29 — Kur\'an\'ın yalnızca 4 kez adını anar',

  "إِبْرَاهِيمَ": '"Ibrāhīm" (إِبْرَاهِيمَ)\nKök: Akkadça — "ulusların babası"\nKalıp: Özel isim; "İbrahim"\nKur\'an\'da: 69 kez — İslam\'ın atası; Hanîf',

  "مُوسَىٰ": '"Mūsā" (مُوسَىٰ)\nKök: Mısırca — "sudan çıkarılan"\nKalıp: Özel isim; "Musa"\nKur\'an\'da: 136 kez — Kur\'an\'ın en sık andığı peygamber',

  "عِيسَى": '"ʿĪsā" (عِيسَى)\nKök: Aramice Yeshua — Allah kurtarır\nKalıp: Özel isim; "İsa"\nKur\'an\'da: 25 kez — Allah\'ın kulu ve elçisi; mucizeli doğum',

  "نُوحٌ": '"Nūḥ" (نُوحٌ)\nKök: Aramice Nuaḥ — dinginlik\nKalıp: Özel isim; "Nuh"\nKur\'an\'da: 43 kez — Tufan ve gemi; insanlığın yeniden başlangıcı',

  "آدَمُ": '"Ādam" (آدَمُ)\nKök: İbranice adam — insan, toprak\nKalıp: Özel isim; "Adem"\nKur\'an\'da: 25 kez — İlk insan ve ilk peygamber',

  "يُوسُفُ": '"Yūsuf" (يُوسُفُ)\nKök: İbranice Yosef — Allah artırır\nKalıp: Özel isim; "Yusuf"\nKur\'an\'da: 27 kez — Kur\'an\'ın "en güzel kıssası"',

  "دَاوُودُ": '"Dāwūd" (دَاوُودُ)\nKök: İbranice Dawid — sevgili\nKalıp: Özel isim; "Davut"\nKur\'an\'da: 16 kez — Zebur verildi; demir giydirme mucizesi',

  "سُلَيْمَانُ": '"Sulaymān" (سُلَيْمَانُ)\nKök: İbranice Šelōmōh — esenlik\nKalıp: Özel isim; "Süleyman"\nKur\'an\'da: 17 kez — Rüzgar, cin ve hayvanlara hükmeden peygamber',

  "إِسْمَاعِيلُ": '"Ismāʿīl" (إِسْمَاعِيلُ)\nKök: İbranice — "Allah işitiyor"\nKalıp: Özel isim; "İsmail"\nKur\'an\'da: 12 kez — İbrahim\'in kurban edilecek oğlu; Kâbe\'yi inşa etti',

  "يَحْيَىٰ": '"Yaḥyā" (يَحْيَىٰ)\nKök: ḥ-y-y — diri olmak\nKalıp: Özel isim; "Yahya"\nKur\'an\'da: 5 kez — İsa\'nın müjdelediği, Zekeriya\'nın oğlu',

  "زَكَرِيَّا": '"Zakariyyā" (زَكَرِيَّا)\nKök: İbranice — "Allah hatırlar"\nKalıp: Özel isim; "Zekeriya"\nKur\'an\'da: 7 kez — Yaşlılıkta Yahya\'ya kavuşan peygamber',

  // === TEMEL KAVRAMLAR ===
  "ٱلنَّاسُ": '"en-nās" (ٱلنَّاسُ)\nKök: e-n-s — ülfet, insan\nKalıp: İsim; "insanlar"\nKur\'an\'da: 241 kez — "Ey insanlar" hitabında çok geçer',

  "ٱلْإِنسَانُ": '"el-insān" (ٱلْإِنسَانُ)\nKök: e-n-s — ülfet, unutmak\nKalıp: İsim; "insan (birey)"\nKur\'an\'da: 65 kez — İnsan türünün sıfatları; acelecilik, nankörlük',

  "ٱلْأَرْضُ": '"el-arḍ" (ٱلْأَرْضُ)\nKök: e-r-ḍ — yer, zemin\nKalıp: İsim; "yer, Dünya"\nKur\'an\'da: 461 kez — Sema ile birlikte çok sık geçer',

  "ٱلسَّمَاءُ": '"es-samāʾ" (ٱلسَّمَاءُ)\nKök: s-m-w — yükselmek\nKalıp: İsim; "gök, sema"\nKur\'an\'da: 310 kez — "Göklerin ve yerin yaratıcısı"',

  "ٱلسَّمَاوَاتُ": '"es-samāwāt" (ٱلسَّمَاوَاتُ)\nKök: s-m-w — yükselmek\nKalıp: Çoğul; "gökyüzleri, yedi kat gök"\nKur\'an\'da: çok ayette — "Göklerde ve yerde ne varsa"',

  "ٱلنَّفْسُ": '"en-nafs" (ٱلنَّفْسُ)\nKök: n-f-s — nefes, can\nKalıp: İsim; "nefs, ruh, kişi"\nKur\'an\'da: 295 kez — Hem olumlu hem olumsuz anlamda',

  "ٱلْقَلْبُ": '"el-qalb" (ٱلْقَلْبُ)\nKök: q-l-b — dönmek, değişmek\nKalıp: İsim; "kalp, yürek"\nKur\'an\'da: 132 kez — Aklın ve imanın merkezi',

  "ٱلْعَقْلُ": '"el-ʿaql" (ٱلْعَقْلُ)\nKök: ʿ-q-l — bağlamak, akıl\nKalıp: Mastar; "akıl, anlayış"\nKur\'an\'da: Fiil hâlinde çok kez — "Aklınızı kullanmıyor musunuz?"',

  "ٱلْمَالُ": '"el-māl" (ٱلْمَالُ)\nKök: m-y-l — eğilmek, mal\nKalıp: İsim; "mal, mülk"\nKur\'an\'da: 86 kez — Sınav aracı; zenginliğin tehlikesi',

  "ٱلْوَلَدُ": '"el-walad" (ٱلْوَلَدُ)\nKök: w-l-d — doğmak\nKalıp: İsim; "çocuk, evlat"\nKur\'an\'da: çok ayette — "Allah çocuk edinmedi" vurgusu',

  "ٱلْأُمَّةُ": '"el-umma" (ٱلْأُمَّةُ)\nKök: e-m-m — anne, önder\nKalıp: İsim; "ümmet, topluluk, millet"\nKur\'an\'da: 64 kez — "İslam ümmeti" ya da "geçmiş toplumlar"',

  "ٱلْعَالَمِينَ": '"el-ʿālamīn" (ٱلْعَالَمِينَ)\nKök: ʿ-l-m — bilmek, belirti\nKalıp: Çoğul; "âlemler, bütün varlık"\nKur\'an\'da: 73 kez — "Rabbü\'l-âlemin": Tüm varlıkların Rabbi',

  "ٱلْحَمْدُ": '"el-ḥamd" (ٱلْحَمْدُ)\nKök: ḥ-m-d — övmek\nKalıp: Mastar; "övgü, şükür"\nKur\'an\'da: 1:2 — "El-hamdu lillah": Allah\'a hamd olsun; 38 kez Kur\'an\'da',

  "ٱلْحَقُّ": '"el-ḥaqq" (ٱلْحَقُّ)\nKök: ḥ-q-q — gerçek, hak\nKalıp: Mastar/sıfat; "hak, gerçek, doğru"\nKur\'an\'da: 287 kez — Hakikat; Allah\'ın isimlerinden biri',

  "ٱلْعَدْلُ": '"el-ʿadl" (ٱلْعَدْلُ)\nKök: ʿ-d-l — denge, adalet\nKalıp: Mastar; "adalet, denge"\nKur\'an\'da: çok ayette — "Adaletle hükmedin"',

  "ٱلرَّحْمَةُ": '"er-raḥma" (ٱلرَّحْمَةُ)\nKök: r-ḥ-m — rahim, merhamet\nKalıp: Mastar; "merhamet, rahmet"\nKur\'an\'da: 79 kez — Allah\'ın en önemli sıfatı',

  "ٱلنِّعْمَةُ": '"en-niʿma" (ٱلنِّعْمَةُ)\nKök: n-ʿ-m — nimet, yumuşaklık\nKalıp: İsim; "nimet, iyilik"\nKur\'an\'da: çok ayette — "Allah\'ın nimetini sayamazsınız"',

  "ٱلنُّورُ": '"en-nūr" (ٱلنُّورُ)\nKök: n-w-r — ışık\nKalıp: İsim; "nur, ışık"\nKur\'an\'da: 43 kez — Allah nurudur; Kur\'an ve iman nur',

  "ٱلظُّلُمَاتُ": '"eẓ-ẓulumāt" (ٱلظُّلُمَاتُ)\nKök: ẓ-l-m — karanlık, zulüm\nKalıp: Çoğul; "karanlıklar"\nKur\'an\'da: çok ayette — Nurla karşıtlık; küfür ve günah',

  "ٱلصَّبْرُ": '"eṣ-ṣabr" (ٱلصَّبْرُ)\nKök: ṣ-b-r — sarmalamak, tutmak\nKalıp: Mastar; "sabır, dayanç"\nKur\'an\'da: 90 kez — "Sabır ve namazla yardım isteyin" (2:45)',

  "ٱلشُّكْرُ": '"eş-šukr" (ٱلشُّكْرُ)\nKök: ş-k-r — teşekkür\nKalıp: Mastar; "şükür, minnettarlık"\nKur\'an\'da: çok ayette — "Şükrederseniz artırırım" (14:7)',

  "ٱلذِّكْرُ": '"eẕ-ẕikr" (ٱلذِّكْرُ)\nKök: ẕ-k-r — hatırlamak\nKalıp: Mastar; "anma, zikir, Kur\'an"\nKur\'an\'da: çok ayette — Kur\'an\'ın ismi; "Beni anın, Ben de sizi anayım" (2:152)',

  // === TEMEL FİİLLER ===
  "قَالَ": '"qāla" (قَالَ)\nKök: q-w-l — söylemek\nKalıp: Mâzi tekil; "dedi"\nKur\'an\'da: 1722 kez — Kur\'an\'ın en sık geçen fiili; kıssa dilinin temeli',

  "قَالُوا": '"qālū" (قَالُوا)\nKök: q-w-l — söylemek\nKalıp: Mâzi çoğul; "dediler"\nKur\'an\'da: çok ayette',

  "آمَنُوا": '"āmanū" (آمَنُوا)\nKök: e-m-n — güven, emin\nKalıp: Mâzi çoğul; "inandılar"\nKur\'an\'da: çok ayette — "Ey iman edenler!" hitabında',

  "كَفَرُوا": '"kafarū" (كَفَرُوا)\nKök: k-f-r — örtmek, inkâr\nKalıp: Mâzi çoğul; "inkâr ettiler"\nKur\'an\'da: çok ayette — İmanın karşıtı eylem',

  "عَمِلُوا": '"ʿamilū" (عَمِلُوا)\nKök: ʿ-m-l — iş yapmak\nKalıp: Mâzi çoğul; "yaptılar"\nKur\'an\'da: çok ayette — "İman edip salih amel işleyenler"',

  "جَاءَ": '"jāʾa" (جَاءَ)\nKök: j-y-ʾ — gelmek\nKalıp: Mâzi tekil; "geldi"\nKur\'an\'da: çok ayette — Peygamberlerin gelişi; vahyin inişi',

  "أَرَادَ": '"arāda" (أَرَادَ)\nKök: r-w-d — istemek\nKalıp: Mâzi if\'al; "istedi, diledi"\nKur\'an\'da: çok ayette — "Allah diler" formülünde',

  "يَشَآءُ": '"yašāʾu" (يَشَآءُ)\nKök: ş-y-ʾ — istemek, şey\nKalıp: Müzâri; "diler, ister"\nKur\'an\'da: 148 kez — "Allah dilediğini yapar"',

  "خَلَقَ": '"halaqa" (خَلَقَ)\nKök: h-l-q — yaratmak, ölçmek\nKalıp: Mâzi; "yarattı"\nKur\'an\'da: çok ayette — Allah\'ın yaratıcılığı',

  "يَعْلَمُ": '"yaʿlamu" (يَعْلَمُ)\nKök: ʿ-l-m — bilmek\nKalıp: Müzâri; "bilir"\nKur\'an\'da: çok ayette — "Allah bilendir"',

  "يَعْبُدُونَ": '"yaʿbudūn" (يَعْبُدُونَ)\nKök: ʿ-b-d — kulluk\nKalıp: Müzâri çoğul; "ibadet ederler"\nKur\'an\'da: çok ayette — İbadetin amacı',

  "يُؤْمِنُونَ": '"yuʾminūn" (يُؤْمِنُونَ)\nKök: e-m-n — güven\nKalıp: Müzâri çoğul; "iman ederler"\nKur\'an\'da: çok ayette',

  "يَتَّقُونَ": '"yattaqūn" (يَتَّقُونَ)\nKök: w-q-y — sakınmak\nKalıp: Müzâri çoğul; "sakınırlar"\nKur\'an\'da: çok ayette — Takvalıların vasfı',

  "يَكْفُرُونَ": '"yakfurūn" (يَكْفُرُونَ)\nKök: k-f-r — inkâr\nKalıp: Müzâri çoğul; "inkâr ederler"\nKur\'an\'da: çok ayette',

  "يَهْدِى": '"yahdī" (يَهْدِى)\nKök: h-d-y — yol göstermek\nKalıp: Müzâri; "hidayet eder"\nKur\'an\'da: çok ayette — "Allah dilediğini doğru yola iletir"',

  "يُضِلُّ": '"yuḍillu" (يُضِلُّ)\nKök: ḍ-l-l — sapmak\nKalıp: Müzâri if\'al; "saptırır"\nKur\'an\'da: çok ayette — "Allah dilediğini saptırır"',

  "يُعَذِّبُ": '"yuʿaẕẕib" (يُعَذِّبُ)\nKök: ʿ-ẕ-b — azap\nKalıp: Müzâri tef\'il; "azap verir"\nKur\'an\'da: çok ayette',

  "يَغْفِرُ": '"yağfiru" (يَغْفِرُ)\nKök: ğ-f-r — örtmek, bağışlamak\nKalıp: Müzâri; "bağışlar"\nKur\'an\'da: çok ayette — "Allah dilediğini bağışlar"',

  "تُوبُوا": '"tūbū" (تُوبُوا)\nKök: t-w-b — dönmek\nKalıp: Emir çoğul; "tövbe edin"\nKur\'an\'da: çok ayette — Tövbenin önemi',

  "ٱسْتَغْفِرُوا": '"istaġfirū" (ٱسْتَغْفِرُوا)\nKök: ğ-f-r — bağışlanma istemek\nKalıp: Emir istiğfal; "istiğfar edin"\nKur\'an\'da: çok ayette — Bağışlanma duası',

  "ٱتَّقُوا": '"ittaqū" (ٱتَّقُوا)\nKök: w-q-y — sakınmak\nKalıp: Emir çoğul; "sakının"\nKur\'an\'da: çok ayette — "Allah\'tan sakının"',

  "أَطِيعُوا": '"aṭīʿū" (أَطِيعُوا)\nKök: ṭ-w-ʿ — itaat etmek\nKalıp: Emir çoğul; "itaat edin"\nKur\'an\'da: çok ayette — "Allah\'a ve Resulüne itaat edin"',

  "مُتَّقِينَ": '"muttaqīn" (مُتَّقِينَ)\nKök: w-q-y — sakınmak, korumak\nKalıp: İsm-i fāil çoğul; Form VIII (iftʿāl) — "takvalılar, sakınanlar"\nKur\'an\'da: çok ayette — "Bu kitap takvalılar için hidayettir" (2:2)',

  "يُقِيمُونَ": '"yuqīmūn" (يُقِيمُونَ)\nKök: q-w-m — kalkmak, dikmek\nKalıp: Müzâri çoğul; Form IV (ifʿāl) — "kılarlar, yerine getirirler"\nKur\'an\'da: çok ayette — "وَيُقِيمُونَ الصَّلَاةَ" (2:3) namaz kılarlar',

  "يُنفِقُونَ": '"yunfiqūn" (يُنفِقُونَ)\nKök: n-f-q — harcamak, infak\nKalıp: Müzâri çoğul; Form IV — "infak ederler, harcarlar"\nKur\'an\'da: çok ayette — "وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ" (2:3) rızıklarından harcarlar',

};
