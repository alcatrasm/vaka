export type OptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export type QuestionCategory =
  | 'Görüşme Aşamaları & Süreç'
  | 'Görüşme Türleri & Teknikleri'
  | 'İletişim & Görüşme Becerileri'
  | 'Etik İlkeler & Profesyonel İlişki'
  | 'Kayıt Tutma & Raporlama'
  | 'Kuramlar & Yaklaşımlar';

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface ExamQuestion {
  id: number;
  pdfNumbers: string;
  isDuplicateInPdf: boolean;
  duplicateCount: number;
  duplicateNote?: string;
  category: QuestionCategory;
  prefaceList?: string[];
  question: string;
  options: QuestionOption[];
  correctKey: OptionKey;
  explanation: string;
  practicalTip: string;
}

export interface DuplicatePairInfo {
  mergedQuestionId: number;
  firstOccurrence: string;
  secondOccurrence: string;
  questionSummary: string;
  correctAnswerText: string;
}

export interface CrashCourseTopic {
  id: string;
  title: string;
  category: QuestionCategory;
  readingTime: string;
  keyTakeaways: {
    term: string;
    rule: string;
    examTrap: string;
  }[];
  mnemonic: string;
}

export const DUPLICATE_PAIRS_REPORT: DuplicatePairInfo[] = [
  {
    mergedQuestionId: 15,
    firstOccurrence: 'Soru 15 (Sayfa 4)',
    secondOccurrence: 'Soru 20 (Sayfa 5)',
    questionSummary:
      'Başvuranın sorunlarını anlamaya ve sorunlar hakkında başvuranla, çevresiyle görüşerek nesnel ve subjektif bilgi toplayan sosyal hizmet görüşmesi hangisidir?',
    correctAnswerText: 'B) Sosyal inceleme görüşmesi',
  },
  {
    mergedQuestionId: 17,
    firstOccurrence: 'Soru 17 (Sayfa 4)',
    secondOccurrence: 'Soru 18 (Sayfa 4)',
    questionSummary:
      'Psikolojik ilke ve prosedürleri uygulayarak başvuranların tutum ve davranışlarının değiştirilmesinin amaçlandığı sosyal hizmet görüşmesi hangisidir?',
    correctAnswerText: 'A) Tedavi görüşmesi',
  },
  {
    mergedQuestionId: 18,
    firstOccurrence: 'Soru 19 (Sayfa 4-5)',
    secondOccurrence: 'Soru 22 (Sayfa 5)',
    questionSummary:
      'Aşağıdakilerden hangisi görüşme tekniğinin zayıf yanlarından birisi değildir?',
    correctAnswerText: 'E) Görüşme tekniği sadece yüz yüze gerçekleşir.',
  },
  {
    mergedQuestionId: 28,
    firstOccurrence: 'Soru 31 (Sayfa 7)',
    secondOccurrence: 'Soru 55 (Sayfa 14)',
    questionSummary:
      'Aşağıdakilerden hangisi görüşmenin ilişki kurma aşamasında başvurulan değer ya da becerilerden biri değildir?',
    correctAnswerText: 'C) Yüzleştirme',
  },
  {
    mergedQuestionId: 35,
    firstOccurrence: 'Soru 39 (Sayfa 8-9)',
    secondOccurrence: 'Soru 52 (Sayfa 13)',
    questionSummary:
      'Aşağıdakilerden hangisi kontrol görüşmelerinin en temel amacıdır?',
    correctAnswerText: 'C) Gerçekleşen değişimin seyrinin izlenmesi',
  },
  {
    mergedQuestionId: 42,
    firstOccurrence: 'Soru 46 (Sayfa 10 - 1. Seri)',
    secondOccurrence: 'Soru 47 (Sayfa 12 - 2. Seri)',
    questionSummary:
      'Aşağıdakilerden hangisi doğru ve başarılı bir veri kaydı için dikkat edilmesi gereken hususlardan biri değildir?',
    correctAnswerText: 'E) Yazılı görüşmeler yapılması',
  },
  {
    mergedQuestionId: 44,
    firstOccurrence: 'Soru 48 (Sayfa 10-11 - 1. Seri)',
    secondOccurrence: 'Soru 45 (Sayfa 12 - 2. Seri)',
    questionSummary:
      'Aşağıdaki raporlardan hangisi başvuranı daha iyi tanımak amacıyla ailesi, kardeşleri, okul ve iş yerlerindeki kişilerle yapılan görüşmeler sonucu hazırlanır?',
    correctAnswerText: 'C) Sosyal inceleme raporu',
  },
  {
    mergedQuestionId: 47,
    firstOccurrence: 'Soru 41 (Sayfa 11 - 2. Seri)',
    secondOccurrence: 'Soru 46 (Sayfa 12 - 2. Seri)',
    questionSummary:
      'Görüşmecinin olayların sırasını veya aralarındaki bağlantıları hatırlayamamasına ne ad verilir?',
    correctAnswerText: 'C) Yerini değiştirme hatası',
  },
];

