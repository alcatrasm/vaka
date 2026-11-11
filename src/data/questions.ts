export type OptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export type QuestionPart =
  | '1. Parça (1–25)'
  | '2. Parça (26–50)'
  | '3. Parça (51–70)';

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
  guideNumber: string;
  part: QuestionPart;
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
  guideNumber: string;
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
    guideNumber: 'Soru 15 (1. Parça)',
    firstOccurrence: 'PDF Soru 15 (Sayfa 4)',
    secondOccurrence: 'PDF Soru 20 (Sayfa 5)',
    questionSummary:
      'Başvuranın sorunlarını anlamak için kendisiyle ve çevresiyle görüşerek nesnel ve öznel bilgi toplayan sosyal hizmet görüşmesi hangisidir?',
    correctAnswerText: 'B) Sosyal inceleme görüşmesi',
  },
  {
    mergedQuestionId: 17,
    guideNumber: 'Soru 17 (1. Parça)',
    firstOccurrence: 'PDF Soru 17 (Sayfa 4)',
    secondOccurrence: 'PDF Soru 18 (Sayfa 4)',
    questionSummary:
      'Psikolojik ilke ve prosedürleri kullanarak başvuranın tutum ve davranışlarını değiştirmeyi amaçlayan görüşme hangisidir?',
    correctAnswerText: 'A) Tedavi görüşmesi',
  },
  {
    mergedQuestionId: 18,
    guideNumber: 'Soru 18 (1. Parça)',
    firstOccurrence: 'PDF Soru 19 (Sayfa 4-5)',
    secondOccurrence: 'PDF Soru 22 (Sayfa 5)',
    questionSummary:
      'Aşağıdakilerden hangisi görüşme tekniğinin zayıf yanlarından biri değildir?',
    correctAnswerText: 'E) Görüşme tekniği sadece yüz yüze gerçekleşir.',
  },
  {
    mergedQuestionId: 28,
    guideNumber: 'Soru 28 (2. Parça)',
    firstOccurrence: 'PDF Soru 31 (Sayfa 7)',
    secondOccurrence: 'PDF Soru 55 (Sayfa 14)',
    questionSummary:
      'Görüşmenin ilişki kurma aşamasında başvurulan değer veya becerilerden biri değildir?',
    correctAnswerText: 'C) Yüzleştirme',
  },
  {
    mergedQuestionId: 35,
    guideNumber: 'Soru 35 (2. Parça)',
    firstOccurrence: 'PDF Soru 39 (Sayfa 8-9)',
    secondOccurrence: 'PDF Soru 52 (Sayfa 13)',
    questionSummary:
      'Aşağıdakilerden hangisi kontrol görüşmelerinin en temel amacıdır?',
    correctAnswerText: 'C) Gerçekleşen değişimin seyrinin izlenmesi',
  },
  {
    mergedQuestionId: 42,
    guideNumber: 'Soru 42 (2. Parça)',
    firstOccurrence: 'PDF Soru 46 (Sayfa 10 - 1. Seri)',
    secondOccurrence: 'PDF Soru 47 (Sayfa 12 - 2. Seri)',
    questionSummary:
      'Doğru ve başarılı bir veri kaydı için dikkat edilmesi gerekenlerden biri değildir?',
    correctAnswerText: 'E) Yazılı görüşmeler yapılması',
  },
  {
    mergedQuestionId: 44,
    guideNumber: 'Soru 44 (2. Parça)',
    firstOccurrence: 'PDF Soru 48 (Sayfa 10-11 - 1. Seri)',
    secondOccurrence: 'PDF Soru 45 (Sayfa 12 - 2. Seri)',
    questionSummary:
      'Başvuranı daha iyi tanımak için ailesi, kardeşleri, okul ve iş yerindeki kişilerle yapılan görüşmeler sonucunda hangi rapor hazırlanır?',
    correctAnswerText: 'C) Sosyal inceleme raporu',
  },
  {
    mergedQuestionId: 47,
    guideNumber: 'Soru 47 (2. Parça)',
    firstOccurrence: 'PDF Soru 41 (Sayfa 11 - 2. Seri)',
    secondOccurrence: 'PDF Soru 46 (Sayfa 12 - 2. Seri)',
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
        term: 'Temel vs. Tamamlayıcı Aşamalar (Soru 23 & 24)',
        rule: 'Aktif görüşme aşamaları: Başlama, Değerlendirme, Sorun Çözme, Sonlandırma. Tamamlayıcı aşamalar: Hazırlık, Kayıt Tutma ve İzleme.',
        examTrap: '"Hangisi tamamlayıcı aşamadır?" sorusunda cevap B) Hazırlık. Tamamlayıcı aşamaları eklemenin gerekçeleri arasında "Yasal gerekçeler" yoktur!',
      },
      {
        term: 'Hazırlık ve Tanışma/Bağlantı Kurma (Soru 10, 12, 26, 28)',
        rule: 'Kişinin "Benim sorunum var ve çözmek için bir şeyler yapmam gerekir" diyerek farkındalık kazandığı aşama: B) Hazırlık. Görüşmenin gidişatını zihinde planlama: D) Düşünsel hazırlık. Tanışma/bağlantı kurma aşamasında müracaatçının neden yardım istediği, sorun ve gereksinimleri ele alınır (B şıkkı; mesleki ilişkide sempati değil empati esastır).',
        examTrap: 'İlişki kurma aşamasında YÜZLEŞTİRME (C şıkkı) asla yapılmaz! Yüzleştirme güven kurulduktan sonra ileri aşamalarda kullanılır.',
      },
      {
        term: 'Ön Değerlendirme ve Planlama (Soru 6, 7, 14, 21, 30)',
        rule: 'İlk oturumlarda bilgi toplamak için yapılan değerlendirme: B) Aşama olarak değerlendirme. Ön değerlendirmede I. Gerçeklerin aslını öğrenme, II. Anlamlarını düşünme, III. Yardım yöntemlerine karar verme (E - Hepsi) yer alır. Planlama basamağının son alt basamağı: D) Sözleşme hazırlama.',
        examTrap: 'Planlama aşamasında "C) Ön görüşmenin yapılması" yer almaz. Değerlendirme aşamasında ise "E) Değişim planını uygulamaya koyma" yer almaz.',
      },
      {
        term: 'Sorun Çözme, Sonlandırma, Genel Değerlendirme ve İzleme (Soru 2, 3, 52, 54)',
        rule: 'Sorun çözme aşamasında plan uygulanır, sonuçlar değerlendirilir ve değişim sürekli kılınır; ancak "D) Bilgi toplama" değerlendirme aşamasındadır. Görüşme sonlandırılıp genel değerlendirme yapıldıktan sonraki aşama: C) İzleme aşamasıdır.',
        examTrap: 'Sonlandırma aşaması "C) Müracaatçı duygu ve davranışları arasında ikilem yaşandığında yapılabilir" ifadesi YANLIŞTIR.',
      },
    ],
    mnemonic:
      'ŞİFRE: Tamamlayıcı Aşama = Hazırlık | Planlama Sonu = Sözleşme Hazırlama | Genel Değerlendirme Sonrası = İzleme | Tanışmada = Sorun ve gereksinimler ele alınır.',
  },
  {
    id: 'gorusme-turleri',
    title: '2. Görüşme Türleri, Amaçları ve Sohbetten Farkı',
    category: 'Görüşme Türleri & Teknikleri',
    readingTime: '3 dk',
    keyTakeaways: [
      {
        term: 'Sosyal İnceleme vs. Tedavi Görüşmesi (Soru 15 & 17 — Banko!)',
        rule: 'Başvuranla ve çevresiyle görüşerek nesnel ve öznel bilgi toplayan: B) Sosyal inceleme görüşmesi. Psikolojik ilke ve prosedürleri kullanarak tutum ve davranışları değiştirmeyi amaçlayan: A) Tedavi görüşmesi.',
        examTrap: 'Bilgi toplama + çevre/aile = Sosyal İnceleme. Tutum ve davranış değiştirme = Tedavi Görüşmesi.',
      },
      {
        term: 'Yapılandırılmış, Odak Grup, Kontrol ve Yazılı Görüşme (Soru 35, 40, 67-A, 67-B)',
        rule: 'Soruların, sırasının ve cevap kodlarının önceden belirlendiği: D) Yapılandırılmış görüşme. Bireysel hikâyeden ziyade bir grup/topluluğun davranış nedenlerini anlamaya çalışan: A) Odak grup görüşmesi. Gerçekleşen değişimin seyrini izleyen: C) Kontrol görüşmesi. Mektup, faks, ağ postası/yazışması: D) Yazılı görüşme.',
        examTrap: 'Enformel görüşme ortamı: C) Evler (Okul, hastane, halk merkezi, evlat edinme merkezi resmî/formeldir).',
      },
      {
        term: 'Görüşme vs. Sohbet Farkı (Soru 9, 51, 65)',
        rule: 'Görüşmenin bilinçli olarak tespit edilen bir amacı vardır (E), mesleki normlarla hareket edilir, hesap verme yükümlülüğü vardır.',
        examTrap: '"C) Görüşme ve sohbet aynı kavramlardır" ve "E) Görüşmede iletişim kalıpları gayri resmidir" ifadeleri YANLIŞTIR.',
      },
      {
        term: 'Zayıf Yanlar, Katılım ve Uygun Aday Olmama (Soru 18, 32, 37, 55, 66)',
        rule: '"E) Görüşme tekniği sadece yüz yüze gerçekleşir" ifadesi yanlıştır. Başvuranın yakınması sosyal hizmet alanının dışında kaldığında (D) uygun aday değildir. Görüşme başarısının en düşük olduğu durum: C) Kişisel tercih olarak görüşmeyi reddetme.',
        examTrap: 'Sosyal çalışmacılar görüşmeyi "A) Klinik ve analitik yöntemin bir parçası olarak" kullanmaz (psikanaliz alanıdır). Ayrıca "A) Sadece başvuranla görüşerek fikir sahibi olmak" yanlıştır.',
      },
    ],
    mnemonic:
      'ŞİFRE: Çevreyle bilgi toplama = Sosyal İnceleme | Tutum değiştirme = Tedavi | Değişim seyrini takip = Kontrol | Önceden kodlu soru = Yapılandırılmış | Topluluk davranışı = Odak Grup.',
  },
  {
    id: 'iletisim-becerileri',
    title: '3. İletişim İlkeleri, Gürültü ve Görüşme Becerileri',
    category: 'İletişim & Görüşme Becerileri',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'İletişim İlkeleri, İleti ve Sözsüz İletişim (Soru 4, 5, 8)',
        rule: 'İletişim durağan değil DİNAMİKTİR ("C) İletişim durağan bir olgudur" yanlıştır). Kaynak tarafından kodlanmış bilgi/duygu/düşünce: C) İleti. Sözsüz iletişim kanalı olmayan: C) Dil (sözlü iletişimdir).',
        examTrap: 'Jestler, ses tonu, göz iletişimi ve mekân sözsüz iletişimdir; Dil sözlüdür.',
      },
      {
        term: 'Psikolojik Gürültü ve İletişimsel Azınlık (Soru 11, 39)',
        rule: 'Üzüntü, heyecan, önyargı ve sevinç psikolojik gürültüdür; D) Yorgunluk ise fizyolojik gürültüdür. "İletişimsel azınlık" örneği: A) ABD\'de yaşayan işitme engelliler.',
        examTrap: 'Yorgunluk psikolojik değil fizyolojik bir etkendir.',
      },
      {
        term: 'Görüşme Becerileri, Etkin Dinleme ve Yüzleştirme (Soru 20, 27, 31, 33, 57)',
        rule: 'A) İçe dönüklük bir görüşme becerisi değil kişilik özelliğidir. Beceri kullanımında en az etkili özellik: E) Fiziksel görüntü. Açık uçlu soru: D) Bu konudaki düşünceleriniz nelerdir? Etkin dinleyici konuşurken tavsiyelerde bulunmaz (A).',
        examTrap: 'Yüzleştirme tekniği "E) Görüşme sürecinin tüm aşamalarına yayılması" koşulunu içermez.',
      },
      {
        term: 'Aktarım ve Karşıt Aktarım (Soru 70)',
        rule: 'Başvuranın profesyonel ilişki kapsamında olmayan duygu ve düşüncelerini görüşmeciye yönlendirmesi: E) Aktarım.',
        examTrap: 'Başvuran -> Görüşmeciye yöneltirse Aktarım; Görüşmeci -> Başvurana yansıtırsa Karşıt Aktarım.',
      },
    ],
    mnemonic:
      'ŞİFRE: Kodlanmış mesaj = İleti | Fizyolojik gürültü = Yorgunluk | En az etkili = Fiziksel görüntü | Başvuranın duygu yöneltmesi = Aktarım.',
  },
  {
    id: 'etik-ilkeler',
    title: '4. Etik İlkeler, Değerler ve Profesyonel İlişki',
    category: 'Etik İlkeler & Profesyonel İlişki',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'Etiğin Konusu, Ölçütü ve Çocuk Yaşı (Soru 25, 29, 49, 68)',
        rule: 'Etiğin konusu: A) Ahlak. Etiğe uygunluk ilkesinin temel ölçütü: A) Temel insan hakları. İHEB 2. Maddesi: D) Farklılıklara duyarlılık. BM Çocuk Hakları Sözleşmesi çocuk üst yaş sınırı: A) 18.',
        examTrap: 'Bilgilendirilmiş onay (Soru 13): A) Başvuranın çalışmanın doğasını bilerek görüşmeyi kabul etmesidir.',
      },
      {
        term: 'Etik İlkeler ve Etik Hiyerarşi (Soru 63, 64)',
        rule: 'Etik hiyerarşide en öncelikli ilke insan yaşamını korumaktır; şıklar arasında en sonda gelen: A) Gizlilik-mahremiyet. İyi bir ilişki geliştirmek için gözetilecek etik ilkeler arasında yer almayan: D) Görüşmenin prosedürlerini açıklamak (bu bilgilendirilmiş onay sürecine aittir).',
        examTrap: 'Soru 63\'te saygı, yansızlık, ayrımcılık yapmama ve veri toplama sınırları etik ilkedir; "D) Görüşmenin prosedürlerini açıklamak" bilgilendirilmiş onay işlemidir.',
      },
      {
        term: 'Profesyonel İlişki ve Kabul Etme (Soru 1, 22, 62, 69)',
        rule: 'Profesyonel ilişkinin en önemli yararı: C) Başvuranda güven duygusu oluşması. Olumlu ilişki kuran görüşmeci sıfatı: A) Tutarlı. Başvuranı olduğu gibi kabul etmenin işlevi: C) Başvuranın görüşme sürecinde tutulması.',
        examTrap: 'İlk görüşmede danışanla "D) otoriter ve mesafeli bir ilişki kurmaya özen gösterilmelidir" ifadesi yanlıştır.',
      },
    ],
    mnemonic:
      'ŞİFRE: Etiğin Konusu = Ahlak | Ölçütü = Temel İnsan Hakları | Hiyerarşi Sonu = Gizlilik-Mahremiyet | İlişki Etiğinde Olmayan = Prosedürleri Açıklamak.',
  },
  {
    id: 'kayit-raporlama',
    title: '5. Veri Kaydı, Kayıt Hataları ve Rapor Türleri',
    category: 'Kayıt Tutma & Raporlama',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'Kayıt Yöntemleri, Faktörler ve Gözlem (Soru 36, 38, 42, 53, 56, 60)',
        rule: 'Verilerin kaydedilme şeklini etkileyen faktörlerden olmayan: D) Görüşmecinin tutumu. Not alma: D) Görüşme sürecini uzatabilmektedir. Gözlemleri canlandırabilen yöntem: C) Cihazda kayıt (ses ve görüntü kaydı). Cihazla kayıt kullanılmayan: B) Ağ yazışması.',
        examTrap: 'Gözlem verileri "D) Görüşülenden tam ve spesifik cevapların alınamadığı durumlarda" çok önemli hâle gelir. Başarılı veri kaydı için "E) Yazılı görüşmeler yapılması" şart değildir.',
      },
      {
        term: 'Kayıt Hataları ve Rapor Türleri (Soru 44, 46, 47, 50)',
        rule: 'Olayların sırasını veya aralarındaki bağlantıları hatırlayamama: C) Yerini değiştirme hatası. Aile, kardeş, okul ve iş yeriyle görüşülerek hazırlanan: C) Sosyal inceleme raporu. Kurum dosyaları için düzenli ve sistematik sunum: B) Görüşme raporu.',
        examTrap: '"A) Görüşme raporu, sorun çözücü fonksiyona sahiptir" ifadesi yanlıştır (rapor tek başına sorun çözmez, yol göstericidir).',
      },
    ],
    mnemonic:
      'ŞİFRE: Kayıt Şeklini Etkilemeyen = Görüşmecinin Tutumu | Gözlemi Canlandıran = Cihazda Kayıt | Sıra/Bağlantı Hatası = Yerini Değiştirme Hatası.',
  },
  {
    id: 'kuramlar-yaklasimlar',
    title: '6. Kuramlar: Sistem, Görev Merkezli, Problem Çözme ve Egan',
    category: 'Kuramlar & Yaklaşımlar',
    readingTime: '2.5 dk',
    keyTakeaways: [
      {
        term: 'Sistem Yaklaşımı İlkeleri (Soru 34, 41, 43)',
        rule: 'Parçalar arasındaki etkileşimin de en az sistemin kendisi kadar önemli olduğunu ileri süren ilke: A) İlişki ilkesi. Aile içindeki bireylerden birinin paylaşımcı davranmaması: A) Güçlük. Sistem yaklaşımının katkısı olmayan: C) Görüşmenin sonlanmasını sağlar.',
        examTrap: 'Soru 43\'te "parçalar arasındaki etkileşim" sorulduğunda ders kaynağındaki doğru cevap A) İlişki ilkesidir!',
      },
      {
        term: 'Görev-Merkezli Vaka Çalışması & Teorik Bütünlük (Soru 16, 19, 45, 48)',
        rule: 'Görev-merkezli vaka çalışmasında I, II, III ve IV numaralı sorunların tamamı (E) değerlendirmeye alınır. Meslek elemanının mevcut teorik bilgisi ve alan pratiğini birlikte yürütmesi: E) Teorik bütünlük. Foucault\'nun azınlık ölçütlerinde olmayan: C) İstatistiksel olarak az sayıda olma.',
        examTrap: 'Soru 48\'de teorik bilgi ve alan pratiğini birlikte yürütme = E) Teorik bütünlük!',
      },
      {
        term: 'Problem Çözme Yaklaşımı ve Gerard Egan Modeli (Soru 58, 59)',
        rule: 'Problem çözme yaklaşımında problem tanımlamayı izleyen aşama: B) Alternatif çözüm önerilerinin geliştirilmesi. Gerard Egan\'ın "danışanların öykülerini anlatmalarına yardım etmek" (1. aşama) görevi: A) Danışanların fark yaratacak konular üzerinde çalışmalarını sağlamak.',
        examTrap: 'Egan\'da gelecek olasılıklarını keşfetmek ve amaca bağlanmak 2. aşama; strateji seçmek ve eyleme geçmek 3. aşamadır.',
      },
    ],
    mnemonic:
      'ŞİFRE: Parça Etkileşimi = İlişki İlkesi | Birey Paylaşmıyorsa = Güçlük | Teori + Pratik = Teorik Bütünlük | Egan Öykü Aşaması = Fark yaratacak konular.',
  },
];

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    guideNumber: 'Soru 1',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 1 (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Görüşme sürecinde yapılması gerekenler ile ilgili aşağıdaki önerilerden hangisi yanlıştır?',
    options: [
      { key: 'A', text: 'İlk görüşmede danışan ile pozitif bir ilişkinin temelleri atılmalıdır.' },
      {
        key: 'B',
        text: 'Görüşmede danışanın tıbbi, psikolojik, sosyal geçmişine ve durumuna ilişkin bilgi alınmalıdır.',
      },
      {
        key: 'C',
        text: 'İlk görüşmenin başında danışana görüşme süreci ile ilgili bilgiler verilmelidir.',
      },
      {
        key: 'D',
        text: 'Görüşme sürecinin başarıya ulaşması için danışanla otoriter ve mesafeli bir ilişki kurmaya özen gösterilmelidir.',
      },
      {
        key: 'E',
        text: 'Görüşmede danışanın kontrol sağlayabileceği rahat ve güvenli bir ortam oluşturulmalıdır.',
      },
    ],
    correctKey: 'D',
    explanation:
      'Sosyal hizmet görüşmesinde danışanla güvene ve saygıya dayalı ilişki kurulmalıdır. Otoriter ve mesafeli davranmak danışanın kendini rahatça ifade etmesini zorlaştırır.',
    practicalTip:
      'Şıklarda "otoriter", "kontrolcü", "egoist" veya "sabit fikirli" kelimelerini görürseniz sosyal hizmet görüşmesi için her zaman YANLIŞ ifadedir.',
  },
  {
    id: 2,
    guideNumber: 'Soru 2',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 2 (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question:
      'Sosyal hizmet görüşmesinin sonlandırma aşaması ile ilgili olarak aşağıdakilerden hangisi yanlıştır?',
    options: [
      { key: 'A', text: 'Sosyal hizmet literatüründe neredeyse ihmal edilmiştir.' },
      { key: 'B', text: 'Terapötik sürecin önemli bir yönüdür.' },
      {
        key: 'C',
        text: 'Müracaatçı duygu ve davranışları arasında ikilem yaşandığında yapılabilir.',
      },
      { key: 'D', text: 'Müracaatçıda kendine güven duygusu geliştiği zaman yapılabilir.' },
      {
        key: 'E',
        text: 'Müracaatçı sorunlarını tek başına aşabilecek seviyeye geldiği zaman yapılabilir.',
      },
    ],
    correctKey: 'C',
    explanation:
      'Sonlandırma, genellikle hedeflere ulaşıldığında ve müracaatçı sorunlarıyla baş edebilir duruma geldiğinde yapılır. Duygu ve davranışlarındaki ikilem tek başına görüşmeyi bitirme nedeni değildir (aksine yüzleştirme/müdahale gerektirir).',
    practicalTip:
      'Duygu ve davranış arasında ikilem varsa SONLANDIRMA yapılmaz; sonlandırma özgüven geliştiğinde ve sorunları tek başına aşabildiğinde yapılır.',
  },
  {
    id: 3,
    guideNumber: 'Soru 3',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 3 [1. diye numaralanmış] (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    prefaceList: [
      'I. Müracaatçının destek kaynaklarına gereksiniminin olup olmadığı',
      'II. Müdahale sürecinde elde ettiği becerileri kullanıp kullanmadığı',
      'III. Sosyal olarak istenen davranışları sürdürmeye yardımcı aktivitelerin yapılıp yapılmadığı',
      'IV. Müdahale sırasında elde ettiği gelişmeyi sürdürüp sürdürmediği',
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
      'İzleme görüşmesinde müracaatçının gelişimini koruyup korumadığı, yeni becerilerini kullanıp kullanmadığı ve ek desteğe ihtiyaç duyup duymadığı kontrol edilir. Dört madde de bu kapsamdadır.',
    practicalTip:
      'İzleme görüşmesi = "Kazanımlar devam ediyor mu + ek destek lazım mı?" Dört öncülün tamamı (I, II, III ve IV) doğrudur.',
  },
  {
    id: 4,
    guideNumber: 'Soru 4',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 4 (Sayfa 1)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question: 'Aşağıdakilerden hangisi iletişim ilkelerinden biri değildir?',
    options: [
      { key: 'A', text: 'İletişim karmaşık bir süreçtir.' },
      { key: 'B', text: 'İletişimin niceliği niteliğini artırmaz.' },
      { key: 'C', text: 'İletişim durağan bir olgudur.' },
      { key: 'D', text: 'İletişim kaçınılmazdır.' },
      { key: 'E', text: 'İletişim tekrar edilemez.' },
    ],
    correctKey: 'C',
    explanation:
      'İletişim durağan değil, sürekli değişen ve gelişen dinamik bir süreçtir. Bu nedenle C seçeneği yanlıştır.',
    practicalTip:
      'İletişim DURAĞAN DEĞİL, DİNAMİKTİR! İletişim ilkeleri sorusunda "durağan" kelimesini gördüğünüz anda işaretleyin.',
  },
  {
    id: 5,
    guideNumber: 'Soru 5',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 5 (Sayfa 2)',
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
      'Jestler, göz teması, ses tonu ve kişiler arasındaki mesafe (mekân) sözsüz iletişime girer. Dil ise sözcüklerle kurulan sözlü iletişimin temel aracıdır.',
    practicalTip:
      'Ses tonu, jest, göz teması ve mekân sözsüz iletişimdir; DİL ise sözlü iletişimdir.',
  },
  {
    id: 6,
    guideNumber: 'Soru 6',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 6 (Sayfa 2)',
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
      'Ön değerlendirmede önce bilgiler öğrenilir, ardından anlamlandırılır ve uygun yardım yöntemine karar verilir. Üçü de gereklidir.',
    practicalTip:
      'Testteki Romen rakamlı (I, II, III) öncüllü 3 sorunun (Soru 3, Soru 6, Soru 16) tamamında cevap E (Hepsi) şıkkıdır!',
  },
  {
    id: 7,
    guideNumber: 'Soru 7',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 7 (Sayfa 2)',
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
      'Planlama sırasında sorunlar, hedefler ve yapılacak çalışmalar belirlenir. Son aşamada bunlar sözleşmeyle açık hâle getirilir.',
    practicalTip:
      'Planlama basamağının son alt basamağı = D) SÖZLEŞME HAZIRLAMA.',
  },
  {
    id: 8,
    guideNumber: 'Soru 8',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 8 (Sayfa 2)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'İletişim & Görüşme Becerileri',
    question:
      'Bir bilginin, duygunun ya da düşüncenin kaynak tarafından kodlanmış hâli aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Hedef' },
      { key: 'B', text: 'Kanal' },
      { key: 'C', text: 'İleti' },
      { key: 'D', text: 'Geri bildirim' },
      { key: 'E', text: 'Kod açma' },
    ],
    correctKey: 'C',
    explanation:
      'İleti, kaynağın karşı tarafa aktarmak istediği mesajdır. Örneğin bir kişinin söylediği söz, ileti niteliğindedir.',
    practicalTip:
      'Kaynak tarafından kodlanmış bilgi/duygu/düşünce = C) İLETİ (Mesaj).',
  },
  {
    id: 9,
    guideNumber: 'Soru 9',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 9 (Sayfa 2)',
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
      'Görüşme belirli bir amaç ve plan doğrultusunda yapılır. Sohbet ise günlük, daha serbest bir iletişimdir. Aynı kavram değildirler.',
    practicalTip:
      'Görüşme ≠ Sohbet! "Görüşme ve sohbet aynı kavramlardır" ifadesi kesinlikle yanlıştır.',
  },
  {
    id: 10,
    guideNumber: 'Soru 10',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 10 (Sayfa 3)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Görüşme Aşamaları & Süreç',
    question: 'Aşağıdakilerden hangisi tanışma / bağlantı kurma aşamasında yapılır?',
    options: [
      { key: 'A', text: 'Çözümler uygulanır.' },
      { key: 'B', text: 'Sorun ve gereksinimler ele alınır.' },
      { key: 'C', text: 'Müracaatçı yaşadığı durumla ilgili olarak yargılanır.' },
      { key: 'D', text: 'Çözüme ilişkin davranışlar ele alınır.' },
      { key: 'E', text: 'Sempatik ilişki kurulur.' },
    ],
    correctKey: 'B',
    explanation:
      'Tanışma aşamasında müracaatçının neden yardım istediği ve gereksinimleri anlaşılmaya başlanır. Çözümlerin uygulanması daha sonraki aşamalardadır. Ayrıca mesleki ilişkide sempati değil, empati esastır (Not: İşaretli öğrenci PDF\'inde E şıkkı boyanmış olsa da mesleki literatürde sempatik değil empatik ilişki kurulduğu için doğru cevap B şıkkıdır).',
    practicalTip:
      'Mesleki ilişkide SEMPATİ değil EMPATİ vardır! Tanışma/bağlantı kurma aşamasında müracaatçının başvuru nedeni olan "B) Sorun ve gereksinimler ele alınır".',
  },
  {
    id: 11,
    guideNumber: 'Soru 11',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 11 (Sayfa 3)',
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
      'Üzüntü, heyecan, önyargı ve sevinç psikolojik durumlardır. Yorgunluk ise temel olarak fizyolojik bir etkendir.',
    practicalTip:
      'Yorgunluk = Fizyolojik gürültü kaynağıdır, psikolojik değildir!',
  },
  {
    id: 12,
    guideNumber: 'Soru 12',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 12 (Sayfa 3)',
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
      'Hazırlık aşamasında kişi sorununun farkına varır ve çözüm için harekete geçmesi gerektiğini düşünmeye başlar.',
    practicalTip:
      '"Benim sorunum var ve bir şeyler yapmam gerekir" diyerek farkındalık kazanma = B) HAZIRLIK aşaması.',
  },
  {
    id: 13,
    guideNumber: 'Soru 13',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 13 (Sayfa 3)',
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
      'Bilgilendirilmiş onay, kişinin görüşmenin amacı, yöntemi, yararları, riskleri ve hakları (yani çalışmanın doğası) hakkında bilgi sahibi olduktan sonra katılmayı kabul etmesidir.',
    practicalTip:
      'Bilgilendirilmiş onay = "Başvuranın çalışmanın DOĞASINI bilerek görüşmeyi kabul etmesidir" (A).',
  },
  {
    id: 14,
    guideNumber: 'Soru 14',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 14 (Sayfa 3)',
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
      'Ön görüşme, planlamadan önceki tanışma ve bilgi edinme sürecinde gerçekleştirilir. Planlama aşamasında ise hedefler, öncelikler ve çalışma takvimi belirlenir.',
    practicalTip:
      'Planlama aşamasında "C) Ön görüşmenin yapılması" yer almaz (Ön görüşme en başta yapılır).',
  },
  {
    id: 15,
    guideNumber: 'Soru 15',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 15 & Soru 20 (Sayfa 4 & 5)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 15 ve Soru 20 olarak birebir aynı şekilde 2 kez yer almıştır.',
    category: 'Görüşme Türleri & Teknikleri',
    question:
      'Başvuranın sorunlarını anlamaya ve sorunlar hakkında başvuranla, çevresiyle görüşerek nesnel ve subjektif bilgi toplayan sosyal hizmet görüşmesi aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Odak grup görüşmesi' },
      { key: 'B', text: 'Sosyal inceleme görüşmesi' },
      { key: 'C', text: 'Teşhis görüşmesi' },
      { key: 'D', text: 'Yapılandırılmış görüşme' },
      { key: 'E', text: 'Tedavi görüşmesi' },
    ],
    correctKey: 'B',
    explanation:
      'Sosyal inceleme görüşmesinde başvuranın ailesi, çevresi, yaşam koşulları ve sorunları hakkında bilgi toplanarak durumu bütüncül biçimde anlaşılır.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): "Başvuranla ve ÇEVRESİYLE görüşerek nesnel ve subjektif BİLGİ TOPLAYAN" = B) SOSYAL İNCELEME GÖRÜŞMESİ.',
  },
  {
    id: 16,
    guideNumber: 'Soru 16',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 16 (Sayfa 4)',
    isDuplicateInPdf: false,
    duplicateCount: 1,
    category: 'Kuramlar & Yaklaşımlar',
    prefaceList: [
      'I. Rol ve sorumluluklara ilişkin sorunlar',
      'II. Karar sorunları',
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
      'Görev-merkezli yaklaşım, müracaatçının günlük yaşamında karşılaştığı farklı sorunlara yönelik somut görevler ve çözümler geliştirmeyi amaçlar. Dört sorun grubu da bu yöntemde ele alınabilir.',
    practicalTip:
      'Görev-merkezli vaka çalışması sorusunda 4 öncülün tamamı (E: I, II, III ve IV) değerlendirmeye alınır.',
  },
  {
    id: 17,
    guideNumber: 'Soru 17',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 17 & Soru 18 (Sayfa 4)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 17 ve Soru 18 olarak alt alta birebir aynı şekilde 2 kez yer almıştır.',
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
      'Tedavi görüşmesi, kişinin tutum ve davranışlarında olumlu değişim oluşturmayı amaçlar. Bilgi toplamanın ötesinde değişime odaklanır.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): "Psikolojik ilke ve prosedürlerle TUTUM VE DAVRANIŞLARIN DEĞİŞTİRİLMESİ" = A) TEDAVİ GÖRÜŞMESİ.',
  },
  {
    id: 18,
    guideNumber: 'Soru 18',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 19 & Soru 22 (Sayfa 4-5)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 19 ve Soru 22 olarak birebir aynı şekilde 2 kez yer almıştır.',
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
      'Görüşmeler yalnızca yüz yüze yapılmaz; telefonla veya çevrim içi olarak da gerçekleştirilebilir. Bu nedenle E ifadesi doğru değildir.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): "E) Görüşme tekniği sadece yüz yüze gerçekleşir" ifadesi yanlıştır.',
  },
  {
    id: 19,
    guideNumber: 'Soru 19',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 21 (Sayfa 5)',
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
      'Bu üç yöntem yalnızca görüşmeyle sınırlı değildir. Gözlem, değerlendirme ve çeşitli müdahale tekniklerinden de yararlanabilirler.',
    practicalTip:
      '"Üç yöntem de YALNIZCA görüşme tekniğini kullanır" (B) ifadesi yanlıştır.',
  },
  {
    id: 20,
    guideNumber: 'Soru 20',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 23 (Sayfa 5-6)',
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
      'Açık uçlu sorular kişiye ayrıntılı cevap verme fırsatı sunar. "Düşünceleriniz nelerdir?" sorusu tek kelimelik cevapla sınırlandırılmaz.',
    practicalTip:
      'Açık uçlu soru örneği = D) "Bu konudaki düşünceleriniz nelerdir?"',
  },
  {
    id: 21,
    guideNumber: 'Soru 21',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 24 (Sayfa 6)',
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
      'İlk oturumlarda belirli bir evre içinde yoğunlaşan değerlendirmeye "aşama olarak değerlendirme" denir. Süreç olarak değerlendirme ise görüşme boyunca devam eder.',
    practicalTip:
      'İlk oturumlarda bilgi toplamak amacıyla yapılan = B) AŞAMA OLARAK DEĞERLENDİRME.',
  },
  {
    id: 22,
    guideNumber: 'Soru 22',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 25 (Sayfa 6)',
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
      'Güven duygusu oluştuğunda başvuran kendisini daha rahat ifade eder. Bu durum sorunların anlaşılmasını ve yardım sürecinin etkili olmasını sağlar.',
    practicalTip:
      'Profesyonel ilişkinin en önemli yararı = C) BAŞVURANDA GÜVEN DUYGUSU OLUŞMASI.',
  },
  {
    id: 23,
    guideNumber: 'Soru 23',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 26 (Sayfa 6)',
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
      'Hazırlık, görüşme başlamadan önce gerçekleştirilen tamamlayıcı aşamadır. Başlama, değerlendirme, sorun çözme ve sonlandırma ise aktif görüşme aşamalarıdır.',
    practicalTip:
      'Tamamlayıcı aşamalar: B) HAZIRLIK (साथında Kayıt tutma ve İzleme). Diğer 4 şık aktif/temel aşamadır.',
  },
  {
    id: 24,
    guideNumber: 'Soru 24',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 27 (Sayfa 6)',
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
      'Tamamlayıcı aşamaların eklenmesinin temel nedeni görüşmeyi hazırlığı ve sonrasıyla birlikte bütüncül değerlendirmektir. Burada temel gerekçe yasal zorunluluk değildir.',
    practicalTip:
      'Tamamlayıcı aşamaları eklemenin gerekçesi olmayan = B) YASAL GEREKÇELER.',
  },
  {
    id: 25,
    guideNumber: 'Soru 25',
    part: '1. Parça (1–25)',
    pdfNumbers: 'PDF Soru 28 (Sayfa 7)',
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
      'Bildirgenin 2. maddesi, herkesin ayrımcılığa uğramadan insan haklarından yararlanmasını esas alır. Bu nedenle insanların farklılıklarına saygı gösterilmelidir.',
    practicalTip:
      'İHEB Madde 2 (Ayrımcılık Yasağı) = D) FARKLILIKLARA DUYARLILIK.',
  },
  {
    id: 26,
    guideNumber: 'Soru 26',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 29 (Sayfa 7)',
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
      'Düşünsel hazırlık, görüşmenin nasıl ilerleyeceğinin zihinde planlanmasıdır. Diğer seçenekler fiziksel ortamın hazırlanmasıyla ilgilidir.',
    practicalTip:
      'Düşünsel hazırlık = D) ZİHİNSEL PLANLAMA (Diğer 4 şık fiziksel oda hazırlığıdır).',
  },
  {
    id: 27,
    guideNumber: 'Soru 27',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 30 (Sayfa 7)',
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
      'Somutluk, yapılandırma, kendini açma ve teşvik etme görüşmede kullanılan becerilerdir. İçe dönüklük ise bir kişilik özelliğidir.',
    practicalTip:
      'A) İÇE DÖNÜKLÜK bir görüşme becerisi değil, kişilik özelliğidir.',
  },
  {
    id: 28,
    guideNumber: 'Soru 28',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 31 & Soru 55 (Sayfa 7 & 14)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 31 ve Soru 55 olarak birebir aynı şekilde 2 kez yer almıştır.',
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
      'İlişki kurma aşamasında güven, empati ve kabul ön plandadır. Yüzleştirme ise tutarsızlıkları fark ettirmek amacıyla daha sonraki aşamalarda kullanılan bir tekniktir.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): İlişki kurma aşamasında C) YÜZLEŞTİRME yapılmaz!',
  },
  {
    id: 29,
    guideNumber: 'Soru 29',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 32 (Sayfa 7)',
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
      'Etik, ahlaki davranışları ve doğru-yanlış ayrımını inceleyen felsefe alanıdır. Bu nedenle etiğin temel konusu ahlaktır.',
    practicalTip: 'Etiğin konusu = A) AHLAK.',
  },
  {
    id: 30,
    guideNumber: 'Soru 30',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 33 (Sayfa 7-8)',
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
      'Değerlendirme aşamasında sorun anlaşılır ve çözüm için hazırlık yapılır. Değişim planının uygulanması ise sorun çözme aşamasının görevidir.',
    practicalTip:
      'Değerlendirme aşamasında "E) Değişim planını uygulamaya koyma" yer almaz (Sorun çözme aşamasının görevidir).',
  },
  {
    id: 31,
    guideNumber: 'Soru 31',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 34 (Sayfa 8)',
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
      'Başarılı bir görüşmede esneklik, kendini tanıma ve kişilik özellikleri önemlidir. Fiziksel görüntü bunlara göre daha az belirleyicidir.',
    practicalTip:
      'Görüşme becerileri üzerinde EN AZ etkili olan = E) FİZİKSEL GÖRÜNTÜ.',
  },
  {
    id: 32,
    guideNumber: 'Soru 32',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 36 [35 atlanmış] (Sayfa 8)',
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
      'Başvuranın sorunu sosyal hizmet uzmanının çalışma alanı dışında kalıyorsa uygun uzmana yönlendirilmesi gerekir.',
    practicalTip:
      'Yakınma sosyal hizmet alanının DIŞINDA kaldığında (D) başvuran görüşme için uygun aday değildir.',
  },
  {
    id: 33,
    guideNumber: 'Soru 33',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 37 (Sayfa 8)',
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
      'Yüzleştirme her zaman yapılmaz. Gerektiğinde, uygun zamanda ve güven ilişkisi kurulduktan sonra uygulanmalıdır.',
    practicalTip:
      'Yüzleştirme görüşmenin tüm aşamalarına YAYILMAZ (E).',
  },
  {
    id: 34,
    guideNumber: 'Soru 34',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 38 (Sayfa 8)',
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
      'Güçlük, günlük yaşamda karşılaşılan bir zorlanma veya engeldir. Ailede bir kişinin paylaşımcı davranmaması bu tür bir ilişki güçlüğüne örnektir.',
    practicalTip:
      'Ailedeki bireylerden birinin paylaşımcı davranmaması = A) GÜÇLÜK.',
  },
  {
    id: 35,
    guideNumber: 'Soru 35',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 39 & Soru 52 (Sayfa 8-9 & 13)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Soru 39 ve Soru 52 olarak birebir aynı şekilde 2 kez yer almıştır.',
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
      'Kontrol görüşmesinde daha önce sağlanan olumlu değişimin devam edip etmediği takip edilir.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): Kontrol görüşmesinin en temel amacı = C) GERÇEKLEŞEN DEĞİŞİMİN SEYRİNİN İZLENMESİ.',
  },
  {
    id: 36,
    guideNumber: 'Soru 36',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 40 [1. Seri] (Sayfa 9)',
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
    correctKey: 'D',
    explanation:
      'Kayıt yöntemini görüşmenin türü, konusu, yapılış biçimi ve görüşülen kişinin özellikleri etkiler. Görüşmecinin tutumu burada kayıt yöntemini belirleyen temel faktörler arasında sayılmaz.',
    practicalTip:
      'Kayıt şeklini etkileyen faktörler: Türü, Yapılış şekli, Konusu, Görüşülen bireyin tutumu. Etkilemeyen = D) GÖRÜŞMECİNİN TUTUMU.',
  },
  {
    id: 37,
    guideNumber: 'Soru 37',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 41 [1. Seri] (Sayfa 9)',
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
      'Kişi görüşmeye katılmayı reddediyorsa işbirliği kurmak zorlaşır. Gönüllü katılım ise genellikle görüşmenin başarısını artırır.',
    practicalTip:
      'Görüşme başarısının en düşük olduğu durum = C) KİŞİSEL TERCİH OLARAK GÖRÜŞMEYİ REDDETME.',
  },
  {
    id: 38,
    guideNumber: 'Soru 38',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 42 [1. Seri] (Sayfa 9)',
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
      'Görüşme sırasında not yazmak zaman alabilir ve konuşmanın akışını yavaşlatabilir. Bu yüzden görüşme süresi uzayabilir.',
    practicalTip:
      'Not alma yöntemi için doğru ifade = D) Not alma, görüşme sürecini uzatabilmektedir.',
  },
  {
    id: 39,
    guideNumber: 'Soru 39',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 43 [1. Seri] (Sayfa 9)',
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
      'İletişimsel azınlık, iletişim kurarken özel engellerle karşılaşabilen bireyleri ifade eder. İşitme engelliler bu kapsama örnektir.',
    practicalTip:
      'İletişimsel azınlık = A) Amerika Birleşik Devletleri’nde yaşayan İŞİTME ENGELLİLER.',
  },
  {
    id: 40,
    guideNumber: 'Soru 40',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 44 [1. Seri] (Sayfa 9-10)',
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
      'Bu yöntemlerde iletişim yazılı mesajlar aracılığıyla kurulur. Bu nedenle yazılı görüşme olarak adlandırılır.',
    practicalTip:
      'Mektup, faks, ağ postası ve ağ yazışması = D) YAZILI GÖRÜŞME.',
  },
  {
    id: 41,
    guideNumber: 'Soru 41',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 45 [1. Seri] (Sayfa 10)',
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
      'Sistem yaklaşımı bireyi, çevresini ve aralarındaki ilişkileri bütün olarak ele alır. Görüşmenin doğrudan sona ermesini sağlamak sistem yaklaşımının görevi değildir.',
    practicalTip:
      'Sistem yaklaşımının katkısı olmayan = C) Görüşmenin sonlanmasını sağlar.',
  },
  {
    id: 42,
    guideNumber: 'Soru 42',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 46 [1. Seri] & Soru 47 [2. Seri] (Sayfa 10 & 12)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Sayfa 10 (Soru 46) ve Sayfa 12 (Soru 47) olarak birebir aynı şekilde 2 kez yer almıştır.',
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
      'Başarılı veri kaydı için mutlaka yazılı görüşme yapılması gerekmez. Yüz yüze ve sözlü görüşmelerde de doğru kayıt tutulabilir.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): Doğru veri kaydı için dikkat edilmesi gerekenlerden olmayan = E) YAZILI GÖRÜŞMELER YAPILMASI.',
  },
  {
    id: 43,
    guideNumber: 'Soru 43',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 47 [1. Seri] (Sayfa 10)',
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
    correctKey: 'A',
    explanation:
      'İlişki ilkesi, bir sistemi oluşturan parçaların birbirleriyle nasıl etkileşim kurduğuna önem verir.',
    practicalTip:
      'Parçalar arasındaki etkileşimin de en az sistemin kendisi kadar önemli olması = A) İLİŞKİ ilkesi.',
  },
  {
    id: 44,
    guideNumber: 'Soru 44',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 48 [1. Seri] & Soru 45 [2. Seri] (Sayfa 10-11 & 12)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Sayfa 10 (Soru 48) ve Sayfa 12 (Soru 45) olarak birebir aynı şekilde 2 kez yer almıştır.',
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
      'Sosyal inceleme raporu, başvuranın yalnızca kendisini değil, ailesini ve sosyal çevresini de değerlendirir.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): "Ailesi, kardeşleri, okul ve iş yeriyle yapılan görüşmeler sonucu hazırlanan rapor" = C) SOSYAL İNCELEME RAPORU.',
  },
  {
    id: 45,
    guideNumber: 'Soru 45',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 49 [1. Seri] (Sayfa 11)',
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
      'Bu yaklaşıma göre azınlık olma durumu yalnızca sayıca az olmakla açıklanmaz. Kişilerin kendilerini temsil etme, ifade etme ve yaşamlarını seçme olanakları da önemlidir.',
    practicalTip:
      'Foucault\'nun azınlık ölçütlerinde yer almayan = C) İSTATİSTİKSEL OLARAK AZ SAYIDA OLMA.',
  },
  {
    id: 46,
    guideNumber: 'Soru 46',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 40 [2. Seri] (Sayfa 11)',
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
      'Görüşme raporu, görüşmeden elde edilen bilgilerin kurumsal kullanım için düzenli ve sistemli biçimde yazılmasıdır.',
    practicalTip:
      'Görüşme verilerinin kurum dosyaları için düzenli ve sistematik sunulması = B) GÖRÜŞME RAPORU.',
  },
  {
    id: 47,
    guideNumber: 'Soru 47',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 41 [2. Seri] & Soru 46 [2. Seri] (Sayfa 11 & 12)',
    isDuplicateInPdf: true,
    duplicateCount: 2,
    duplicateNote: 'PDF\'de Sayfa 11 (Soru 41) ve Sayfa 12 (Soru 46) olarak birebir aynı şekilde 2 kez yer almıştır.',
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
      'Olayların sırasının ve aralarındaki bağlantının yanlış hatırlanması yerini değiştirme hatasıdır.',
    practicalTip:
      'BANKO SORU (PDF\'de 2 kez geçti): "Olayların SIRASINI veya BAĞLANTILARINI hatırlayamama" = C) YERİNİ DEĞİŞTİRME HATASI.',
  },
  {
    id: 48,
    guideNumber: 'Soru 48',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 42 [2. Seri] (Sayfa 11)',
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
    correctKey: 'E',
    explanation:
      'Teorik bütünlük, öğrenilen kuramsal bilgilerin uygulamada kullanılmasıdır. Yani teori ile pratiğin birlikte yürütülmesidir.',
    practicalTip:
      'Mevcut teorik bilgi ve alan pratiğini birlikte yürütme = E) TEORİK BÜTÜNLÜK.',
  },
  {
    id: 49,
    guideNumber: 'Soru 49',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 43 [2. Seri] (Sayfa 11-12)',
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
      'Çocuk Hakları Sözleşmesi\'ne göre, uygulanabilir hukukta daha erken erginlik durumu saklı kalmak üzere, 18 yaşından küçük herkes çocuk kabul edilir.',
    practicalTip: 'BM Çocuk Hakları Sözleşmesi çocuk üst yaş sınırı = A) 18.',
  },
  {
    id: 50,
    guideNumber: 'Soru 50',
    part: '2. Parça (26–50)',
    pdfNumbers: 'PDF Soru 44 [2. Seri] (Sayfa 12)',
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
      'Görüşme raporu tek başına sorunları çözmez. Ancak uzmanlara yol göstererek sorunların çözümüne yardımcı olur.',
    practicalTip:
      '"A) Görüşme raporu, sorun çözücü fonksiyona sahiptir" ifadesi yanlıştır (Rapor yol gösterici ve ipucudur).',
  },
  {
    id: 51,
    guideNumber: 'Soru 51',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 48 [2. Seri] (Sayfa 12-13)',
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
      'Görüşme, önceden belirlenmiş bir amaç doğrultusunda gerçekleştirilir. Sohbet ise daha serbest ve plansız olabilir.',
    practicalTip:
      'Görüşme vs. Sohbet doğrusu = E) "Görüşmenin bilinçli olarak tespit edilen bir amacı vardır".',
  },
  {
    id: 52,
    guideNumber: 'Soru 52',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 49 [2. Seri] (Sayfa 13)',
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
      'Bilgi toplama ağırlıklı olarak değerlendirme aşamasında yapılır. Sorun çözme aşamasında ise hazırlanan plan uygulanır, sonuçlar değerlendirilir ve değişim sağlanmaya çalışılır.',
    practicalTip:
      'Sorun çözme aşamasında yapılmayan = D) BİLGİ TOPLAMA (Değerlendirme aşamasında yapılır).',
  },
  {
    id: 53,
    guideNumber: 'Soru 53',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 50 (Sayfa 13)',
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
      'Ağ yazışmalarında mesajlar zaten yazılı olarak kaydedilir. Bu nedenle ayrıca ses veya görüntü kayıt cihazı kullanılmasına gerek yoktur.',
    practicalTip:
      'Cihazla kayıt yöntemi kullanılmayan görüşme = B) AĞ YAZIŞMASI.',
  },
  {
    id: 54,
    guideNumber: 'Soru 54',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 51 (Sayfa 13)',
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
    correctKey: 'C',
    explanation:
      'Görüşme sonlandırılıp kayıt ve genel değerlendirme yapıldıktan sonra izleme aşaması gelir. İzlemede sağlanan değişimin devam edip etmediği kontrol edilir.',
    practicalTip:
      'DİKKAT: Soruda "ön değerlendirme" değil "GENEL değerlendirme" soruluyor! Genel değerlendirmeden sonraki aşama = C) İZLEME.',
  },
  {
    id: 55,
    guideNumber: 'Soru 55',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 53 (Sayfa 13)',
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
      'Sosyal çalışmacılar görüşmeyi bilgi edinme, yardım ve tedavi amacıyla kullanabilir. Klinik ve analitik yöntemin bir parçası olarak kullanılması ise sorunun dayandığı ders kaynağında daha çok psikolojik danışma ve psikanaliz alanlarıyla ilişkilendirilmiştir.',
    practicalTip:
      'Sosyal çalışmacıların görüşmeyi kullanma amacı olmayan = A) Klinik ve analitik yöntemin bir parçası olarak.',
  },
  {
    id: 56,
    guideNumber: 'Soru 56',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 54 (Sayfa 13)',
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
    correctKey: 'C',
    explanation:
      'Ses ve özellikle görüntü kayıtları görüşmenin tekrar incelenmesini sağlar. Böylece konuşmalar ve gözlemlenen davranışlar yeniden değerlendirilebilir.',
    practicalTip:
      'Görüşme sırasında yapılan gözlemleri ses ve görüntüyle tekrar canlandırabilen = C) CİHAZDA KAYIT.',
  },
  {
    id: 57,
    guideNumber: 'Soru 57',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 56 (Sayfa 14)',
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
      'Etkin dinleyici karşısındaki kişinin sözünü kesmeden dikkatlice dinler. Kişi konuşurken sürekli tavsiye vermek etkili dinlemeyi engeller.',
    practicalTip:
      'Etkin dinleyici karşıdaki konuşurken A) TAVSİYELERDE BULUNMAZ.',
  },
  {
    id: 58,
    guideNumber: 'Soru 58',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 57 (Sayfa 14)',
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
      'Önce problem belirlenir. Sonra bu problemi çözmek için farklı çözüm yolları geliştirilir. Daha sonra seçenekler değerlendirilerek uygun çözüm uygulanır.',
    practicalTip:
      'Problem tanımlamayı hemen izleyen aşama = B) ALTERNATİF ÇÖZÜM ÖNERİLERİNİN GELİŞTİRİLMESİ.',
  },
  {
    id: 59,
    guideNumber: 'Soru 59',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 58 (Sayfa 14)',
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
      'Egan\'ın ilk aşamasında danışanın yaşadıklarını anlatması, sorunlarını anlaması ve değişim yaratabilecek önemli (fark yaratacak) konulara odaklanması sağlanır.',
    practicalTip:
      'Egan 1. Aşama (Öykülerini anlatmalarına yardım etmek) = A) Danışanların FARK YARATACAK KONULAR üzerinde çalışmalarını sağlamak.',
  },
  {
    id: 60,
    guideNumber: 'Soru 60',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 59 (Sayfa 14)',
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
      'Kişinin verdiği cevaplar yeterince açık ve ayrıntılı değilse davranışları, mimikleri ve diğer gözlem bilgileri durumu anlamaya yardımcı olur.',
    practicalTip:
      'Gözlem verileri ne zaman çok önemli olur? -> D) Görüşülenden TAM VE SPESİFİK CEVAPLARIN ALINAMADIĞI durumlarda.',
  },
  {
    id: 61,
    guideNumber: 'Soru 61',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 60 (Sayfa 14-15)',
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
      'Enformel görüşme ortamı, görüşme için özel olarak düzenlenmiş resmî bir yer değildir. Evler bu tür ortamlara örnektir.',
    practicalTip:
      'Enformel (resmî olmayan) görüşme ortamı = C) EVLER.',
  },
  {
    id: 62,
    guideNumber: 'Soru 62',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 61 (Sayfa 15)',
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
      'İyi bir görüşmeci güvenilir, tutarlı ve anlayışlı olmalıdır. Kontrolcü, egoist ve otoriter davranışlar güven ilişkisini zayıflatır.',
    practicalTip:
      'Olumlu ilişki kuran görüşmeciye yakıştırılan sıfat = A) TUTARLI.',
  },
  {
    id: 63,
    guideNumber: 'Soru 63',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 62 (Sayfa 15)',
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
    correctKey: 'D',
    explanation:
      'Saygı, tarafsızlık (yansızlık), ayrımcılık yapmama ve veri toplama sınırlarına dikkat etme, iyi ilişki kurarken gözetilen etik ilkelerdir. Prosedürleri açıklamak ise daha çok bilgilendirilmiş onay sürecine aittir.',
    practicalTip:
      'İyi ilişki geliştirmek için gözetilecek etik ilkeler arasında yer almayan = D) GÖRÜŞMENİN PROSEDÜRLERİNİ AÇIKLAMAK (Bilgilendirilmiş onay işlemidir).',
  },
  {
    id: 64,
    guideNumber: 'Soru 64',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 63 (Sayfa 15)',
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
      'Sorunun dayandığı etik hiyerarşide insan yaşamını korumak en öncelikli ilkedir. Gizlilik ve mahremiyet ise verilen seçenekler arasında en alt sıradadır.',
    practicalTip:
      'Etik Hiyerarşi: İlk sırada İnsan yaşamını korumak (B), şıklarda en sonda ise A) GİZLİLİK-MAHREMİYET gelir.',
  },
  {
    id: 65,
    guideNumber: 'Soru 65',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 64 (Sayfa 15)',
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
      'Profesyonel görüşmeler belirli kurallar ve mesleki sınırlar içinde gerçekleştirilir. Gayriresmî iletişim daha çok sohbetin özelliğidir.',
    practicalTip:
      '"E) Görüşmede iletişim kalıpları gayri resmidir" ifadesi yanlıştır.',
  },
  {
    id: 66,
    guideNumber: 'Soru 66',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 65 (Sayfa 15)',
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
      'Sosyal hizmet uzmanı yalnızca başvuranla görüşmek zorunda değildir. Gerektiğinde ailesi, arkadaşları ve sosyal çevresiyle de görüşerek bilgi toplar. Bu nedenle "sadece" ifadesi yanlıştır.',
    practicalTip:
      '"A) SADECE başvuranla görüşerek..." ifadesi yanlıştır; sosyal hizmette çevre ve aileyle de görüşülür.',
  },
  {
    id: 67,
    guideNumber: 'Soru 67-A',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 66 (Sayfa 16)',
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
      'Yapılandırılmış görüşmede sorular, sıraları ve cevapların nasıl kaydedileceği önceden belirlenir. Her katılımcıya aynı düzen içinde sorular yöneltilir.',
    practicalTip:
      'Sorular + Sorulma Sırası + Cevap Kodları önceden belli = D) YAPILANDIRILMIŞ GÖRÜŞME.',
  },
  {
    id: 68,
    guideNumber: 'Soru 67-B',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 67 (Sayfa 16)',
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
      'Odak grup görüşmesinde bir grup insanın belirli bir konu hakkındaki düşünceleri, deneyimleri ve davranışları birlikte incelenir.',
    practicalTip:
      '"Bireysel hikâyelerden ziyade belli bir GRUP ya da TOPLULUĞUN..." = A) ODAK GRUP GÖRÜŞMESİ.',
  },
  {
    id: 69,
    guideNumber: 'Soru 68',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 68 (Sayfa 16)',
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
      'Sosyal hizmet etiğinin temelinde insan hakları ve insan onuruna saygı vardır. Bu nedenle etik davranışların temel ölçütü insan haklarıdır.',
    practicalTip: 'Etiğe uygunluk ilkesinin temel ölçütü = A) TEMEL İNSAN HAKLARI.',
  },
  {
    id: 70,
    guideNumber: 'Soru 69',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 69 (Sayfa 16)',
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
      'Başvuran yargılanmadan kabul edildiğinde kendini güvende hisseder. Bu güven, kişinin görüşmeye devam etmesini ve yardım sürecine katılmasını kolaylaştırır.',
    practicalTip:
      'Başvuranı olduğu gibi kabul etmenin işlevi = C) BAŞVURANIN GÖRÜŞME SÜRECİNDE TUTULMASI.',
  },
  {
    id: 71,
    guideNumber: 'Soru 70',
    part: '3. Parça (51–70)',
    pdfNumbers: 'PDF Soru 70 (Sayfa 16)',
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
      'Aktarım, başvuranın geçmişte başka kişilere karşı hissettiği duyguları görüşmeciye yöneltmesidir (Örneğin geçmişte babasına duyduğu öfkeyi görüşmeciye karşı hissetmesi). Karşıt aktarım ise görüşmecinin kendi duygularını başvurana yansıtmasıdır.',
    practicalTip:
      'Başvuran -> Görüşmeciye yönlendirirse = E) AKTARIM | Görüşmeci -> Başvurana yansıtırsa = KARŞIT AKTARIM.',
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

export const ALL_PARTS: QuestionPart[] = [
  '1. Parça (1–25)',
  '2. Parça (26–50)',
  '3. Parça (51–70)',
];