export const CRASH_COURSE_MODULES: CrashCourseTopic[] = [
  {
    id: 'gorusme-asamalari',
    title: '1. Görüşme Aşamaları ve Planlı Değişim Süreci',
    category: 'Görüşme Aşamaları & Süreç',
    readingTime: '3 dk',
    keyTakeaways: [
      {
        term: 'Temel vs. Tamamlayıcı Aşamalar',
        rule: 'Temel aşamalar: Başlama -> Değerlendirme -> Sorun Çözme -> Sonlandırma. Tamamlayıcı aşamalar: Hazırlık, Kayıt Tutma ve İzleme.',
        examTrap: '"Hangisi tamamlayıcı aşamadır?" sorusunda şıklarda HAZIRLIK aranır (Başlama, Değerlendirme, Sorun Çözme, Sonlandırma temel aşamalardır).',
      },
      {
        term: 'Hazırlık Aşaması (Düşünsel vs. Fiziksel)',
        rule: 'Müracaatçının "Benim sorunum var ve çözmek için bir şeyler yapmam gerekir" diyerek farkındalık kazandığı aşama Hazırlık aşamasıdır. Uzmanın görüşmenin gidişatını zihinsel olarak planlaması "düşünsel hazırlık", odayı havalandırması/aydınlatması "fiziksel hazırlık"tır.',
        examTrap: 'Tamamlayıcı aşamaları eklemenin gerekçeleri arasında sistem anlayışı, bütünsellik ve görüşmenin karşılaşmadan önce başlaması vardır; ancak "Yasal gerekçeler" yoktur!',
      },
      {
        term: 'Tanışma / İlişki Kurma Aşaması',
        rule: 'İlk görüşmede pozitif/sempatik-empatik ilişki kurulur, süreç hakkında bilgi verilir. Kabul etme, empati, öz belirleme ve gizlilik bu aşamanın temel değer/becerileridir.',
        examTrap: 'İlişki kurma aşamasında YÜZLEŞTİRME (Confrontation) asla yapılmaz! Yüzleştirme için önce güçlü bir güven ilişkisi kurulmuş olmalıdır.',
      },
      {
        term: 'Ön Değerlendirme & Planlama',
        rule: 'İlk oturumlarda bilgi toplamak için yapılan değerlendirme "Aşama olarak değerlendirme"dir. Ön değerlendirmede: 1) Gerçeklerin aslını öğrenme, 2) Anlamlarını düşünme, 3) Yardım yöntemlerine karar verme yer alır. Planlama basamağının EN SON alt basamağı "Sözleşme hazırlama"dır.',
        examTrap: 'Planlama aşamasında "Ön görüşmenin yapılması" yer almaz (o en başta, tanışma/bağlantı kurmada yapılır). Değerlendirme aşamasında "Değişim planını uygulamaya koyma" yer almaz (o sorun çözme/uygulama aşamasındadır).',
      },
      {
        term: 'Sorun Çözme, Sonlandırma ve İzleme',
        rule: 'Genel değerlendirmeden hemen sonraki aşama "Sorun çözme girişimi"dir. Sorun çözmede plan uygulanır, değişim sağlanır ve sürekli kılınır ("Bilgi toplama" burada değil değerlendirmededir). İzleme görüşmesinde becerilerin ve gelişmenin sürdürülüp sürdürülmediği (I, II, III, IV tamamı) kontrol edilir.',
        examTrap: 'Sonlandırma aşaması müracaatçı sorunlarını tek başına aşabilecek seviyeye geldiğinde ve özgüveni geliştiğinde yapılır; "duygu ve davranışları arasında ikilem yaşandığında" sonlandırma YAPILMAZ!',
      },
    ],
    mnemonic: 'ŞİFRE: Temel Aşamalar "B-D-S-S" (Başlama - Değerlendirme - Sorun Çözme - Sonlandırma) | Tamamlayıcılar "H-K-İ" (Hazırlık - Kayıt - İzleme).',
  },
  {
    id: 'gorusme-turleri',
    title: '2. Görüşme Türleri, Amaçları ve Sohbetten Farkı',
    category: 'Görüşme Türleri & Teknikleri',
    readingTime: '3 dk',
    keyTakeaways: [
      {
        term: 'Sosyal İnceleme vs. Tedavi Görüşmesi (PDF\'de 2\'şer Kez Soruldu!)',
        rule: 'Başvuranla ve çevresiyle (aile, okul, iş) görüşerek nesnel ve subjektif bilgi toplayan: SOSYAL İNCELEME GÖRÜŞMESİ. Psikolojik ilke ve prosedürlerle tutum ve davranışları değiştirmeyi amaçlayan: TEDAVİ GÖRÜŞMESİ.',
        examTrap: 'Bilgi toplama + çevre/aile = Sosyal İnceleme. Tutum ve davranış değiştirme = Tedavi Görüşmesi.',
      },
      {
        term: 'Yapılandırılmış vs. Odak Grup vs. Kontrol Görüşmesi',
        rule: 'Soruların, sırasının ve cevap kodlarının önceden belirlendiği: YAPILANDIRILMIŞ GÖRÜŞME. Bireysel hikâyeden ziyade bir grup/topluluğun belli bir konudaki davranış nedenlerini anlamaya çalışan: ODAK GRUP GÖRÜŞMESİ. Gerçekleşen değişimin seyrini izleyen: KONTROL GÖRÜŞMESİ.',
        examTrap: 'Mektup, faks, e-posta (ağ postası) ve ağ yazışması = YAZILI GÖRÜŞME. Evler = ENFORMEL görüşme ortamıdır (Okul, hastane, halk merkezi, evlat edinme merkezi formel/kurumsaldır).',
      },
      {
        term: 'Görüşme vs. Sohbet Farkı',
        rule: 'Görüşmenin bilinçli olarak tespit edilen bir amacı vardır, mesleki normlarla hareket edilir, görüşmecinin hesap verme yükümlülüğü vardır. Sohbette ise amaç olmak zorunda değildir ve roller belirsizdir.',
        examTrap: '"Görüşme ve sohbet aynı kavramlardır" ve "Görüşmede iletişim kalıpları gayri resmidir" ifadeleri YANLIŞTIR.',
      },
      {
        term: 'Görüşme Tekniğinin Zayıf Yanları ve Uygun Aday Olmama',
        rule: 'Başvuranın soruları yanlış anlaması/gizlemesi, görüşmecinin önyargısı, unutma/bilinçaltına atma, özel yaşamın korunamama riski zayıf yanlardır. Ancak "Görüşme sadece yüz yüze gerçekleşir" ifadesi yanlıştır. Başvuranın yakınması sosyal hizmet alanının dışında kaldığında uygun aday olmadığına karar verilir.',
        examTrap: 'Görüşme başarısının en düşük olduğu katılım hali: "Kişisel tercih olarak görüşmeyi reddetme"dir.',
      },
    ],
    mnemonic: 'ŞİFRE: Çevreyle bilgi toplama = Sosyal İnceleme | Tutum değiştirme = Tedavi | Değişim seyrini takip = Kontrol | Önceden kodlu soru = Yapılandırılmış.',
  },
  {
    id: 'iletisim-becerileri',
    title: '3. İletişim İlkeleri, Gürültü ve Görüşme Becerileri',
    category: 'İletişim & Görüşme Becerileri',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'İletişim İlkeleri ve Öğeleri',
        rule: 'İletişim karmaşıktır, kaçınılmazdır, tekrar edilemez, niceliği niteliğini arttırmaz ve DİNAMİK bir süreçtir (durağan değildir!). Kaynak tarafından kodlanmış bilgi/duygu/düşünceye İLETİ (Mesaj) denir.',
        examTrap: '"İletişim durağan bir olgudur" şıkkı sınavın klasik yanlış cevabıdır. Sözsüz iletişim kanalları: Jestler, ses tonu, göz iletişimi, mekân. "Dil" ise sözlü iletişimdir!',
      },
      {
        term: 'Psikolojik Gürültü vs. Fizyolojik Gürültü',
        rule: 'Üzüntü, heyecan, önyargı ve sevinç psikolojik gürültü kaynaklarıdır. YORGUNLUK ise fiziksel/fizyolojik gürültü kaynağıdır.',
        examTrap: 'Şıklarda "Yorgunluk" gördüğünüzde psikolojik değil fizyolojik gürültü olduğunu hemen işaretleyin.',
      },
      {
        term: 'Görüşme Becerileri, Etkin Dinleme ve Yüzleştirme',
        rule: 'Somutluk, yapılandırma, kendini açma, teşvik etme görüşme becerileridir; "İçe dönüklük" bir beceri değildir. Görüşmeci özelliklerinden beceri kullanımı üzerinde en az etkiye sahip olan "Fiziksel görüntü"dür. Açık uçlu soru örneği: "Bu konudaki düşünceleriniz nelerdir?"',
        examTrap: 'Etkin dinleyici karşıdaki konuşurken TAVSİYELERDE BULUNMAZ! Yüzleştirme tekniği ise görüşmenin tüm aşamalarına YAYILMAZ (güçlü ilişki, gerçek neden, uygun zaman ve yardım niyeti gerekir).',
      },
      {
        term: 'Aktarım ve İletişimsel Azınlık',
        rule: 'Başvuranın profesyonel ilişki dışındaki duygu ve düşüncelerini görüşmeciye yönlendirmesi: AKTARIM (Transference). ABD\'de yaşayan işitme engelliler "iletişimsel azınlık" örneğidir.',
        examTrap: 'Foucault\'nun azınlık ölçütlerinde ekonomik olanaklar, kendini ifade etme, temsil edebilme ve hayatı seçebilme vardır; "İstatistiksel olarak az sayıda olma" YOKTUR!',
      },
    ],
    mnemonic: 'ŞİFRE: Kodlanmış bilgi = İleti | Fizyolojik gürültü = Yorgunluk | En az etkili özellik = Fiziksel görüntü | Sayısal olmayan azınlık = Foucault.',
  },
  {
    id: 'etik-ilkeler',
    title: '4. Etik İlkeler, Değerler ve Profesyonel İlişki',
    category: 'Etik İlkeler & Profesyonel İlişki',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'Etiğin Konusu ve Temel Ölçütü',
        rule: 'Etiğin konusu AHLAKtır. Etiğe uygunluk ilkesinin temelinde yatan ölçüt TEMEL İNSAN HAKLARIdır. İnsan Hakları Evrensel Bildirgesi 2. Maddesi (ayrımcılık yasağı) "Farklılıklara duyarlılık" değerine dayanak oluşturur. BM Çocuk Hakları Sözleşmesi\'ne göre çocuk üst yaş sınırı 18\'dir.',
        examTrap: 'Bilgilendirilmiş onay (Informed Consent): Başvuranın "çalışmanın doğasını bilerek" görüşmeyi kabul etmesidir.',
      },
      {
        term: 'Etik İlkeler Hiyerarşisi (Loewenberg & Dolgoff)',
        rule: '1) Yaşamı koruma -> 2) Eşitlik -> 3) Özerklik -> 4) En az acı/zarar -> 5) İyi hayat standardı -> 6) Gizlilik ve mahremiyet -> 7) Doğruluk.',
        examTrap: '"Etik hiyerarşide hangisi en son gelir?" sorusunda şıklardaki sıralamada en sonda GİZLİLİK-MAHREMİYET yer alır! En üstte ise İnsan yaşamını korumak gelir.',
      },
      {
        term: 'Profesyonel İlişki ve Kabul Etme',
        rule: 'Profesyonel ilişkinin en önemli yararı "Başvuranda güven duygusu oluşması"dır. Olumlu ilişki kuran görüşmeciye yakıştırılan sıfat "Tutarlı"dır. Başvuranı olduğu gibi kabul etmenin işlevi "Başvuranın görüşme sürecinde tutulması"dır.',
        examTrap: 'İyi ilişki geliştirmek için gözetilecek etik ilkeler arasında saygı, ayrımcılık yapmama, veri toplama sınırları ve prosedürleri açıklama vardır; "Yansız olmak" bu listede yer almaz.',
      },
    ],
    mnemonic: 'ŞİFRE: Etik Hiyerarşi Başı = İnsan Yaşamı, Sonu = Gizlilik-Mahremiyet | İHEB Madde 2 = Farklılıklara Duyarlılık | Profesyonel İlişki = Güven.',
  },
  {
    id: 'kayit-raporlama',
    title: '5. Veri Kaydı, Kayıt Hataları ve Rapor Türleri',
    category: 'Kayıt Tutma & Raporlama',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'Kayıt Yöntemleri ve Not Alma',
        rule: 'Not alma görüşme sürecini uzatabilmektedir (en güvenilir/en etkili yöntem cihazla kayıttır). Görüşme sırasında yapılan gözlemleri canlandırabilen yöntem "Araştırma günlüğünde kayıt"tır. "Ağ yazışması" zaten yazılı olduğu için cihazla kayıt kullanılmaz.',
        examTrap: 'Görüşülen bireyden tam ve spesifik cevapların alınamadığı durumlarda GÖZLEM VERİLERİ çok önemli hale gelir.',
      },
      {
        term: 'Kayıt Faktörleri ve Kayıt Hataları (PDF\'de 2 Kez Soruldu!)',
        rule: 'Olayların sırasını veya aralarındaki bağlantıları hatırlayamama: YERİNİ DEĞİŞTİRME HATASI. Veri kaydı şeklini etkileyen faktörler: Görüşmenin türü, yapılış şekli, görüşmecinin tutumu, görüşülenin tutumu ("Görüşme konusu" etkilemez!).',
        examTrap: 'Doğru ve başarılı veri kaydı için dikkat edilmesi gerekenlerde izinsiz kayıt yapmama, isimsizlik, uzman kişilerden faydalanma ve not alma vardır; "Yazılı görüşmeler yapılması" şart değildir!',
      },
      {
        term: 'Rapor Türleri (Sosyal İnceleme vs. Görüşme Raporu)',
        rule: 'Aile, kardeş, okul ve iş yeriyle görüşülerek hazırlanan: SOSYAL İNCELEME RAPORU. Görüşme verilerinin kurum dosyaları için düzenli ve sistematik sunulması: GÖRÜŞME RAPORU.',
        examTrap: 'Görüşme raporu yol göstericidir, ipucudur, idarece değerlendirilir ve gereksiz bilgi içermez; ancak bizzat "sorun çözücü fonksiyona sahiptir" ifadesi YANLIŞTIR.',
      },
    ],
    mnemonic: 'ŞİFRE: Sıra/Bağlantı Karıştırma = Yerini Değiştirme Hatası | Aile/Okul/İş = Sosyal İnceleme Raporu | Kurum Dosyasına Sistematik Sunum = Görüşme Raporu.',
  },
  {
    id: 'kuramlar-yaklasimlar',
    title: '6. Kuramlar: Sistem, Görev Merkezli, Problem Çözme ve Egan',
    category: 'Kuramlar & Yaklaşımlar',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'Sistem Yaklaşımı İlkeleri',
        rule: 'Parçalar arasındaki etkileşimin en az sistemin kendisi kadar önemli olması: BÜTÜNLÜK ilkesi. Aile içindeki bireylerden birinin paylaşımcı davranmaması (bireyden kaynaklanan aksaklık): GÜÇLÜK (sistemin tamamından kaynaklanırsa Problem).',
        examTrap: 'Sistem yaklaşımı görüşmeyi alt sistem olarak görür, süreci izletir, bütünsellik ve denge tavrı kazandırır; ancak "Görüşmenin sonlanmasını sağlar" ifadesi YANLIŞTIR.',
      },
      {
        term: 'Görev-Merkezli Vaka Çalışması & Mesleki Bütünlük',
        rule: 'Görev-merkezli vaka çalışmasında: I. Rol ve sorumluluk sorunları, II. Karar soruları, III. Tepkisel duygusal stres durumları, IV. Psikolojik ve davranışsal sorunlar (TAMAMI: I, II, III ve IV) değerlendirmeye alınır. Teorik bilgi ve alan pratiğini birlikte yürütmeye MESLEKİ BÜTÜNLÜK denir.',
        examTrap: 'Bireyle sosyal çalışma, psikoterapi ve psikolojik danışma benzer kuram ve etik ilkelere dayanır ama "Üç yöntem de yalnızca görüşme tekniğini kullanır" ifadesi YANLIŞTIR.',
      },
      {
        term: 'Problem Çözme Yaklaşımı ve Gerard Egan Modeli',
        rule: 'Problem çözme yaklaşımında problem tanımlamayı izleyen hemen sonraki aşama: "Alternatif çözüm önerilerinin geliştirilmesi"dir. Gerard Egan\'ın 1. aşaması olan "danışanların öykülerini anlatmalarına yardım etmek" aşamasındaki görev: "Danışanların fark yaratacak konular üzerinde çalışmalarını sağlamak"tır.',
        examTrap: 'Egan\'da gelecek olasılıklarını keşfetmek ve amaca bağlanmak 2. aşama; strateji seçmek ve eyleme geçmek 3. aşamadır.',
      },
    ],
    mnemonic: 'ŞİFRE: Parça etkileşimi = Bütünlük | Birey paylaşmıyorsa = Güçlük | Teori + Pratik = Mesleki Bütünlük | Egan Öykü Aşaması = Fark yaratacak konular.',
  },
];

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    pdfNumbers: 'Soru 1 (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question: 'Görüşme sürecinde yapılması gerekenler ile ilgili aşağıdaki önerilerden hangisi yanlıştır?',
    options: [
      { key: 'A', text: 'İlk görüşmede danışan ile pozitif bir ilişkinin temelleri atılmalıdır.' },
      { key: 'B', text: 'Görüşmede danışanın tıbbi, psikolojik, sosyal geçmişine ve durumuna ilişkin bilgi alınmalıdır.' },
      { key: 'C', text: 'İlk görüşmenin başında danışana görüşme süreci ile ilgili bilgiler verilmelidir.' },
      { key: 'D', text: 'Görüşme sürecinin başarıya ulaşması için danışana otoriter ve mesafeli bir ilişki kurmaya özen gösterilmelidir.' },
      { key: 'E', text: 'Görüşmede danışanın kontrol sağlayabileceği rahat ve güvenli bir ortam oluşturulmalıdır.' },
    ],
    correctKey: 'D',
    explanation:
      'Sosyal hizmet görüşmelerinde otoriter, yargılayıcı ve aşırı mesafeli bir tutum güven ilişkisini zedeler. Başarılı bir görüşme için empatik, kabul edici, saydam ve güven veren profesyonel bir ilişki kurulmalıdır.',
    practicalTip: 'Şıklarda "otoriter", "kontrolcü", "yargılayıcı" veya "sabit fikirli" kelimelerini görürseniz sosyal hizmet görüşmesi için her zaman YANLIŞ ifadedir.',
  },
  {
    id: 2,
    pdfNumbers: 'Soru 2 (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question: 'Sosyal hizmet görüşmesinin sonlandırma aşaması ile ilgili olarak aşağıdakilerden hangisi yanlıştır?',
    options: [
      { key: 'A', text: 'Sosyal hizmet literatüründe neredeyse ihmal edilmiştir.' },
      { key: 'B', text: 'Terapötik sürecin önemli bir yönüdür.' },
      { key: 'C', text: 'Müracaatçı duygu ve davranışları arasında ikilem yaşandığında yapılabilir.' },
      { key: 'D', text: 'Müracaatçıda kendine güven duygusu geliştiği zaman yapılabilir.' },
      { key: 'E', text: 'Müracaatçı sorunlarını tek başına aşabilecek seviyeye geldiği zaman yapılabilir.' },
    ],
    correctKey: 'C',
    explanation:
      'Müracaatçının duygu ve davranışları arasında ikilem (çelişki) yaşaması, henüz müdahale ve yüzleştirme sürecinin devam etmesi gerektiğini gösterir; bu durumda görüşme sonlandırılamaz.',
    practicalTip: 'Duygu ve davranış arasında ikilem varsa SONLANDIRMA değil, YÜZLEŞTİRME / MÜDAHALE yapılır!',
  },
  {
    id: 3,
    pdfNumbers: 'Soru 3 [PDF\'de 1. diye numaralanmış] (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    prefaceList: [
      'I. Müracaatçının destek kaynaklarına gereksiniminin olup olmadığı',
      'II. Müracaatçının müdahale sürecinde elde ettiği becerileri kullanıp kullanmadığı',
      'III. Sosyal olarak istenen davranışları sürdürmeye yardımcı olacak aktivitelerin yapılıp yapılmadığı',
      'IV. Müracaatçının müdahale sırasında elde ettiği gelişmeyi sürdürüp sürdürmediği',
    ],
    question:
      'Yukarıdakilerden hangisi ya da hangileri sosyal hizmet uzmanının müracaatçılardan izleme görüşmesinde edineceği bilgiler kapsamında yer alır?',
    options: [
      { key: 'A', text: 'Yalnız I' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'III ve IV' },
      { key: 'D', text: 'I, II ve III' },
      { key: 'E', text: 'I, II, III ve IV' },
    ],
    correctKey: 'E',
    explanation:
      'İzleme (follow-up) görüşmesi, müdahale sonlandırıldıktan sonra müracaatçının kazandığı becerileri kullanıp kullanmadığını, gelişmenin kalıcılığını, destek gereksinimini ve olumlu aktiviteleri sürdürüp sürdürmediğini (I, II, III ve IV tamamını) kontrol eder.',
    practicalTip: 'İzleme görüşmesi = "Kazanımlar devam ediyor mu + ek destek lazım mı?" Öncüllerin tamamı (I, II, III ve IV) doğrudur.',
  },
  {
    id: 4,
    pdfNumbers: 'Soru 4 (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerin hangisi iletişim ilkelerinden biri değildir?',
    options: [
      { key: 'A', text: 'İletişim karmaşık bir süreçtir.' },
      { key: 'B', text: 'İletişimin niceliği niteliğini arttırmaz.' },
      { key: 'C', text: 'İletişim durağan bir olgudur.' },
      { key: 'D', text: 'İletişim kaçınılmazdır.' },
      { key: 'E', text: 'İletişim tekrar edilemez.' },
    ],
    correctKey: 'C',
    explanation:
      'İletişim durağan (statik) değil, sürekli değişen ve gelişen DİNAMİK bir süreçtir. Çok konuşmak (nicelik) iletişimin kalitesini (niteliğini) artırmaz, iletişim kaçınılmazdır ve aynı şekilde tekrar edilemez.',
    practicalTip: 'İletişim DURAĞAN DEĞİL, DİNAMİKTİR! Sınavda iletişim ilkeleri sorulursa "durağan" kelimesini hemen işaretleyin.',
  },
  {
    id: 5,
    pdfNumbers: 'Soru 5 (Sayfa 2)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerden hangisi sözsüz iletişim kanallarından biri değildir?',
    options: [
      { key: 'A', text: 'Jestler' },
      { key: 'B', text: 'Ses tonu' },
      { key: 'C', text: 'Dil' },
      { key: 'D', text: 'Göz iletişimi' },
      { key: 'E', text: 'Mekân' },
    ],
    correctKey: 'C',
    explanation:
      'Dil (kelimeler ve sözel ifadeler) SÖZLÜ iletişim kanalıdır. Jestler, mimikler, göz teması, mekân kullanımı (proksemik) ve ses tonu/vurgu (paradil) sözsüz iletişim kanallarıdır.',
    practicalTip: 'Ses tonu (nasıl söylendiği) sözsüz/paradil iletişimdir; ancak DİL doğrudan sözlü iletişimdir.',
  },
  {
    id: 6,
    pdfNumbers: 'Soru 6 (Sayfa 2)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    prefaceList: [
      'I. Gerçeklerin aslını öğrenme',
      'II. Gerçeklerin anlamlarını düşünme',
      'III. Yardım yöntemlerine karar verme',
    ],
    question:
      'Yukarıdakilerden hangisi ya da hangileri ön değerlendirmede müracaatçıyı anlamaya ilişkin aktiviteler arasında yer almaktadır?',
    options: [
      { key: 'A', text: 'Yalnız I' },
      { key: 'B', text: 'Yalnız II' },
      { key: 'C', text: 'I ve II' },
      { key: 'D', text: 'I ve III' },
      { key: 'E', text: 'I, II ve III' },
    ],
    correctKey: 'E',
    explanation:
      'Ön değerlendirme aşamasında müracaatçıyı bütünüyle anlamak için önce gerçeklerin aslı öğrenilir (bilgi toplama), sonra bu gerçeklerin müracaatçı için anlamı düşünülür (analiz) ve uygun yardım yöntemlerine karar verilir.',
    practicalTip: 'PDF\'deki Romen rakamlı 3 sorunun (İzleme, Ön Değerlendirme, Görev-Merkezli Vaka) üçünde de cevap HEPSİ (E şıkkı) olarak kurgulanmıştır!',
  },
  {
    id: 7,
    pdfNumbers: 'Soru 7 (Sayfa 2)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      '“……………………………, planlama basamağında yer alan son alt basamaktır.” Cümlede boş bırakılan yere aşağıdakilerden hangisi getirilmelidir?',
    options: [
      { key: 'A', text: 'Sorunları gereksinimler biçiminde tanımlama' },
      { key: 'B', text: 'Müdahale düzeylerini belirleme' },
      { key: 'C', text: 'Amaçları oluşturma' },
      { key: 'D', text: 'Sözleşme hazırlama' },
      { key: 'E', text: 'Hedefleri belirleme' },
    ],
    correctKey: 'D',
    explanation:
      'Planlı değişim sürecinin planlama aşamasında sırasıyla sorunlar gereksinimlere tercüme edilir, müdahale düzeyleri seçilir, amaçlar ve hedefler belirlenir ve en son alt basamak olarak müracaatçı ile "Sözleşme (Kontrat) hazırlama" gerçekleştirilir.',
    practicalTip: 'Planlamanın son noktası = SÖZLEŞME HAZIRLAMA (Sözleşme imzalanır ve hemen ardından Uygulama aşamasına geçilir).',
  },
  {
    id: 8,
    pdfNumbers: 'Soru 8 (Sayfa 2)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question:
      'Aşağıdakilerden hangisi bir bilginin, duygunun ya da düşüncenin kaynak tarafından kodlanmış halidir?',
    options: [
      { key: 'A', text: 'Hedef' },
      { key: 'B', text: 'Kanal' },
      { key: 'C', text: 'İleti' },
      { key: 'D', text: 'Geri bildirim' },
      { key: 'E', text: 'Kod açma' },
    ],
    correctKey: 'C',
    explanation:
      'İletişim sürecinde kaynağın aktarmak istediği bilgi, duygu veya düşüncenin sembollere/kelimelere dönüştürülerek kodlanmış haline İLETİ (Mesaj) denir.',
    practicalTip: 'Kaynak tarafından kodlanmış bilgi/duygu/düşünce = İLETİ (Mesaj).',
  },
  {
    id: 9,
    pdfNumbers: 'Soru 9 (Sayfa 2)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Aşağıdakilerden hangisi görüşme tekniğiyle ilgili doğru bir ifade değildir?',
    options: [
      { key: 'A', text: 'Görüşme, karşılıklı bir etkileşim sağlar.' },
      { key: 'B', text: 'Görüşme sayesinde bir başkasının dünyasını tanımak mümkündür.' },
      { key: 'C', text: 'Görüşme ve sohbet aynı kavramlardır.' },
      { key: 'D', text: 'Görüşmede amaç derinlemesine bilgi edinmektir.' },
      { key: 'E', text: 'Görüşme sözlü ve sözlü olmayan iletişimi içerir.' },
    ],
    correctKey: 'C',
    explanation:
      'Görüşme ve sohbet aynı kavramlar değildir. Görüşme; belirli bir amacı olan, planlı, mesleki ilke ve kurallara dayanan profesyonel bir süreçtir. Sohbet ise plansız, gayri resmi ve iyi vakit geçirmeye yöneliktir.',
    practicalTip: 'Görüşme ≠ Sohbet! Görüşmede bilinçli bir amaç ve rol dağılımı vardır.',
  },
  {
    id: 10,
    pdfNumbers: 'Soru 10 (Sayfa 3)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question: 'Aşağıdakilerden hangisi tanışma / bağlantı kurma aşamasında yapılır?',
    options: [
      { key: 'A', text: 'Çözümler uygulanır' },
      { key: 'B', text: 'Sorun ve gereksinimler ele alınır' },
      { key: 'C', text: 'Müracaatçı yaşadığı durumla ilgili olarak yargılanır.' },
      { key: 'D', text: 'Çözüme ilişkin davranışlar ele alınır.' },
      { key: 'E', text: 'Sempatik ilişki kurulur.' },
    ],
    correctKey: 'E',
    explanation:
      'Tanışma / bağlantı kurma (engagement) aşamasında müracaatçı ile sıcak, olumlu, güven verici (ders notlarında sempatik/empatik olarak ifade edilen) ilişki kurulur. Sorunların derinlemesine ele alınması ön değerlendirmede, çözümlerin uygulanması ise uygulama aşamasındadır.',
    practicalTip: 'Tanışma / Bağlantı Kurma = İlişki kurma aşamasıdır (Şıklarda ilişki kurulmasını ifade eden tek seçenek E şıkkıdır).',
  },
  {
    id: 11,
    pdfNumbers: 'Soru 11 (Sayfa 3)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question:
      'Aşağıdakilerden hangisi psikolojik gürültü kaynaklarına ilişkin verilebilecek bir örnek değildir?',
    options: [
      { key: 'A', text: 'Üzüntü' },
      { key: 'B', text: 'Heyecan' },
      { key: 'C', text: 'Önyargı' },
      { key: 'D', text: 'Yorgunluk' },
      { key: 'E', text: 'Sevinç' },
    ],
    correctKey: 'D',
    explanation:
      'Üzüntü, heyecan, önyargı ve sevinç bireyin zihinsel/duygusal durumuyla ilgili olduğu için psikolojik gürültü kaynaklarıdır. Yorgunluk (açlık, hastalık, işitme kaybı vb. gibi) ise FİZYOLOJİK / FİZİKSEL gürültü kaynağıdır.',
    practicalTip: 'Yorgunluk = Fizyolojik/Fiziksel gürültüdür, psikolojik değildir!',
  },
  {
    id: 12,
    pdfNumbers: 'Soru 12 (Sayfa 3)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Müracaatçıların kendi kendilerine “Benim sorunum var ve bu sorunu çözmek için bir şeyler yapmam gerekir.” diyerek sorununa ilişkin farkındalık kazandıkları aşama aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Ön değerlendirme' },
      { key: 'B', text: 'Hazırlık' },
      { key: 'C', text: 'Planlama' },
      { key: 'D', text: 'Sonlandırma' },
      { key: 'E', text: 'Uygulama' },
    ],
    correctKey: 'B',
    explanation:
      'Müracaatçının henüz uzmanla fiilen görüşmeye başlamadan veya yardım almadan önce kendi sorununu fark edip yardım arama kararına vardığı aşama "Hazırlık" aşamasıdır (Değişim aşamalarında da farkındalık sonrası harekete hazırlık evresidir).',
    practicalTip: '"Sorunum var ve bir şeyler yapmam gerekir" diyerek başvuruya zihnen hazırlanma = HAZIRLIK aşaması.',
  },
  {
    id: 13,
    pdfNumbers: 'Soru 13 (Sayfa 3)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question: 'Aşağıdakilerden hangisi bilgilendirilmiş onayı ifade eder?',
    options: [
      { key: 'A', text: 'Başvuranın çalışmanın doğasını bilerek, görüşmeyi kabul etmesidir.' },
      { key: 'B', text: 'Başvuranın çalışmanın zararlarını bilerek görüşmeyi kabul etmesidir.' },
      { key: 'C', text: 'Başvuranın görüşmeyi kabul etmesidir.' },
      { key: 'D', text: 'Başvuranın görüşmenin prosedürlerini kabul etmesidir.' },
      { key: 'E', text: 'Başvurana görüşme sürecinde sahip olduğu hakların bildirilmesidir.' },
    ],
    correctKey: 'A',
    explanation:
      'Bilgilendirilmiş onay (aydınlatılmış onam); başvuranın yapılacak çalışmanın amacını, içeriğini, kapsamını (yani çalışmanın doğasını) tam olarak bilerek ve anlayarak görüşmeyi özgür iradesiyle kabul etmesidir.',
    practicalTip: 'Bilgilendirilmiş onay = "Çalışmanın DOĞASINI bilerek görüşmeyi kabul etmesi".',
  },
  {
    id: 14,
    pdfNumbers: 'Soru 14 (Sayfa 3)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Aşağıdakilerden hangisi sosyal hizmet uzmanı için profesyonel bir süreç olan planlı değişim sürecinin planlama aşamasında yer almaz?',
    options: [
      { key: 'A', text: 'Müracaatçıya yönelik uygulama planının hazırlanması' },
      { key: 'B', text: 'Müracaatçının içinde bulunduğu duruma dair tanımlamanın yapılması' },
      { key: 'C', text: 'Ön görüşmenin yapılması' },
      { key: 'D', text: 'Önceliklerin neler olduğuna müracaatçı ile karar verilmesi' },
      { key: 'E', text: 'Sorunların çözümüne yönelik zaman çerçevesinin belirlenmesi' },
    ],
    correctKey: 'C',
    explanation:
      'Ön görüşmenin yapılması planlama aşamasında değil, sürecin en başında (Tanışma / Bağlantı Kurma veya Ön Değerlendirme öncesi aşamada) gerçekleştirilir.',
    practicalTip: '"Ön görüşme" adı üstünde sürecin en başında yapılır; 3. aşama olan Planlama aşamasında yer almaz.',
  },
  {
    id: 15,
    pdfNumbers: 'Soru 15 & Soru 20 (Sayfa 4 & 5)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 15 ve Soru 20 olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Başvuranın sorunlarını anlamaya ve sorunlar hakkında başvuranla, çevresiyle görüşerek nesnel ve subjektif bilgi toplayan sosyal hizmet görüşmesi aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Odak grup görüşme' },
      { key: 'B', text: 'Sosyal inceleme görüşmesi' },
      { key: 'C', text: 'Teşhis görüşmesi' },
      { key: 'D', text: 'Yapılandırılmış görüşme' },
      { key: 'E', text: 'Tedavi görüşmesi' },
    ],
    correctKey: 'B',
    explanation:
      'Başvuranın sorunlarını anlamak için hem kendisiyle hem de sosyal çevresiyle (aile, okul, iş yeri vb.) görüşerek nesnel ve öznel (subjektif) bilgi toplamayı amaçlayan görüşme türü "Sosyal inceleme görüşmesi"dir.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): "Başvuranla ve ÇEVRESİYLE görüşerek nesnel ve subjektif BİLGİ TOPLAYAN" = SOSYAL İNCELEME GÖRÜŞMESİ.',
  },
  {
    id: 16,
    pdfNumbers: 'Soru 16 (Sayfa 4)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    prefaceList: [
      'I. Rol ve sorumluluklara ilişkin sorunlar',
      'II. Karar soruları',
      'III. Tepkisel duygusal stres durumları',
      'IV. Psikolojik ve davranışsal sorunlar',
    ],
    question:
      'Yukarıdaki sorunlardan hangisi ya da hangileri sosyal hizmet disiplini tarafından geliştirilmiş görev-merkezli vaka çalışması yönteminde değerlendirmeye alınır?',
    options: [
      { key: 'A', text: 'Yalnız I' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'II, III ve IV' },
      { key: 'E', text: 'I, II, III ve IV' },
    ],
    correctKey: 'E',
    explanation:
      'William Reid ve Laura Epstein tarafından geliştirilen Görev-Merkezli (Task-Centered) vaka çalışması yönteminde; rol performans sorunları, karar alma sorunları, tepkisel duygusal stres ve psikolojik/davranışsal sorunların tamamı (I, II, III ve IV) ele alınır.',
    practicalTip: 'Görev-merkezli vaka çalışması öncüllü sorusunda 4 maddenin tamamı (I, II, III ve IV) kapsama dahildir.',
  },
  {
    id: 17,
    pdfNumbers: 'Soru 17 & Soru 18 (Sayfa 4)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 17 ve Soru 18 olarak alt alta birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Psikolojik ilke ve prosedürleri uygulayarak başvuranların tutum ve davranışlarının değiştirilmesinin amaçlandığı sosyal hizmet görüşmesi aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Tedavi görüşmesi' },
      { key: 'B', text: 'Yarı-yapılandırılmış görüşme' },
      { key: 'C', text: 'Odak grup görüşmesi' },
      { key: 'D', text: 'Sosyal inceleme görüşmesi' },
      { key: 'E', text: 'Teşhis görüşmesi' },
    ],
    correctKey: 'A',
    explanation:
      'Psikolojik ilke ve prosedürler kullanılarak başvuranın uyumsuz tutum ve davranışlarının değiştirilmesini (iyileştirilmesini/sağaltımını) amaçlayan görüşme türü "Tedavi (Terapötik) görüşmesi"dir.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): "Psikolojik ilke ve prosedürlerle TUTUM VE DAVRANIŞLARIN DEĞİŞTİRİLMESİ" = TEDAVİ GÖRÜŞMESİ.',
  },
  {
    id: 18,
    pdfNumbers: 'Soru 19 & Soru 22 (Sayfa 4-5)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 19 ve Soru 22 olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Aşağıdakilerden hangisi görüşme tekniğinin zayıf yanlarından birisi değildir?',
    options: [
      {
        key: 'A',
        text: 'Görüşülen kişinin soruları yanlış anlaması veya cevaplarında doğruları gizlemesi hatalı bilgi toplanmasına neden olur.',
      },
      {
        key: 'B',
        text: 'Görüşmeci, görüşülen kişinin farklı özellikler taşıması nedeniyle kendi önyargılarıyla hareket edebilir.',
      },
      {
        key: 'C',
        text: 'Görüşülen kişi, başına gelen olayları unutmuş ya da bilinçaltına atmış olabilir.',
      },
      { key: 'D', text: 'Görüşülen kişinin özel yaşamı korunmayabilir.' },
      { key: 'E', text: 'Görüşme tekniği sadece yüz yüze gerçekleşir.' },
    ],
    correctKey: 'E',
    explanation:
      'Görüşme tekniği yalnızca yüz yüze gerçekleşmez; telefonla, tele-konferansla veya yazılı (mektup, e-posta, ağ yazışması) araçlarla da gerçekleştirilebilir. Diğer dört şık ise görüşme tekniğinin bilinen sınırlılıkları/zayıf yanlarıdır.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): "Görüşme sadece yüz yüze gerçekleşir" ifadesi yanlıştır, dolayısıyla zayıf yanlarından biri değildir.',
  },
  {
    id: 19,
    pdfNumbers: 'Soru 21 (Sayfa 5)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Aşağıdakilerden hangisi bireyle sosyal çalışma, psikoterapi ve psikolojik danışmanın benzerliklerinden biri değildir?',
    options: [
      { key: 'A', text: 'Üç yöntem benzer kuramlardan yararlanır.' },
      { key: 'B', text: 'Üç yöntem de yalnızca görüşme tekniğini kullanır.' },
      { key: 'C', text: 'Üç yöntem de insanlara yardımı amaçlar.' },
      { key: 'D', text: 'Üç yöntem de benzer etik ilkelere dayanır.' },
      { key: 'E', text: 'Üç yöntem de yüz yüze ilişkiyi gerekli kılar.' },
    ],
    correctKey: 'B',
    explanation:
      'Her üç yardım mesleği de görüşme tekniğini temel araç olarak kullansa da "yalnızca" görüşme tekniğini kullanmazlar; gözlem, psikometrik testler, ev/kurum ziyaretleri, çevresel müdahaleler ve grup çalışmaları gibi pek çok farklı teknikten de yararlanırlar.',
    practicalTip: 'Şıklarda "yalnızca", "sadece" gibi mutlak sınırlandırıcı ifadeler varsa dikkat edin: Üç yöntem de YALNIZCA görüşme tekniğini kullanmaz.',
  },
  {
    id: 20,
    pdfNumbers: 'Soru 23 (Sayfa 5-6)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerden hangisi açık uçlu sorulara örnek oluşturur?',
    options: [
      { key: 'A', text: 'Hangi kurumda çalışıyorsunuz?' },
      { key: 'B', text: 'Romanı mı öyküyü mü daha çok seversiniz?' },
      { key: 'C', text: 'Kaç çocuğunuz var?' },
      { key: 'D', text: 'Bu konudaki düşünceleriniz nelerdir?' },
      { key: 'E', text: 'Arkadaşlarınızı sever misiniz?' },
    ],
    correctKey: 'D',
    explanation:
      'Açık uçlu sorular tek kelimelik ("evet/hayır", sayı veya isim) yanıtlarla geçiştirilemeyen, başvuranın duygu ve düşüncelerini kendi cümleleriyle ayrıntılı anlatmasına olanak tanıyan sorulardır ("Bu konudaki düşünceleriniz nelerdir?").',
    practicalTip: '"Nelerdir?", "Nasıl değerlendiriyorsunuz?", "Anlatır mısınız?" ile biten sorular AÇIK UÇLU sorulardır.',
  },
  {
    id: 21,
    pdfNumbers: 'Soru 24 (Sayfa 6)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Aşağıdakilerden hangisi görüşme sürecinin ilk oturumlarında bilgi toplamak amacıyla yapılan değerlendirmeyi en iyi açıklar?',
    options: [
      { key: 'A', text: 'Süreç olarak değerlendirme' },
      { key: 'B', text: 'Aşama olarak değerlendirme' },
      { key: 'C', text: 'Sonuç olarak değerlendirme' },
      { key: 'D', text: 'Psikososyal değerlendirme' },
      { key: 'E', text: 'Çıktıların değerlendirilmesi' },
    ],
    correctKey: 'B',
    explanation:
      'Görüşme literatüründe değerlendirme iki boyutta ele alınır: Görüşmenin ilk oturumlarında bilgi toplamak ve sorunu anlamak amacıyla yapılan belirli evreye "Aşama olarak değerlendirme", görüşmenin başından sonuna dek devam eden dinamik incelemeye ise "Süreç olarak değerlendirme" denir.',
    practicalTip: '"İlk oturumlarda bilgi toplamak amacıyla yapılan" = AŞAMA OLARAK DEĞERLENDİRME.',
  },
  {
    id: 22,
    pdfNumbers: 'Soru 25 (Sayfa 6)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question:
      'Görüşmeci ile başvuran arasında kurulan profesyonel ilişkinin en önemli yararı aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Görüşmecinin rahat bir uygulama yapması' },
      { key: 'B', text: 'Başvuranın bilgilenmesi' },
      { key: 'C', text: 'Başvuranda güven duygusu oluşması' },
      { key: 'D', text: 'Başvuranın ruhsal çöküntüden kurtulması' },
      { key: 'E', text: 'Sosyal çalışmacının yeterliğinin artması' },
    ],
    correctKey: 'C',
    explanation:
      'Profesyonel yardım ilişkisinin en temel işlevi ve en önemli yararı başvuranda "güven duygusu" oluşturmasıdır. Güven oluşmadan başvuran kendini açamaz ve müdahale süreci başarıya ulaşamaz.',
    practicalTip: 'Profesyonel ilişkinin en önemli yararı = BAŞVURANDA GÜVEN DUYGUSU OLUŞMASI.',
  },
  {
    id: 23,
    pdfNumbers: 'Soru 26 (Sayfa 6)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question: 'Aşağıdakilerden hangisi görüşmenin tamamlayıcı aşamalarından biridir?',
    options: [
      { key: 'A', text: 'Başlama' },
      { key: 'B', text: 'Hazırlık' },
      { key: 'C', text: 'Değerlendirme' },
      { key: 'D', text: 'Sorun çözme' },
      { key: 'E', text: 'Sonlandırma' },
    ],
    correctKey: 'B',
    explanation:
      'Görüşmenin 4 temel aşaması vardır: Başlama, Değerlendirme, Sorun Çözme ve Sonlandırma. Bu aşamaları destekleyen 3 tamamlayıcı aşama ise: Hazırlık, Kayıt Tutma ve İzleme aşamalarıdır.',
    practicalTip: 'Tamamlayıcı aşamalar: HAZIRLIK - KAYIT TUTMA - İZLEME (Diğer 4 şık temel aşamadır!).',
  },
  {
    id: 24,
    pdfNumbers: 'Soru 27 (Sayfa 6)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Aşağıdakilerden hangisi görüşme sürecine tamamlayıcı aşamaları eklemenin gerekçelerinden biri değildir?',
    options: [
      { key: 'A', text: 'Görüşmenin sistem olarak ele alınması gerekliliği' },
      { key: 'B', text: 'Yasal gerekçeler' },
      {
        key: 'C',
        text: 'Görüşmenin düşünsel ve duygusal olarak fiilen karşılaşmadan önce başlıyor olması',
      },
      {
        key: 'D',
        text: 'Görüşmenin etkililiğinin tamamlayıcı evrelerde gerçekleştirilenlerden etkilenmesi',
      },
      { key: 'E', text: 'Görüşmenin bütün olması' },
    ],
    correctKey: 'B',
    explanation:
      'Görüşme sürecine hazırlık, kayıt ve izleme gibi tamamlayıcı aşamaların eklenmesi mesleki, kuramsal ve metodolojik bütünlük (sistem yaklaşımı, etkililik, zihinsel başlangıç) gereğidir; "yasal gerekçeler" bu kuramsal gerekçelerden biri değildir.',
    practicalTip: 'Tamamlayıcı aşamaları eklemenin gerekçelerinde sistem, bütünlük ve etkililik vardır; YASAL GEREKÇELER yoktur.',
  },
  {
    id: 25,
    pdfNumbers: 'Soru 28 (Sayfa 7)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question:
      'İnsan Hakları Evrensel Bildirgesi’nin 2. maddesi aşağıdaki yardım ilişkisi değerlerinden hangisine dayanak oluşturur?',
    options: [
      { key: 'A', text: 'Saydamlık' },
      { key: 'B', text: 'Başvuranı güçlendirme' },
      { key: 'C', text: 'Pozitif yanlılık' },
      { key: 'D', text: 'Farklılıklara duyarlılık' },
      { key: 'E', text: 'İçtenlik' },
    ],
    correctKey: 'D',
    explanation:
      'İnsan Hakları Evrensel Bildirgesi’nin 2. maddesi ırk, renk, cinsiyet, dil, din, siyasal veya başka bir görüş ayrımı gözetilmeksizin herkesin tüm hak ve özgürlüklere sahip olduğunu vurgular. Bu madde doğrudan "Farklılıklara duyarlılık / Ayrımcılık yapmama" değerinin dayanağıdır.',
    practicalTip: 'İHEB Madde 2 (Ayrımcılık Yasağı) = FARKLILIKLARA DUYARLILIK.',
  },
  {
    id: 26,
    pdfNumbers: 'Soru 29 (Sayfa 7)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Aşağıdakilerden hangisi görüşmecinin görüşmeye hazırlık aşamasında gerçekleştirdiği ‘düşünsel’ etkinliklerden biridir?',
    options: [
      { key: 'A', text: 'Görüşme öncesinde odanın toparlanması' },
      { key: 'B', text: 'Görüşme odasının havalandırılması' },
      { key: 'C', text: 'Uygun aydınlatmanın sağlanması' },
      { key: 'D', text: 'Görüşmenin gidişatına ilişkin zihinsel bir planlamanın yapılması' },
      { key: 'E', text: 'Dikkat dağıtıcı unsurların ortadan kaldırılması' },
    ],
    correctKey: 'D',
    explanation:
      'Odanın toparlanması, havalandırılması, aydınlatma ve dikkat dağıtıcı unsurların kaldırılması "fiziksel hazırlık" etkinlikleridir. Görüşmenin gidişatına ilişkin zihinsel planlama yapılması ise "düşünsel hazırlık" etkinliğidir.',
    practicalTip: 'Düşünsel etkinlik = ZİHİNSEL PLANLAMA (Diğer 4 şık odayla ilgili fiziksel hazırlıktır).',
  },
  {
    id: 27,
    pdfNumbers: 'Soru 30 (Sayfa 7)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerden hangisi görüşme becerilerinden biri değildir?',
    options: [
      { key: 'A', text: 'İçe dönüklük' },
      { key: 'B', text: 'Somutluk' },
      { key: 'C', text: 'Yapılandırma' },
      { key: 'D', text: 'Kendini açma' },
      { key: 'E', text: 'Teşvik etme' },
    ],
    correctKey: 'A',
    explanation:
      'Somutluk, yapılandırma, kendini açma, teşvik etme, empati ve özetleme temel görüşme becerileridir. "İçe dönüklük" ise bir kişilik özelliğidir ve görüşme becerisi değildir.',
    practicalTip: 'İçe dönüklük bir görüşme becerisi DEĞİLDİR!',
  },
  {
    id: 28,
    pdfNumbers: 'Soru 31 & Soru 55 (Sayfa 7 & 14)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 31 ve Soru 55 olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Aşağıdakilerden hangisi görüşmenin ilişki kurma aşamasında başvurulan değer ya da becerilerden biri değildir?',
    options: [
      { key: 'A', text: 'Kabul etme' },
      { key: 'B', text: 'Empati kurma' },
      { key: 'C', text: 'Yüzleştirme' },
      { key: 'D', text: 'Öz belirleme' },
      { key: 'E', text: 'Gizlilik' },
    ],
    correctKey: 'C',
    explanation:
      'İlişki kurma (başlama) aşamasında kabul etme, empati, öz belirleme (self-determination) ve gizlilik temel değer ve becerilerdir. Yüzleştirme (confrontation) ise ancak güven ilişkisi sağlamlaştığında, sonraki (sorun çözme/müdahale) aşamalarda kullanılabilecek ileri bir beceridir.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): İlişki kurma aşamasında YÜZLEŞTİRME yapılmaz! (Daha yeni tanıştığınız danışanı yüzleştiremezsiniz).',
  },
  {
    id: 29,
    pdfNumbers: 'Soru 32 (Sayfa 7)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question: 'Aşağıdakilerden hangisi etiğin konusunu ifade eder?',
    options: [
      { key: 'A', text: 'Ahlak' },
      { key: 'B', text: 'İnsan' },
      { key: 'C', text: 'Davranış' },
      { key: 'D', text: 'Değerler' },
      { key: 'E', text: 'Felsefe' },
    ],
    correctKey: 'A',
    explanation:
      'Etik (ahlak felsefesi), felsefenin bir alt dalıdır ve doğrudan "Ahlak"ı (ahlaki eylemleri, iyi ve kötüyü) inceleme konusu yapar.',
    practicalTip: 'Etiğin konusu = AHLAK.',
  },
  {
    id: 30,
    pdfNumbers: 'Soru 33 (Sayfa 7-8)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question: 'Aşağıdakilerden hangisi değerlendirmenin amaçları arasında yer almaz?',
    options: [
      { key: 'A', text: 'Başvuran ve sorunuyla ilgili bilgi toplama' },
      { key: 'B', text: 'Sorunu ayrıntılarıyla anlamaya çalışma' },
      { key: 'C', text: 'Başvuranın görüşme için uygun aday olup olmadığına karar verme' },
      { key: 'D', text: 'Başvuranda değişim motivasyonu oluşturma' },
      { key: 'E', text: 'Değişim planını uygulamaya koyma' },
    ],
    correctKey: 'E',
    explanation:
      'Değerlendirme aşamasında bilgi toplanır, sorun ayrıntılarıyla anlaşılır, uygun aday olup olmadığına bakılır ve değişim motivasyonu oluşturulur. "Değişim planını uygulamaya koyma" ise değerlendirmeden sonraki "Sorun çözme / Uygulama" aşamasının amacıdır.',
    practicalTip: 'Planı UYGULAMAYA KOYMA değerlendirmede değil, SORUN ÇÖZME (Uygulama) aşamasında yapılır.',
  },
  {
    id: 31,
    pdfNumbers: 'Soru 34 (Sayfa 8)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question:
      'Aşağıdaki görüşmeci özelliklerinden hangisi görüşme becerilerinin başarılı kullanımı üzerinde en az etkiye sahiptir?',
    options: [
      { key: 'A', text: 'Esneklik' },
      { key: 'B', text: 'Kişilik özellikleri' },
      { key: 'C', text: 'Zekâ' },
      { key: 'D', text: 'Kendini tanıma' },
      { key: 'E', text: 'Fiziksel görüntü' },
    ],
    correctKey: 'E',
    explanation:
      'Görüşmecinin esnekliği, kişilik özellikleri, zekâsı ve kendini tanıması (öz farkındalığı) görüşme becerilerinin başarısını doğrudan belirlerken, "Fiziksel görüntü" en az etkiye sahip unsurdur.',
    practicalTip: 'Görüşme becerileri üzerinde EN AZ etkili olan = FİZİKSEL GÖRÜNTÜ.',
  },
  {
    id: 32,
    pdfNumbers: 'Soru 36 [PDF\'de 35 atlanmış] (Sayfa 8)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Aşağıdaki durumların hangisinde görüşmeci başvuranın görüşme için uygun bir aday olmadığı kararı vermelidir?',
    options: [
      { key: 'A', text: 'Başvuranın duygusal sorunları olduğunda' },
      { key: 'B', text: 'Başvuran görüşme için gönüllü olduğunda' },
      { key: 'C', text: 'Başvuran bir başka uzman tarafından yönlendirildiğinde' },
      { key: 'D', text: 'Başvuranın yakınması sosyal hizmet alanının dışında kaldığında' },
      { key: 'E', text: 'Başvuranın gelişimsel dönemlerle ilgili sorunu olduğunda' },
    ],
    correctKey: 'D',
    explanation:
      'Eğer başvuranın getirdiği yakınma/sorun sosyal hizmet disiplininin ve kurumun yetki/uzmanlık alanının dışında kalıyorsa, başvuran bu görüşme için uygun aday değildir ve ilgili meslek/kuruma havale (yönlendirme) edilmelidir.',
    practicalTip: 'Yakınma sosyal hizmet alanının DIŞINDA kaldığında uygun aday değildir -> başka uzmana/kuruma yönlendirilir.',
  },
  {
    id: 33,
    pdfNumbers: 'Soru 37 (Sayfa 8)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question:
      'Aşağıdakilerden hangisi yüzleştirme tekniğinin uygulanması için gerekli koşullardan biri değildir?',
    options: [
      { key: 'A', text: 'İlişkinin yeterince güçlü olması' },
      { key: 'B', text: 'Yüzleştirme için gerçek bir neden bulunması' },
      { key: 'C', text: 'Yüzleştirmenin uygun zamanda gerçekleştirilmesi' },
      { key: 'D', text: 'Yüzleştirmenin yardım etme niyetiyle yapılması' },
      { key: 'E', text: 'Yüzleştirmenin görüşme sürecinin tüm aşamalarına yayılması' },
    ],
    correctKey: 'E',
    explanation:
      'Yüzleştirme; güçlü bir ilişki kurulduktan sonra, gerçek bir çelişki/neden olduğunda, doğru zamanda ve yardım niyetiyle dikkatle kullanılır. Görüşmenin tüm aşamalarına (özellikle başlama/tanışma aşamasına) yayılması söz konusu değildir.',
    practicalTip: 'Yüzleştirme tüm aşamalara YAYILMAZ! Sadece ilişki güçlendikten sonra ve gerektiğinde yapılır.',
  },
  {
    id: 34,
    pdfNumbers: 'Soru 38 (Sayfa 8)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Aile içindeki bireylerden birinin paylaşımcı davranmaması aşağıdaki kavramların hangisine örnek olabilir?',
    options: [
      { key: 'A', text: 'Güçlük' },
      { key: 'B', text: 'Problem' },
      { key: 'C', text: 'Sistem' },
      { key: 'D', text: 'Yardım' },
      { key: 'E', text: 'Destek' },
    ],
    correctKey: 'A',
    explanation:
      'Sistem yaklaşımına dayalı sosyal hizmet görüşmesinde, sistem içindeki tek bir bireyden (parçadan) kaynaklanan aksaklık ve uyumsuzluklara "Güçlük", sistemin bütününden veya işleyişinden kaynaklanan tıkanıklıklara ise "Problem" adı verilir.',
    practicalTip: 'Ailedeki BİREYLERDEN BİRİNİN paylaşımcı davranmaması = GÜÇLÜK (Bireysel aksaklık = Güçlük, Sistemsel aksaklık = Problem).',
  },
  {
    id: 35,
    pdfNumbers: 'Soru 39 & Soru 52 (Sayfa 8-9 & 13)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 39 ve Soru 52 olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Aşağıdakilerden hangisi kontrol görüşmelerinin en temel amacıdır?',
    options: [
      { key: 'A', text: 'Hedeflenen değişimin sağlanması' },
      { key: 'B', text: 'Başvuranın özlem gereksiniminin giderilmesi' },
      { key: 'C', text: 'Gerçekleşen değişimin seyrinin izlenmesi' },
      { key: 'D', text: 'Rapor tutulması' },
      { key: 'E', text: 'Görüşmecinin deneyim kazanma gereksinimi' },
    ],
    correctKey: 'C',
    explanation:
      'Kontrol (izleme/takip) görüşmelerinin en temel amacı, müdahale sonucunda gerçekleşen değişimin kalıcılığını ve seyrini izlemektir.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): Kontrol görüşmesinin en temel amacı = GERÇEKLEŞEN DEĞİŞİMİN SEYRİNİN İZLENMESİ.',
  },
  {
    id: 36,
    pdfNumbers: 'Soru 40 [1. Seri] (Sayfa 9)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question:
      'Aşağıdakilerden hangisi görüşme verilerinin kaydedilme şeklini etkileyen faktörlerden biri değildir?',
    options: [
      { key: 'A', text: 'Görüşmenin türü' },
      { key: 'B', text: 'Görüşmenin yapılış şekli' },
      { key: 'C', text: 'Görüşme konusu' },
      { key: 'D', text: 'Görüşmecinin tutumu' },
      { key: 'E', text: 'Görüşülen bireyin tutumu' },
    ],
    correctKey: 'C',
    explanation:
      'Görüşme verilerinin nasıl kaydedileceğini (not alma, ses/görüntü kaydı vb.); görüşmenin türü, yapılış şekli, görüşmecinin tutumu ve görüşülen bireyin tutumu/onayı etkiler. Ancak "Görüşme konusu" kayıt şeklini belirleyen temel faktörler arasında yer almaz.',
    practicalTip: 'Kayıt şeklini etkileyenler: Türü, Yapılış şekli, Görüşmecinin tutumu, Görüşülenin tutumu. Etkilemeyen = GÖRÜŞME KONUSU.',
  },
  {
    id: 37,
    pdfNumbers: 'Soru 41 [1. Seri] (Sayfa 9)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Aşağıdaki görüşmeye katılım hallerinden hangisinde görüşme başarısının en düşük olması beklenir?',
    options: [
      { key: 'A', text: 'Adli makamlarca yönlendirilme' },
      { key: 'B', text: 'Yöneticiler tarafından yönlendirilme' },
      { key: 'C', text: 'Kişisel tercih olarak görüşmeyi reddetme' },
      { key: 'D', text: 'Görüşmeye gönüllü katılım' },
      { key: 'E', text: 'Arkadaşlar tarafından yönlendirilme' },
    ],
    correctKey: 'C',
    explanation:
      'Kişinin kendi tercihiyle görüşmeyi reddetmesi (direnç göstermesi ve katılmayı istememesi) durumunda, değişim motivasyonu ve işbirliği olmayacağı için görüşme başarısının en düşük olması beklenir.',
    practicalTip: 'En yüksek başarı = Gönüllü katılım; En düşük başarı = KİŞİSEL TERCİH OLARAK GÖRÜŞMEYİ REDDETME.',
  },
  {
    id: 38,
    pdfNumbers: 'Soru 42 [1. Seri] (Sayfa 9)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question: 'Aşağıdakilerden hangisi not alma yöntemine ilişkin doğru bir ifadedir?',
    options: [
      { key: 'A', text: 'Not alma, aslına uygun veri kaydının en güvenilir yoludur.' },
      { key: 'B', text: 'Not alma, görüşmeciyi aktif bir dinleyici yapar.' },
      { key: 'C', text: 'Not alma, daha çok yapılandırılmamış görüşmeler için tercih edilir.' },
      { key: 'D', text: 'Not alma, görüşme sürecini uzatabilmektedir.' },
      { key: 'E', text: 'Not alma, veri kaydında en etkili yöntemdir.' },
    ],
    correctKey: 'D',
    explanation:
      'Görüşme sırasında not almak; göz temasını kesintiye uğratabilir, konuşma akışını yavaşlatabilir ve görüşme sürecini uzatabilir. Aslına uygun en güvenilir ve etkili kayıt yöntemi ise cihazla (ses/görüntü) kayıttır.',
    practicalTip: 'Not alma = Görüşme sürecini UZATABİLMEKTEDİR (En güvenilir/etkili yöntem ise cihazla kayıttır).',
  },
  {
    id: 39,
    pdfNumbers: 'Soru 43 [1. Seri] (Sayfa 9)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerden hangisi ‘iletişimsel azınlık’ olarak değerlendirilebilir?',
    options: [
      { key: 'A', text: 'Amerika Birleşik Devletleri’nde yaşayan işitme engelliler' },
      { key: 'B', text: 'Türkiye’de yaşayan erkekler' },
      { key: 'C', text: 'Avrupa’da yaşayan kadınlar' },
      { key: 'D', text: 'Türkiye’de yaşayan Müslümanlar' },
      { key: 'E', text: 'Avrupa’da öğrenciler' },
    ],
    correctKey: 'A',
    explanation:
      'Toplumun çoğunluğunun kullandığı egemen sözlü dil yerine işaret dili gibi farklı bir iletişim kanalını kullanan ve bu nedenle iletişimsel engellerle karşılaşan işitme engelliler "iletişimsel azınlık" olarak değerlendirilir.',
    practicalTip: 'İletişimsel azınlık = İŞİTME ENGELLİLER (ABD\'de yaşayan işitme engelliler).',
  },
  {
    id: 40,
    pdfNumbers: 'Soru 44 [1. Seri] (Sayfa 9-10)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Aşağıdakilerden hangisi mektup, faks, ağ postası ve ağ yazışması şeklinde yapılan görüşmeleri ifade etmektedir?',
    options: [
      { key: 'A', text: 'Ses temelli görüşme' },
      { key: 'B', text: 'Yapılandırılmış görüşme' },
      { key: 'C', text: 'Sözel görüşme' },
      { key: 'D', text: 'Yazılı görüşme' },
      { key: 'E', text: 'Yüz yüze görüşme' },
    ],
    correctKey: 'D',
    explanation:
      'Mektup, faks, e-posta (ağ postası) ve çevrimiçi sohbet (ağ yazışması) yoluyla metin üzerinden gerçekleştirilen görüşmeler "Yazılı görüşme" olarak adlandırılır.',
    practicalTip: 'Mektup, faks, ağ postası, ağ yazışması = YAZILI GÖRÜŞME.',
  },
  {
    id: 41,
    pdfNumbers: 'Soru 45 [1. Seri] (Sayfa 10)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Aşağıdakilerden hangisi sistem yaklaşımının sosyal hizmet görüşmesine katkılarından biri değildir?',
    options: [
      { key: 'A', text: 'Görüşmenin bir alt sistem olarak düşünülmesini sağlar.' },
      { key: 'B', text: 'Görüşmecinin süreci izlemesine olanak verir.' },
      { key: 'C', text: 'Görüşmenin sonlanmasını sağlar.' },
      { key: 'D', text: 'Görüşmeciye bütünsellik anlayışı kazandırır.' },
      { key: 'E', text: 'Görüşmeciye dengeden yana olma tavrı kazandırır.' },
    ],
    correctKey: 'C',
    explanation:
      'Sistem yaklaşımı; görüşmeyi bir alt sistem olarak ele almayı, bütünsellik anlayışını, dengeyi (homeostazis) ve sürecin izlenmesini sağlar. Ancak "görüşmenin sonlanmasını sağlamak" sistem yaklaşımının bir katkısı değildir.',
    practicalTip: 'Sistem yaklaşımı bütünsellik, alt sistem ve denge kazandırır; "Görüşmenin sonlanmasını sağlar" ifadesi YANLIŞTIR.',
  },
  {
    id: 42,
    pdfNumbers: 'Soru 46 [1. Seri] & Soru 47 [2. Seri] (Sayfa 10 & 12)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Sayfa 10 (Soru 46) ve Sayfa 12 (Soru 47) olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Kayıt Tutma & Raporlama',
    question:
      'Aşağıdakilerden hangisi doğru ve başarılı bir veri kaydı için dikkat edilmesi gereken hususlardan biri değildir?',
    options: [
      { key: 'A', text: 'İzinsiz kayıt yapılmaması' },
      { key: 'B', text: 'İsimsizliğin garanti edilmesi' },
      { key: 'C', text: 'Uzman kişilerden faydalanılması' },
      { key: 'D', text: 'Görüşmeyle ilgili not alınması' },
      { key: 'E', text: 'Yazılı görüşmeler yapılması' },
    ],
    correctKey: 'E',
    explanation:
      'Doğru ve başarılı bir veri kaydı için başvurandan izin alınması, gizlilik/isimsizliğin korunması, gerektiğinde uzmanlardan yararlanılması ve not alınması önemlidir. Ancak başarılı veri kaydı için görüşmelerin "yazılı görüşme şeklinde yapılması" gibi bir zorunluluk yoktur.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): Veri kaydında dikkat edilecek hususlar arasında "Yazılı görüşmeler yapılması" yer almaz.',
  },
  {
    id: 43,
    pdfNumbers: 'Soru 47 [1. Seri] (Sayfa 10)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Parçalar arasındaki etkileşimin de en az sistemin kendisi kadar önemli olduğunu ileri süren sistem yaklaşımı ilkesi aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'İlişki' },
      { key: 'B', text: 'Bütünlük' },
      { key: 'C', text: 'Denge' },
      { key: 'D', text: 'Yakınlık' },
      { key: 'E', text: 'Geştalt' },
    ],
    correctKey: 'B',
    explanation:
      'Sistem yaklaşımının "Bütünlük" ilkesine göre bir sistem yalnızca parçaların toplamından ibaret değildir; parçalar arasındaki karşılıklı etkileşim de en az sistemin kendisi kadar önemlidir.',
    practicalTip: 'Parçalar arasındaki etkileşim = BÜTÜNLÜK ilkesi.',
  },
  {
    id: 44,
    pdfNumbers: 'Soru 48 [1. Seri] & Soru 45 [2. Seri] (Sayfa 10-11 & 12)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Sayfa 10 (Soru 48) ve Sayfa 12 (Soru 45) olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Kayıt Tutma & Raporlama',
    question:
      'Aşağıdaki raporlardan hangisi başvuranı daha iyi tanımak amacıyla ailesi, kardeşleri, okul ve iş yerlerindeki kişilerle yapılan görüşmeler sonucu hazırlanır?',
    options: [
      { key: 'A', text: 'Süreç raporu' },
      { key: 'B', text: 'Özet raporu' },
      { key: 'C', text: 'Sosyal inceleme raporu' },
      { key: 'D', text: 'Mesleki rapor' },
      { key: 'E', text: 'Görüşme raporu' },
    ],
    correctKey: 'C',
    explanation:
      'Başvuranı çevresi içinde (ailesi, kardeşleri, okul ve iş yeri çevresi) bütüncül olarak tanımak ve değerlendirmek amacıyla yapılan görüşmeler sonucunda "Sosyal inceleme raporu" hazırlanır.',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): "Ailesi, kardeşleri, okul ve iş yeriyle yapılan görüşmeler sonucu hazırlanan rapor" = SOSYAL İNCELEME RAPORU.',
  },
  {
    id: 45,
    pdfNumbers: 'Soru 49 [1. Seri] (Sayfa 11)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question: 'Aşağıdakilerden hangisi Michel Foucault’un azınlık ölçütleri arasında yer almaz?',
    options: [
      { key: 'A', text: 'Toplumdaki ekonomik olanaklardan yararlanma kapasitesi' },
      { key: 'B', text: 'Kendini olduğu gibi ifade edebilme' },
      { key: 'C', text: 'İstatistiksel olarak az sayıda olma' },
      { key: 'D', text: 'Kendini temsil edebilme' },
      { key: 'E', text: 'Yaşanılan hayatı seçebilme' },
    ],
    correctKey: 'C',
    explanation:
      'Michel Foucault’ya göre "azınlık" kavramı sayısal (istatistiksel) azlıkla ilgili değildir; iktidar ilişkileri içinde ekonomik olanaklardan yararlanma, kendini ifade ve temsil edebilme, kendi hayatını seçebilme kapasitesinden yoksun bırakılma durumudur (Örn: kadınlar sayıca nüfusun yarısı olsa da sosyolojik/iletişimsel açıdan azınlık konumunda olabilir).',
    practicalTip: 'Foucault\'da azınlık sayısal değildir -> "İstatistiksel olarak az sayıda olma" YER ALMAZ!',
  },
  {
    id: 46,
    pdfNumbers: 'Soru 40 [2. Seri] (Sayfa 11)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question:
      'Aşağıdakilerden hangisi görüşme verilerinin kurum dosyaları için düzenli ve sistematik bir şekilde sunulmasını ifade etmektedir?',
    options: [
      { key: 'A', text: 'Özet raporu' },
      { key: 'B', text: 'Görüşme raporu' },
      { key: 'C', text: 'Gözlem raporu' },
      { key: 'D', text: 'Süreç raporu' },
      { key: 'E', text: 'Sosyal inceleme raporu' },
    ],
    correctKey: 'B',
    explanation:
      'Elde edilen görüşme verilerinin çalıştığımız kurumun arşiv ve dosyaları için düzenli, anlaşılır ve sistematik bir biçimde yazılı hale getirilip sunulmasına "Görüşme raporu" denir.',
    practicalTip: '"Görüşme verilerinin kurum dosyaları için düzenli ve sistematik sunulması" = GÖRÜŞME RAPORU.',
  },
  {
    id: 47,
    pdfNumbers: 'Soru 41 [2. Seri] & Soru 46 [2. Seri] (Sayfa 11 & 12)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Sayfa 11 (Soru 41) ve Sayfa 12 (Soru 46) olarak birebir aynı şekilde 2 kez sorulmuştur.',
    category: 'Kayıt Tutma & Raporlama',
    question:
      'Görüşmecinin olayların sırasını veya aralarındaki bağlantıları hatırlayamamasına ne ad verilir?',
    options: [
      { key: 'A', text: 'Tanıma hatası' },
      { key: 'B', text: 'İhmal hatası' },
      { key: 'C', text: 'Yerini değiştirme hatası' },
      { key: 'D', text: 'Derleme hatası' },
      { key: 'E', text: 'Unutma hatası' },
    ],
    correctKey: 'C',
    explanation:
      'Görüşme sonrasında kayıt tutarken olayların kronolojik sırasının veya olaylar arasındaki neden-sonuç/bağlantıların karıştırılmasına ya da hatırlanamamasına "Yerini değiştirme hatası" denir (Bir detayı tamamen atlamak ise ihmal hatasıdır).',
    practicalTip: 'BANKO SORU (PDF\'de 2 kez geçti): "Olayların SIRASINI veya BAĞLANTILARINI hatırlayamama" = YERİNİ DEĞİŞTİRME HATASI.',
  },
  {
    id: 48,
    pdfNumbers: 'Soru 42 [2. Seri] (Sayfa 11)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Meslek elemanının mevcut teorik bilgisi ve alan pratiğini birlikte yürütmesine ne ad verilir?',
    options: [
      { key: 'A', text: 'Mesleki bütünlük' },
      { key: 'B', text: 'Profesyonel mesleki bakış' },
      { key: 'C', text: 'Pratik bütünlük' },
      { key: 'D', text: 'Bilimsel sistematik analiz' },
      { key: 'E', text: 'Teorik bütünlük' },
    ],
    correctKey: 'A',
    explanation:
      'Sosyal hizmet uzmanının akademik/kuramsal (teorik) bilgisi ile sahadaki uygulama (alan pratiği) becerilerini birleştirerek uyum içinde yürütmesine "Mesleki bütünlük" denir.',
    practicalTip: 'Teorik bilgi + Alan pratiğini birlikte yürütme = MESLEKİ BÜTÜNLÜK.',
  },
  {
    id: 49,
    pdfNumbers: 'Soru 43 [2. Seri] (Sayfa 11-12)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question:
      'Aşağıdakilerden hangisi Birleşmiş Milletler Çocuk Hakları Konvansiyonu’na göre bir kişinin ‘çocuk’ olarak adlandırılması için üst yaş sınırıdır?',
    options: [
      { key: 'A', text: '18' },
      { key: 'B', text: '17' },
      { key: 'C', text: '16' },
      { key: 'D', text: '15' },
      { key: 'E', text: '14' },
    ],
    correctKey: 'A',
    explanation:
      'Birleşmiş Milletler Çocuk Hakları Sözleşmesi (Konvansiyonu) Madde 1 uyarınca, daha erken yaşta reşit olma durumu hariç, 18 yaşına kadar her insan çocuk sayılır.',
    practicalTip: 'BM Çocuk Hakları Sözleşmesi çocuk üst yaş sınırı = 18.',
  },
  {
    id: 50,
    pdfNumbers: 'Soru 44 [2. Seri] (Sayfa 12)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question: 'Aşağıdakilerden hangisi görüşme raporlarıyla ilgili doğru bir ifade değildir?',
    options: [
      { key: 'A', text: 'Görüşme raporu, sorun çözücü fonksiyona sahiptir.' },
      { key: 'B', text: 'Görüşme raporu, meslek elemanına yol göstericidir.' },
      {
        key: 'C',
        text: 'Görüşme raporunun, sorun çözmede anahtar ve ipucu olarak değerlendirilmesi gerekir.',
      },
      { key: 'D', text: 'Görüşme raporu, ilgili idare tarafından değerlendirilir.' },
      { key: 'E', text: 'Görüşme raporu, gereksiz bilgiler içermemelidir.' },
    ],
    correctKey: 'A',
    explanation:
      'Görüşme raporu; sorun çözmede meslek elemanına yol gösterici bir anahtar ve ipucudur (B ve C şıkları), ancak raporun kendisi doğrudan "sorun çözücü fonksiyona" sahip değildir; sorunu çözen mesleki müdahaledir.',
    practicalTip: 'C şıkkı ile A şıkkını karşılaştırın: Rapor sorun çözmede "anahtar ve ipucudur", bizzat "sorun çözücü fonksiyona sahip" değildir!',
  },
  {
    id: 51,
    pdfNumbers: 'Soru 48 [2. Seri] (Sayfa 12-13)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Görüşme ve sohbet kavramı arasındaki ayrımla ilgili aşağıdaki ifadelerden hangisi doğrudur?',
    options: [
      { key: 'A', text: 'Görüşme iyi vakit geçirmek için yapılır.' },
      { key: 'B', text: 'Sohbette kişilerin rol ve sorumluluk dağılımı vardır' },
      { key: 'C', text: 'Sohbette bilinçli bir şekilde hazırlanma ve resmi bir yapı söz konusudur.' },
      { key: 'D', text: 'Görüşmeci ve başvuranın özellikleri birbirine benzerdir' },
      { key: 'E', text: 'Görüşmenin bilinçli olarak tespit edilen bir amacı vardır' },
    ],
    correctKey: 'E',
    explanation:
      'Görüşmeyi günlük sohbetten ayıran en temel özellik, görüşmenin önceden bilinçli olarak tespit edilmiş profesyonel bir amacının, planının ve rol dağılımının bulunmasıdır.',
    practicalTip: 'Görüşme vs. Sohbet doğrusu = "Görüşmenin bilinçli olarak tespit edilen bir amacı vardır".',
  },
  {
    id: 52,
    pdfNumbers: 'Soru 49 [2. Seri] (Sayfa 13)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Aşağıdakilerden hangisi görüşmenin sorun çözme aşamasında yapılanlardan birisi değildir?',
    options: [
      { key: 'A', text: 'Planın sonuçlarını değerlendirme' },
      { key: 'B', text: 'Değişimi sürekli kılma' },
      { key: 'C', text: 'Planı uygulama' },
      { key: 'D', text: 'Bilgi toplama' },
      { key: 'E', text: 'Değişimi sağlama' },
    ],
    correctKey: 'D',
    explanation:
      'Sorun çözme aşamasında hazırlanan plan uygulanır, değişim sağlanır, sürekli kılınır ve sonuçları değerlendirilir. "Bilgi toplama" ise bir önceki aşama olan "Değerlendirme" aşamasının temel görevidir.',
    practicalTip: 'Soru 30\'un tam tersi! Değerlendirmede "planı uygulama" olmaz; Sorun çözmede ise "BİLGİ TOPLAMA" olmaz.',
  },
  {
    id: 53,
    pdfNumbers: 'Soru 50 (Sayfa 13)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question: 'Aşağıdaki görüşme türlerinden hangisinde cihazla kayıt yöntemi kullanılmaz?',
    options: [
      { key: 'A', text: 'Tele-konferans' },
      { key: 'B', text: 'Ağ yazışması' },
      { key: 'C', text: 'Telefon görüşmesi' },
      { key: 'D', text: 'Yüz yüze bireysel görüşme' },
      { key: 'E', text: 'Yüz yüze grup görüşmesi' },
    ],
    correctKey: 'B',
    explanation:
      'Ağ yazışması (çevrimiçi metin yazışması) zaten yazılı olarak gerçekleştiği için ses veya görüntü kayıt cihazıyla kaydedilmez; doğrudan yazı temelli kayıt niteliğindedir.',
    practicalTip: 'Ağ yazışması = Yazılı metindir, ses/görüntü CİHAZLA KAYIT yöntemi kullanılmaz.',
  },
  {
    id: 54,
    pdfNumbers: 'Soru 51 (Sayfa 13)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Bir görüşme sürecinde genel değerlendirme aşamasından sonraki aşama aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Kayıt tutma' },
      { key: 'B', text: 'Sorun çözme girişimi' },
      { key: 'C', text: 'İzleme' },
      { key: 'D', text: 'Sonlandırma' },
      { key: 'E', text: 'Başlama' },
    ],
    correctKey: 'B',
    explanation:
      'Görüşmenin temel aşamaları sırasıyla: 1) Başlama, 2) Genel Değerlendirme, 3) Sorun Çözme Girişimi (Müdahale) ve 4) Sonlandırmadır. Dolayısıyla genel değerlendirmeden hemen sonra "Sorun çözme girişimi" gelir.',
    practicalTip: 'Sıralama: Başlama -> Genel Değerlendirme -> SORUN ÇÖZME GİRİŞİMİ -> Sonlandırma.',
  },
  {
    id: 55,
    pdfNumbers: 'Soru 53 (Sayfa 13)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Sosyal çalışmacılar görüşme tekniğini aşağıdaki amaçlardan hangisi için kullanmaz?',
    options: [
      { key: 'A', text: 'Klinik ve analitik yöntemin bir parçası olarak' },
      { key: 'B', text: 'Başvurana yardım etmek' },
      { key: 'C', text: 'Bilimsel araştırmanın bir parçası olarak' },
      { key: 'D', text: 'Başvuranı tedavi etmek' },
      { key: 'E', text: 'Başvuran hakkında bilgi edinmek' },
    ],
    correctKey: 'A',
    explanation:
      'Sosyal çalışmacılar görüşmeyi başvuran hakkında bilgi edinmek (sosyal inceleme), başvurana yardım/tedavi etmek ve bilimsel araştırmanın parçası olarak kullanır. Ancak psikanalitik/psikiyatrik anlamda "klinik ve analitik yöntemin bir parçası olarak" kullanmak klinik psikoloji/psikiyatrinin amacıdır (Not: Bazı kaynaklarda D şıkkı "tedavi etmek" ile A şıkkı birlikte tartışılır; ders kitabında psikanalitik/analitik yöntem ayrımına dikkat edin).',
    practicalTip: 'Sosyal hizmet görüşmesinin 3 temel amacı: Bilgi edinmek (İnceleme), Yardım/Tedavi etmek ve Bilimsel araştırma. "Klinik ve analitik yöntemin parçası" psikanalize aittir.',
  },
  {
    id: 56,
    pdfNumbers: 'Soru 54 (Sayfa 13)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question:
      'Görüşme verilerinin kaydedilmesinde kullanılan yöntemlerden hangisi görüşme sırasında yapılan gözlemleri canlandırabilir?',
    options: [
      { key: 'A', text: 'Not alma' },
      { key: 'B', text: 'Araştırma günlüğünde kayıt' },
      { key: 'C', text: 'Cihazda kayıt' },
      { key: 'D', text: 'Ağ yazışması' },
      { key: 'E', text: 'Yazı temelli kayıt' },
    ],
    correctKey: 'B',
    explanation:
      'Araştırma günlüğünde kayıt; görüşmecinin görüşme sırasındaki ortamı, başvuranın beden dilini, duygusal atmosferi ve kendi gözlemlerini betimleyerek sonradan zihinde canlandırmasına olanak tanıyan kayıt yöntemidir.',
    practicalTip: 'Gözlemleri ve izlenimleri canlandıran kayıt = ARAŞTIRMA GÜNLÜĞÜNDE KAYIT.',
  },
  {
    id: 57,
    pdfNumbers: 'Soru 56 (Sayfa 14)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerden hangisi etkin dinleyicilerin temel özelliklerinden biri değildir?',
    options: [
      { key: 'A', text: 'Karşıdaki kişi konuşurken tavsiyelerde bulunur' },
      { key: 'B', text: 'Söylenenleri karşı tarafın anlayıp anlamadığını kontrol eder' },
      { key: 'C', text: 'İletişime odaklanır' },
      { key: 'D', text: 'Sözsüz iletişim kanallarını kullanır' },
      { key: 'E', text: 'Göz teması kurarak mimik ve jestleri takip eder' },
    ],
    correctKey: 'A',
    explanation:
      'Etkin bir dinleyici, karşıdaki kişi konuşurken sözünü kesip tavsiyelerde veya öğütlerde bulunmaz; iletişime odaklanır, göz teması kurar, sözsüz kanalları takip eder ve geri bildirimle anlamayı kontrol eder.',
    practicalTip: 'Etkin dinleyici konuşurken TAVSİYELERDE BULUNMAZ (Öğüt/tavsiye vermek iletişim engelidir).',
  },
  {
    id: 58,
    pdfNumbers: 'Soru 57 (Sayfa 14)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Görüşmeye dayanak oluşturan yaklaşımlardan biri olan problem çözme yaklaşımının problem tanımlamayı izleyen aşaması aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Çözüm önerilerinin uygulamaya geçirilmesi' },
      { key: 'B', text: 'Alternatif çözüm önerilerinin geliştirilmesi' },
      { key: 'C', text: 'Önerilerden seçim yaparak amaçların belirlenmesi' },
      { key: 'D', text: 'Çözüm önerilerinin izlenmesi' },
      { key: 'E', text: 'Çözüm önerilerinin ayrıntılı biçimde değerlendirilmesi' },
    ],
    correctKey: 'B',
    explanation:
      'Problem çözme yaklaşımının sıralaması: 1) Problemin tanımlanması -> 2) Alternatif çözüm önerilerinin geliştirilmesi (beyin fırtınası) -> 3) Çözüm önerilerinin değerlendirilmesi -> 4) En uygun önerinin seçilmesi -> 5) Uygulama -> 6) İzleme.',
    practicalTip: 'Problem tanımlandıktan hemen sonra = ALTERNATİF ÇÖZÜM ÖNERİLERİNİN GELİŞTİRİLMESİ gelir.',
  },
  {
    id: 59,
    pdfNumbers: 'Soru 58 (Sayfa 14)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    question:
      'Aşağıdakilerden hangisi Gerard Egan’ın önerdiği “danışanların öykülerini anlatmalarına yardım etmek” aşamasında gerçekleştirilmesi gereken görevlerden biridir?',
    options: [
      { key: 'A', text: 'Danışanların fark yaratacak konular üzerinde çalışmalarını sağlamak' },
      { key: 'B', text: 'Danışanların daha iyi gelecek olasılıklarını keşfetmelerini sağlamak' },
      { key: 'C', text: 'Danışanların amaca bağlanmalarını sağlamak' },
      { key: 'D', text: 'Danışanların en uygun stratejileri seçmelerine yardım etmek' },
      { key: 'E', text: 'Danışanların planlamadan eyleme geçmelerine yardım etmek' },
    ],
    correctKey: 'A',
    explanation:
      'Gerard Egan’ın "Yardım Eden Modeline" (Skilled Helper) göre 1. Aşama (Mevcut Durum / Öyküyü Anlatma): Öyküyü anlatma, kör noktaları fark etme ve "fark yaratacak konular üzerinde çalışmayı sağlama (kaldıraçlama)" görevlerinden oluşur. B ve C 2. aşama (Tercih Edilen Senaryo), D ve E ise 3. aşama (Eylem) görevleridir.',
    practicalTip: 'Egan 1. Aşama (Öykü anlatma) = FARK YARATACAK KONULAR ÜZERİNDE ÇALIŞMALARINI SAĞLAMAK.',
  },
  {
    id: 60,
    pdfNumbers: 'Soru 59 (Sayfa 14)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kayıt Tutma & Raporlama',
    question: 'Sosyal hizmet görüşmelerinde gözlem verileri hangi durumlarda çok önemli bir hale gelir?',
    options: [
      { key: 'A', text: 'Görüşülen bireylerin sağır ve dilsiz olduğu durumlarda' },
      { key: 'B', text: 'Görüşmeci ana dilinden farklı bir dille görüşme yaptığında' },
      { key: 'C', text: 'Görüşülen bireyin çok hızlı konuştuğu durumlarda' },
      { key: 'D', text: 'Görüşülenden tam ve spesifik cevapların alınamadığı durumlarda' },
      { key: 'E', text: 'Görüşülen bireyin çok yavaş konuştuğu durumlarda' },
    ],
    correctKey: 'D',
    explanation:
      'Görüşülen bireyden sözel olarak tam, net ve spesifik cevapların alınamadığı (direnç, çekingenlik, gelişimsel durum vb.) hallerde, uzmanın yaptığı sözsüz iletişim ve çevre gözlemleri (gözlem verileri) kritik önem kazanır.',
    practicalTip: 'Gözlem verileri ne zaman çok önemli olur? -> "Görüşülenden TAM VE SPESİFİK CEVAPLARIN ALINAMADIĞI durumlarda".',
  },
  {
    id: 61,
    pdfNumbers: 'Soru 60 (Sayfa 14-15)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Aşağıdakilerden hangisi enformel görüşme ortamlarından biridir?',
    options: [
      { key: 'A', text: 'Evlat edinme merkezleri' },
      { key: 'B', text: 'Okullar' },
      { key: 'C', text: 'Evler' },
      { key: 'D', text: 'Halk merkezleri' },
      { key: 'E', text: 'Hastaneler' },
    ],
    correctKey: 'C',
    explanation:
      'Okullar, hastaneler, halk merkezleri ve evlat edinme merkezleri kurumsal (formel) görüşme ortamlarıdır. Başvuranın kendi doğal yaşam alanı olan "Evler" ise enformel (resmi olmayan) görüşme ortamıdır.',
    practicalTip: 'Enformel görüşme ortamı = EVLER (Diğer tüm şıklar resmi kurum/merkezdir).',
  },
  {
    id: 62,
    pdfNumbers: 'Soru 61 (Sayfa 15)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question:
      'Aşağıdakilerden hangisi başvuranlar tarafından olumlu ilişki kuran görüşmecilere yakıştırılan sıfatlardan biridir?',
    options: [
      { key: 'A', text: 'Tutarlı' },
      { key: 'B', text: 'Kontrolcü' },
      { key: 'C', text: 'Egoist' },
      { key: 'D', text: 'Otoriter' },
      { key: 'E', text: 'Sabit fikirli' },
    ],
    correctKey: 'A',
    explanation:
      'Kontrolcü, egoist, otoriter ve sabit fikirli olumsuz sıfatlardır. Başvuranlarla olumlu ve güvene dayalı ilişki kuran görüşmeciler başvuranlar tarafından "Tutarlı", dürüst, içten ve saydam olarak tanımlanır.',
    practicalTip: 'Şıklar arasında tek olumlu sıfat = TUTARLI.',
  },
  {
    id: 63,
    pdfNumbers: 'Soru 62 (Sayfa 15)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question:
      'Aşağıdakilerden hangisi başvuranla iyi bir ilişki geliştirmek için sosyal çalışmacının gözeteceği etik ilkeler arasında yer almaz?',
    options: [
      { key: 'A', text: 'Veri toplamanın sınırlarına dikkat etmek.' },
      { key: 'B', text: 'Başvurana karşı saygılı olmak.' },
      { key: 'C', text: 'Ayrımcılık yapmamak' },
      { key: 'D', text: 'Görüşmenin prosedürlerini açıklamak' },
      { key: 'E', text: 'Yansız olmak' },
    ],
    correctKey: 'E',
    explanation:
      'Sosyal çalışmacı veri toplamanın sınırlarına dikkat eder (mahremiyet), saygılı olur, ayrımcılık yapmaz ve prosedürleri açıklar (saydamlık). Sosyal hizmet yardım ilişkisinde soğuk bir "yansızlık" yerine "pozitif yanlılık" (başvuranın iyiliğini ve güçlenmesini destekleme) değer olarak benimsenir.',
    practicalTip: 'Sosyal hizmette "Yansız olmak" yerine başvuranın lehine "Pozitif yanlılık" vardır!',
  },
  {
    id: 64,
    pdfNumbers: 'Soru 63 (Sayfa 15)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question: 'Etik hiyerarşide aşağıdakilerden hangisi en son gelir?',
    options: [
      { key: 'A', text: 'Gizlilik-mahremiyet' },
      { key: 'B', text: 'İnsan yaşamını korumak' },
      { key: 'C', text: 'En az acı' },
      { key: 'D', text: 'İyi hayat standardı' },
      { key: 'E', text: 'Eşit davranma' },
    ],
    correctKey: 'A',
    explanation:
      'Loewenberg ve Dolgoff’un Etik İlkeler Hiyerarşisi sırasıyla: 1) İnsan yaşamını korumak, 2) Eşitlik ve eşitsizliği giderme (Eşit davranma), 3) Özerklik ve özgürlük, 4) En az zarar / En az acı, 5) Yaşam kalitesi / İyi hayat standardı, 6) Gizlilik ve mahremiyet, 7) Doğruluk ve tam açıklama. Dolayısıyla verilen şıklar arasında en sonda (6. sırada) "Gizlilik-mahremiyet" yer alır.',
    practicalTip: 'Etik Hiyerarşi: 1. İnsan yaşamını korumak (En üstte) ... 6. GİZLİLİK-MAHREMİYET (Şıklarda en sonda!). Örneğin intihar/cinayet riski varsa yaşamı korumak gizlilikten önce gelir.',
  },
  {
    id: 65,
    pdfNumbers: 'Soru 64 (Sayfa 15)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Aşağıdakilerden hangisi görüşmeyi sohbetten ayıran farklardan biri değildir?',
    options: [
      { key: 'A', text: 'Sohbette belli bir amaç olmak zorunda değildir.' },
      { key: 'B', text: 'Sohbette roller belirsizdir.' },
      { key: 'C', text: 'Görüşmecinin hesap verme yükümlülüğü vardır.' },
      { key: 'D', text: 'Görüşmede mesleki normlarla hareket edilir.' },
      { key: 'E', text: 'Görüşmede iletişim kalıpları gayri resmidir.' },
    ],
    correctKey: 'E',
    explanation:
      'Görüşmede iletişim kalıpları gayri resmi (enformel) değil, mesleki normlara uygun ve profesyoneldir. Gayri resmi iletişim kalıpları sohbete aittir.',
    practicalTip: 'Görüşmede iletişim kalıpları gayri resmi DEĞİLDİR (profesyonel/resmidir).',
  },
  {
    id: 66,
    pdfNumbers: 'Soru 65 (Sayfa 15)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question: 'Aşağıdakilerden hangisi sosyal hizmetlerdeki görüşmenin amaçlarından biri değildir?',
    options: [
      {
        key: 'A',
        text: 'Sadece başvuranla görüşerek onun sorunları hakkında fikir sahibi olmak.',
      },
      { key: 'B', text: 'Başvuranın zihinsel ve duygusal durumu hakkında bilgi toplamak.' },
      { key: 'C', text: 'Başvurana geçmişte yapılan tedaviler hakkında bilgi almak.' },
      { key: 'D', text: 'Başvurana kendisine yapılacak yardım hakkında bilgi vermek.' },
      { key: 'E', text: 'Başvuran ve görüşmeci arasında karşılıklı bir etkileşim gerçekleştirmek.' },
    ],
    correctKey: 'A',
    explanation:
      'Sosyal hizmet "çevresi içinde birey" ilkesiyle hareket eder; bu nedenle "sadece başvuranla görüşerek" sorunlar hakkında fikir sahibi olmak sosyal hizmet görüşmesinin amacı olamaz (ailesi, sosyal çevresi ve ilgili kurumlarla da görüşülür).',
    practicalTip: '"SADECE başvuranla görüşerek..." ifadesi yanlıştır; sosyal hizmette çevre ve aileyle de görüşülür.',
  },
  {
    id: 67,
    pdfNumbers: 'Soru 66 (Sayfa 16)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Görüşmeye başlamadan önce görüşülecek kişiye sorulacak soruları, soruların sorulma sırasının ve cevap kodlarının belirlendiği görüşme türü aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Odak grup görüşmesi' },
      { key: 'B', text: 'Yarı-yapılandırılmış görüşme' },
      { key: 'C', text: 'Yapılandırılmamış görüşme' },
      { key: 'D', text: 'Yapılandırılmış görüşme' },
      { key: 'E', text: 'Sosyal inceleme görüşmesi' },
    ],
    correctKey: 'D',
    explanation:
      'Soruların, soruların sorulma sırasının ve cevap seçeneklerinin/kodlarının görüşme öncesinde standart olarak belirlendiği ve esneklik tanınmayan görüşme türü "Yapılandırılmış görüşme"dir.',
    practicalTip: 'Sorular + Sorulma Sırası + Cevap Kodları önceden belli = YAPILANDIRILMIŞ GÖRÜŞME.',
  },
  {
    id: 68,
    pdfNumbers: 'Soru 67 (Sayfa 16)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Bireysel hikâyelerden ziyade belli bir grup ya da topluluğun belli bir konu üzerindeki davranışları ve davranışlarının arkasındaki nedenleri anlamaya çalışan görüşme türü aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Odak grup görüşmesi' },
      { key: 'B', text: 'Yarı-yapılandırılmış görüşme' },
      { key: 'C', text: 'Yapılandırılmamış görüşme' },
      { key: 'D', text: 'Yapılandırılmış görüşme' },
      { key: 'E', text: 'Sosyal inceleme görüşmesi' },
    ],
    correctKey: 'A',
    explanation:
      'Odak grup (focus group) görüşmesi, bireysel öykülerden çok belirli bir grup veya topluluğun ortak bir konu/sorun üzerindeki tutumlarını, davranışlarını ve bunların arkasındaki grup dinamiklerini/nedenleri anlamak amacıyla yapılır.',
    practicalTip: '"Bireysel hikâyelerden ziyade belli bir GRUP ya da TOPLULUĞUN..." = ODAK GRUP GÖRÜŞMESİ.',
  },
  {
    id: 69,
    pdfNumbers: 'Soru 68 (Sayfa 16)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question: 'Etiğe uygunluk ilkesinin temelinde yatan ölçüt aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Temel insan hakları' },
      { key: 'B', text: 'Toplumun beklentileri' },
      { key: 'C', text: 'Sosyal hizmet kuramları' },
      { key: 'D', text: 'Başvuranın kişilik özellikleri' },
      { key: 'E', text: 'Birlikte yaşama gerekliliği' },
    ],
    correctKey: 'A',
    explanation:
      'Sosyal hizmette etiğe uygunluk ilkesinin evrensel ve değişmez temel ölçütü "Temel insan hakları"dır.',
    practicalTip: 'Etiğe uygunluğun temel ölçütü = TEMEL İNSAN HAKLARI.',
  },
  {
    id: 70,
    pdfNumbers: 'Soru 69 (Sayfa 16)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Etik İlkeler & Profesyonel İlişki',
    question: 'Aşağıdakilerden hangisi başvuranı olduğu gibi kabul etmenin işlevlerinden biridir?',
    options: [
      { key: 'A', text: 'Başvuranın başka uzmana yönlendirilmesi' },
      { key: 'B', text: 'Başvuranın görüşmenin kontrolüne katılması' },
      { key: 'C', text: 'Başvuranın görüşme sürecinde tutulması' },
      { key: 'D', text: 'Başvuranın yargılanması' },
      { key: 'E', text: 'Başvuranın aktarım geliştirmesi' },
    ],
    correctKey: 'C',
    explanation:
      'Başvuranı yargılamadan, olduğu gibi kabul etmek (koşulsuz kabul); başvuranın kendisini güvende hissetmesini, direnç geliştirmemesini ve "görüşme sürecinde tutulmasını (süreci terk etmemesini)" sağlar.',
    practicalTip: 'Olduğu gibi kabul etmenin işlevi = BAŞVURANIN GÖRÜŞME SÜRECİNDE TUTULMASI.',
  },
  {
    id: 71,
    pdfNumbers: 'Soru 70 (Sayfa 16)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question:
      'Başvuranın profesyonel ilişki kapsamında olmayan duygu ve düşüncelerini görüşmeciye yönlendirmesi aşağıdakilerden hangisini betimler?',
    options: [
      { key: 'A', text: 'Yardım ilişkisi' },
      { key: 'B', text: 'Gerçek ilişki' },
      { key: 'C', text: 'Çalışma işbirliği' },
      { key: 'D', text: 'Karşıt aktarım' },
      { key: 'E', text: 'Aktarım' },
    ],
    correctKey: 'E',
    explanation:
      'Başvuranın geçmişindeki önemli kişilere (anne, baba, otorite figürü vb.) yönelik profesyonel ilişki dışı duygu ve düşüncelerini uzmana yönlendirmesine "Aktarım (Transference)" denir. Uzmanın başvurana yönlendirmesine ise "Karşıt aktarım" denir.',
    practicalTip: 'Başvuran -> Görüşmeciye yönlendirirse = AKTARIM | Görüşmeci -> Başvurana yönlendirirse = KARŞIT AKTARIM.',
  },
];

export const ALL_CATEGORIES: QuestionCategory[] = [
  'Görüşme Aşamaları & Süreç',
  'Görüşme Türleri & Teknikleri',
  'İletişim & Görüşme Becerileri',
  'Etik İlkeler & Profesyonel İlişki',
  'Kayıt Tutma & Raporlama',
  'Kuramlar & Yaklaşımlar',
];
