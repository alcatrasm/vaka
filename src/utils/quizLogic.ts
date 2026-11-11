import {
  ALL_CATEGORIES,
  DUPLICATE_PAIRS_REPORT,
  ExamQuestion,
  OptionKey,
  QuestionCategory,
  QuestionPart,
} from '../data/questions';

export type QuizFilterMode =
  | 'all'
  | 'duplicates'
  | 'wrong'
  | 'unanswered'
  | 'bookmarked';

export interface CategoryStats {
  category: QuestionCategory;
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

export interface OverallQuizStats {
  rawPdfQuestionCount: number;
  duplicateEliminatedCount: number;
  totalUniqueQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  accuracyPercent: number;
  completionPercent: number;
  estimatedExamScore: number;
  categoryStats: CategoryStats[];
}

export interface AnalysisPayload {
  readinessLevel: string;
  overallAccuracy: number;
  summary: string;
  weakAreas: {
    topic: string;
    issue: string;
    quickFix: string;
  }[];
  mistakeInsights: {
    questionId: number;
    trapExplanation: string;
    memoryRule: string;
  }[];
  sprintPlan: {
    timeBlock: string;
    action: string;
  }[];
  examTips: string[];
}

export interface OrderedExamQuestion extends ExamQuestion {
  stepNumber: number;
  sectionTitle: string;
}

export interface SimpleFeedback {
  isCorrect: boolean;
  selectedKey: OptionKey;
  selectedOptionText: string;
  correctKey: OptionKey;
  correctOptionText: string;
  whyWrongExplanation: string;
  whyCorrectExplanation: string;
  simpleTip: string;
}

/**
 * 71 özgün sorunun en kolay ve mantıklı öğrenme sırası (7 Konu Bölümü, Temelden İleriye):
 */
export const LOGICAL_CURRICULUM_SECTIONS: {
  sectionTitle: string;
  questionIds: number[];
}[] = [
  {
    sectionTitle: '1. Bölüm: İletişim Temelleri ve Beceriler',
    questionIds: [4, 8, 5, 11, 39, 57, 20, 27, 31, 33, 71],
  },
  {
    sectionTitle: '2. Bölüm: Görüşme Nedir ve Sohbetten Farkı',
    questionIds: [9, 51, 65, 18, 66, 55, 19, 61, 32, 37],
  },
  {
    sectionTitle: '3. Bölüm: Profesyonel İlişki ve Etik Kurallar',
    questionIds: [22, 62, 70, 29, 69, 25, 49, 64, 13, 63],
  },
  {
    sectionTitle: '4. Bölüm: Kuramlar ve Yaklaşımlar',
    questionIds: [48, 34, 43, 41, 45, 16, 58, 59],
  },
  {
    sectionTitle: '5. Bölüm: Görüşme Türleri',
    questionIds: [15, 17, 35, 67, 68, 40, 53],
  },
  {
    sectionTitle: '6. Bölüm: Görüşme Aşamaları (Baştan Sona Sırayla)',
    questionIds: [23, 24, 12, 26, 1, 10, 28, 6, 21, 30, 14, 7, 52, 2, 54, 3],
  },
  {
    sectionTitle: '7. Bölüm: Kayıt Tutma, Gözlem ve Raporlama',
    questionIds: [60, 42, 36, 47, 38, 56, 46, 50, 44],
  },
];

export function getOrderedQuestions(questions: ExamQuestion[]): OrderedExamQuestion[] {
  const questionMap = new Map<number, ExamQuestion>();
  for (const q of questions) {
    questionMap.set(q.id, q);
  }

  const ordered: OrderedExamQuestion[] = [];
  const seenIds = new Set<number>();
  let step = 1;

  for (const section of LOGICAL_CURRICULUM_SECTIONS) {
    for (const id of section.questionIds) {
      const q = questionMap.get(id);
      if (q && !seenIds.has(id)) {
        seenIds.add(id);
        ordered.push({
          ...q,
          stepNumber: step++,
          sectionTitle: section.sectionTitle,
        });
      }
    }
  }

  for (const q of questions) {
    if (!seenIds.has(q.id)) {
      seenIds.add(q.id);
      ordered.push({
        ...q,
        stepNumber: step++,
        sectionTitle: q.category,
      });
    }
  }

  return ordered;
}

/**
 * Seçilen yanlış şıkkın neden yanlış olduğunu basit, günlük Türkçeyle açıklayan sözlük.
 */
const OPTION_SPECIFIC_WRONG_REASONS: Record<number, Partial<Record<OptionKey, string>>> = {
  4: {
    A: 'İletişim gerçekten de birden fazla kişiyi, duyguyu ve mesajı içerdiği için karmaşık bir süreçtir. Bu ifade doğrudur; soru ise yanlış olanı soruyor.',
    B: 'Çok fazla konuşmak daha iyi anlaştığımız anlamına gelmez, yani bu ifade doğrudur. Soru bizden yanlış olanı istiyor.',
    D: 'İnsan konuşmasa bile duruşuyla ve suskunluğuyla mesaj verir, yani iletişim kaçınılmazdır. Bu ifade doğrudur.',
    E: 'Söylenen bir sözü veya yaşanan bir anı birebir aynı şekilde geri almak ya da tekrarlamak imkânsızdır. Bu ifade doğrudur.',
  },
  5: {
    A: 'El, kol ve baş hareketleri (jestler) kelimesiz yapıldığı için sözsüz iletişimdir.',
    B: 'Sesin yüksekliği, titremesi veya vurgusu (ses tonu) sözsüz iletişimin bir parçasıdır.',
    D: 'Göz teması kurmak veya göz kaçırmak kelimesiz mesaj verdiği için sözsüz iletişimdir.',
    E: 'Kişiler arasındaki mesafe ve oturma düzeni (mekân) sözsüz iletişim kanalıdır.',
  },
  7: {
    A: 'Sorunları gereksinim olarak tanımlamak planlamanın ilk adımlarındandır, son adımı değildir.',
    B: 'Müdahale düzeylerini belirlemek planlamanın ortasında yapılır, en son adım değildir.',
    C: 'Amaçları oluşturmak sözleşmeden önce yapılır.',
    E: 'Hedefleri belirlemek sözleşmeden önceki adımdır; en son adımda ise bu hedefler "Sözleşme"ye bağlanır.',
  },
  8: {
    A: '"Hedef (Alıcı)", mesajı gönderen değil, mesajın ulaştığı karşı taraftır.',
    B: '"Kanal", mesajın taşındığı yoldur (örneğin ses dalgaları, telefon, kâğıt).',
    D: '"Geri bildirim", alıcının mesajı aldıktan sonra kaynağa verdiği tepki veya cevaptır.',
    E: '"Kod açma", karşı tarafın gelen mesajı kendi zihninde okuyup anlamlandırmasıdır.',
  },
  10: {
    A: 'Çözümlerin uygulanması ilk tanışma aşamasında değil, ilerleyen "sorun çözme / müdahale" aşamasında yapılır.',
    C: 'Sosyal hizmette danışan hiçbir aşamada yargılanmaz.',
    D: 'Çözüme yönelik davranışlar daha sonra, planlama ve müdahale aşamalarında ele alınır.',
    E: 'Mesleki ilişkide "sempati" (acımak / duygudaşlık) değil, "empati" (kendini onun yerine koyarak anlamak) kurulur.',
  },
  11: {
    A: 'Üzüntü kişinin ruh hâliyle ilgili olduğu için psikolojik bir gürültüdür.',
    B: 'Heyecan zihinsel ve duygusal bir durum olduğu için psikolojik gürültüdür.',
    C: 'Önyargı kişinin zihnindeki kalıplardan kaynaklandığı için psikolojik gürültüdür.',
    E: 'Aşırı sevinç duygusal bir durum olduğu için psikolojik gürültü kaynağıdır.',
  },
  12: {
    A: 'Ön değerlendirme, uzmanla bir araya geldikten sonra sorunun incelendiği aşamadır.',
    C: 'Planlama, sorun incelendikten sonra çözüm yollarının kararlaştırıldığı aşamadır.',
    D: 'Sonlandırma, sorun çözüldükten sonra görüşmenin bitirildiği aşamadır.',
    E: 'Uygulama, hazırlanan çözüm planının hayata geçirildiği aşamadır.',
  },
  13: {
    B: 'Sadece zararları değil; amacı, yöntemi, yararları ve kuralları da bilmesi gerekir.',
    C: 'Hiçbir bilgi almadan sadece "kabul ediyorum" demek bilgilendirilmiş onay olmaz.',
    D: 'Sadece prosedürleri kabul etmek eksiktir; çalışmanın tüm doğasını (amacını, risklerini, haklarını) bilerek kabul etmelidir.',
    E: 'Hakların bildirilmesi tek taraflı bir bilgilendirmedir; "onay" olması için başvuranın bunu bilerek kabul etmesi gerekir.',
  },
  15: {
    A: '"Odak grup görüşmesi", bir grubun belirli bir konudaki ortak fikirlerini anlamak için yapılır.',
    C: '"Teşhis görüşmesi", sorunu tanımlamaya odaklanır; aile, okul ve çevreyle geniş bilgi toplama süreci sosyal incelemedir.',
    D: '"Yapılandırılmış görüşme", önceden hazırlanmış standart soru listesiyle yapılan görüşmedir.',
    E: '"Tedavi görüşmesi", bilgi toplamaktan ziyade kişinin davranışlarını değiştirmeyi ve iyileştirmeyi amaçlar.',
  },
  17: {
    B: '"Yarı-yapılandırılmış görüşme", soruların hazırlanış biçimiyle ilgilidir, tedavi amacı taşımaz.',
    C: '"Odak grup görüşmesi", grup tartışması yoluyla veri toplama tekniğidir.',
    D: '"Sosyal inceleme görüşmesi", kişinin ve çevresinin durumunu anlamak için bilgi toplama görüşmesidir.',
    E: '"Teşhis görüşmesi", sorunun ne olduğunu tespit etmek içindir; tutum ve davranışları değiştirmek tedavi görüşmesidir.',
  },
  20: {
    A: '"Hangi kurumda çalışıyorsunuz?" sorusunun cevabı tek kelimedir (kapalı uçlu sorudur).',
    B: '"Romanı mı öyküyü mü seversiniz?" sorusu iki seçenekten birini seçtirir (kapalı uçlu sorudur).',
    C: '"Kaç çocuğunuz var?" sorusunun cevabı sadece bir sayıdır (kapalı uçlu sorudur).',
    E: '"Arkadaşlarınızı sever misiniz?" sorusuna sadece "Evet" veya "Hayır" denir (kapalı uçlu sorudur).',
  },
  21: {
    A: '"Süreç olarak değerlendirme", sadece ilk oturumlarda değil, görüşmenin başından sonuna kadar devam eden değerlendirmedir.',
    C: '"Sonuç olarak değerlendirme", görüşmenin en sonunda yapılan değerlendirmedir.',
    D: '"Psikososyal değerlendirme", içeriği ifade eder; ilk oturumlardaki evreyi anlatan kavram "aşama olarak değerlendirme"dir.',
    E: '"Çıktıların değerlendirilmesi", müdahale bittikten sonra elde edilen sonuçların ölçülmesidir.',
  },
  22: {
    A: 'Profesyonel ilişki uzmanın rahatı için değil, danışana yardım etmek için kurulur.',
    B: 'Sadece bilgilenmek yeterli değildir; asıl önemli olan danışanın uzmana güvenmesidir.',
    D: 'Sadece ilişki kurmak tek başına ruhsal çöküntüyü hemen bitirmez, önce güven ortamı sağlar.',
    E: 'İlişkinin temel amacı uzmanın yeterliğini artırmak değil, danışanda güven oluşturmaktır.',
  },
  23: {
    A: 'Başlama, görüşmenin 4 ana (temel) aşamasından biridir, tamamlayıcı aşama değildir.',
    C: 'Değerlendirme, görüşmenin 4 ana (temel) aşamasından biridir.',
    D: 'Sorun çözme, görüşmenin 4 ana (temel) aşamasından biridir.',
    E: 'Sonlandırma, görüşmenin 4 ana (temel) aşamasından biridir. Tamamlayıcı olanlar: Hazırlık, Kayıt Tutma ve İzlemedir.',
  },
  25: {
    A: 'Saydamlık (açıklık) dürüst olmakla ilgilidir; İHEB 2. madde ise dil, din, ırk ayrımı yapmamayı anlatır.',
    B: 'Güçlendirme danışanın kapasitesini artırmaktır; ayrımcılık yasağı doğrudan farklılıklara duyarlılıkla ilgilidir.',
    C: 'Pozitif yanlılık dezavantajlıdan yana olmaktır; İHEB 2. madde doğrudan farklılıklara duyarlılığın dayanağıdır.',
    E: 'İçtenlik samimi olmak demektir; İHEB 2. madde ise herkesin farklılığıyla eşit kabul edilmesini (farklılıklara duyarlılığı) vurgular.',
  },
  26: {
    A: 'Odayı toparlamak zihinsel (düşünsel) değil, fiziksel bir hazırlıktır.',
    B: 'Odayı havalandırmak fiziksel ortam hazırlığıdır.',
    C: 'Aydınlatmayı ayarlamak fiziksel ortam hazırlığıdır.',
    E: 'Dikkat dağıtıcı eşyaları kaldırmak fiziksel bir hazırlıktır.',
  },
  27: {
    B: 'Somutluk, danışanın genel laflar yerine net ve açık konuşmasını sağlayan bir görüşme becerisidir.',
    C: 'Yapılandırma, görüşmenin amacını ve kurallarını belirleme becerisidir.',
    D: 'Kendini açma, uzmanın gerektiğinde kontrollü şekilde kendi deneyiminden örnek verme becerisidir.',
    E: 'Teşvik etme, danışanın konuşmaya devam etmesini destekleme becerisidir.',
  },
  29: {
    B: 'İnsan birçok bilimin konusudur; etiğin doğrudan incelediği konu "ahlak"tır.',
    C: 'Davranışı psikoloji inceler; etik ise davranışın ahlaki boyutunu (ahlakı) inceler.',
    D: 'Değerler ahlakın içindeki unsurlardır; etiğin ana konusu doğrudan "ahlak"tır.',
    E: 'Felsefe üst bilim dalıdır; etik zaten felsefenin ahlakı inceleyen alt dalıdır.',
  },
  31: {
    A: 'Uzmanın esnek olması, beklenmedik durumlara uyum sağlaması için çok önemlidir.',
    B: 'Uzmanın sabırlı, sıcak ve dengeli bir kişiliğe sahip olması becerileri doğrudan etkiler.',
    C: 'Sorunları hızlı kavramak ve bağlantı kurmak için zekâ önemli bir etkendir.',
    D: 'Uzmanın kendi güçlü ve zayıf yönlerini bilmesi (kendini tanıması) görüşmeyi çok etkiler.',
  },
  32: {
    A: 'Duygusal sorunları olan kişiler sosyal hizmet görüşmesi için uygun adaylardır.',
    B: 'Gönüllü gelen başvuran görüşme için en uygun adaydır.',
    C: 'Başka bir uzmanın yönlendirdiği kişilerle sosyal hizmet görüşmesi yapılabilir.',
    E: 'Gelişimsel dönem sorunları (ergenlik, yaşlılık vb.) sosyal hizmetin çalışma alanı içindedir.',
  },
  33: {
    A: 'Aralarında güven ve güçlü bir ilişki olmadan yüzleştirme yapılırsa danışan savunmaya geçer.',
    B: 'Ortada gerçek bir çelişki veya neden olmadan rastgele yüzleştirme yapılmaz.',
    C: 'Yüzleştirme için danışanın hazır olduğu doğru zaman kollanmalıdır.',
    D: 'Yüzleştirme kişiyi suçlamak için değil, ona yardım etmek niyetiyle yapılmalıdır.',
  },
  34: {
    B: '"Problem", bireyden değil sistemin kendisinden kaynaklanan aksaklıktır. Bireyden kaynaklanıyorsa buna "Güçlük" denir.',
    C: '"Sistem", parçaların oluşturduğu bütündür; paylaşımcı davranmama ise bir aksaklık (güçlük) durumudur.',
    D: '"Yardım", sorunu çözmek için sunulan destektir.',
    E: '"Destek", bireye verilen güçlendirici katkıdır.',
  },
  35: {
    A: 'Hedeflenen değişimi sağlamak "müdahale / sorun çözme" aşamasının amacıdır.',
    B: 'Profesyonel görüşmeler özlem gidermek için yapılmaz.',
    D: 'Rapor tutmak görüşmenin amacı değil, yapılan çalışmayı kaydetme aracıdır.',
    E: 'Görüşmeler uzmanın deneyim kazanması için değil, danışana fayda sağlamak için yapılır.',
  },
  37: {
    A: 'Adli makamlarca yönlendirilen kişiler zorunlu gelse de görüşmeyi tamamen reddeden kişiye göre iletişim kurma şansı daha yüksektir.',
    B: 'Yöneticisi tarafından yönlendirilen kişiyle de belirli düzeyde görüşme yürütülebilir.',
    D: 'Gönüllü katılımda görüşme başarısı en düşük değil, tam tersine EN YÜKSEKTİR.',
    E: 'Arkadaş tavsiyesiyle gelen kişi kendi isteğiyle geldiği için başarı şansı yüksektir.',
  },
  38: {
    A: 'Not alırken bazı şeyler kaçırılabileceği için en güvenilir yol ses/görüntü kaydıdır.',
    B: 'Sürekli kâğıda bakarak not yazmak göz temasını keser ve aktif dinlemeyi zorlaştırır.',
    C: 'Yapılandırılmamış görüşmelerde konuşma serbest aktığı için uzun uzun not almak daha zordur.',
    E: 'Not alma tek başına en etkili yöntem değildir; konuşmayı yavaşlattığı için süreci uzatabilir.',
  },
  39: {
    B: 'Türkiye’de yaşayan erkekler iletişim kurarken özel bir engel taşıyan azınlık grubu değildir.',
    C: 'Avrupa’da yaşayan kadınlar nüfusun yarısını oluşturur ve iletişimsel bir engel grubunu ifade etmez.',
    D: 'Türkiye’de yaşayan Müslümanlar çoğunluktadır ve iletişimsel azınlık değildir.',
    E: 'Öğrenciler ortak dili konuşup duyabildiği için iletişimsel azınlık sayılmaz.',
  },
  40: {
    A: 'Mektup, faks ve e-postada ses değil yazı kullanılır.',
    B: 'Bu araçlarla yapılan görüşmeler yapılandırılmış olmak zorunda değildir.',
    C: 'Sözel görüşme konuşarak yapılır; mektup ve ağ yazışması ise yazarak yapılır.',
    E: 'Mektup ve e-posta uzaktan gönderilir, yüz yüze değildir.',
  },
  43: {
    B: '"Bütünlük", sistemin parçaların tek tek toplamından daha farklı ve büyük olması demektir.',
    C: '"Denge (Homeostaz)", sistemin sarsıntılara rağmen kendi iç düzenini korumaya çalışmasıdır.',
    D: '"Yakınlık", sistem yaklaşımının temel ilkelerinden biri değildir.',
    E: '"Geştalt", parçaların algısal bütünlüğünü ifade eden psikoloji kavramıdır.',
  },
  44: {
    A: '"Süreç raporu", görüşmedeki konuşmaların diyalog hâlinde ayrıntılı yazıldığı rapordur.',
    B: '"Özet raporu", uzun süreli çalışmaların kısaca toparlandığı rapordur.',
    D: '"Mesleki rapor", genel bir ifadedir; aile, okul ve iş yeri incelemesinin özel adı sosyal inceleme raporudur.',
    E: '"Görüşme raporu", tek bir görüşmenin verilerini kurum dosyası için özetleyen rapordur.',
  },
  46: {
    A: '"Özet raporu", birden fazla görüşmenin veya uzun bir sürecin özetidir.',
    C: '"Gözlem raporu", sadece gözlemlenen davranışları aktarır.',
    D: '"Süreç raporu", görüşmede konuşulan her şeyin kelimesi kelimesine aktarıldığı eğitim amaçlı rapordur.',
    E: '"Sosyal inceleme raporu", kişinin ailesi, okulu ve sosyal çevresiyle yapılan kapsamlı inceleme sonucunda yazılır.',
  },
  47: {
    A: '"Tanıma hatası", bilgiyi yanlış teşhis etme veya yanlış anlamlandırma durumudur.',
    B: '"İhmal hatası", görüşmedeki önemli bir bilgiyi tamamen atlayıp kaydetmemektir.',
    D: '"Derleme hatası", bilgileri bir araya getirirken yapılan gruplama yanlışıdır.',
    E: '"Unutma hatası", bilginin tamamen hafızadan silinmesidir; sırasını ve bağlantısını karıştırmak ise yerini değiştirme hatasıdır.',
  },
  48: {
    A: 'Literatürde kuramsal bilgi ile alan pratiğini birleştirme kavramına "Mesleki bütünlük" değil, "Teorik bütünlük" denir.',
    B: '"Profesyonel mesleki bakış", uzmanın olaylara yaklaşım tarzıdır.',
    C: '"Pratik bütünlük" diye bir kavram kullanılmaz; doğrusu "Teorik bütünlük"tür.',
    D: '"Bilimsel sistematik analiz", araştırma ve veri inceleme sürecidir.',
  },
  49: {
    B: '17 yaş çocuk sayılır ancak üst sınır 17 değil 18 yaştır.',
    C: '16 yaş üst sınır değildir; 18 yaşına kadar herkes çocuk kabul edilir.',
    D: '15 yaş üst sınır değildir; 18 yaşına kadar herkes çocuk kabul edilir.',
    E: '14 yaş üst sınır değildir; BM sözleşmesine göre üst sınır 18’dir.',
  },
  51: {
    A: 'İyi vakit geçirmek için yapılan şey görüşme değil, günlük sohbettir.',
    B: 'Sohbette kimse kimseye belirli bir görev veya rol dağılımı yapmaz; roller görüşmede bellidir.',
    C: 'Önceden hazırlanma ve resmî yapı sohbette değil, profesyonel görüşmede vardır.',
    D: 'Görüşmeci yardım eden uzman, başvuran ise yardım alan kişidir; konumları aynı değildir.',
  },
  54: {
    A: 'Kayıt tutma genel değerlendirmeden önce veya görüşme sırasında yapılır.',
    B: 'Sorun çözme girişimi genel değerlendirmeden çok önce yapılan müdahale aşamasıdır.',
    D: 'Sonlandırma, genel değerlendirmeden önce yapılır.',
    E: 'Başlama, görüşmenin en ilk aşamasıdır. Genel değerlendirmeden sonra ise değişimin kalıcı olup olmadığını görmek için "İzleme" yapılır.',
  },
  55: {
    B: 'Sosyal çalışmacılar başvurana yardım etmek için görüşme yaparlar (bu doğrudur, soru kullanılmayan amacı soruyor).',
    C: 'Sosyal çalışmacılar bilimsel araştırma için de görüşme tekniğini kullanırlar.',
    D: 'Sosyal çalışmacılar tedavi görüşmeleri de yaparlar.',
    E: 'Başvuran hakkında bilgi edinmek görüşmenin en temel amaçlarından biridir.',
  },
  56: {
    A: 'Kâğıda alınan notlar sadece yazıyı gösterir; kişinin ses tonunu ve hareketlerini (gözlemleri) canlı olarak geri getiremez.',
    B: 'Araştırma günlüğü yazılı bir defterdir; görüntüyü ve sesi tekrar canlandıramaz.',
    D: 'Ağ yazışması sadece yazılı mesajlardan oluşur.',
    E: 'Yazı temelli kayıtlar görüntüyü ve sesi kaydetmediği için gözlemleri yeniden canlandıramaz.',
  },
  57: {
    B: 'İyi bir dinleyici karşı tarafın ne demek istediğini doğru anlayıp anlamadığını kontrol eder.',
    C: 'Etkin dinleyici başka şeylerle ilgilenmez, tamamen konuşmaya odaklanır.',
    D: 'Etkin dinleyici başını sallamak, yüz ifadesiyle katılmak gibi sözsüz kanalları kullanır.',
    E: 'Etkin dinleyici konuşan kişiyle göz teması kurar ve beden dilini takip eder.',
  },
  58: {
    A: 'Daha çözüm seçeneklerini üretmeden doğrudan uygulamaya geçilemez.',
    C: 'Seçim yapmak için önce elimizde birden fazla alternatif çözüm önerisi olmalıdır.',
    D: 'İzleme en son aşamada (uygulamadan sonra) yapılır.',
    E: 'Önerileri değerlendirmeden önce ilk iş olarak o "alternatif çözüm önerilerini geliştirmek (üretmek)" gerekir.',
  },
  59: {
    B: 'Gelecek olasılıklarını keşfetmek Egan modelinin 1. değil, 2. aşamasıdır (Tercih Edilen Senaryo).',
    C: 'Amaca bağlanmayı sağlamak 2. aşamanın görevidir.',
    D: 'En uygun stratejileri seçmek 3. aşamanın (Eylem Stratejileri) görevidir.',
    E: 'Planlamadan eyleme geçmek 3. ve son aşamanın görevidir.',
  },
  60: {
    A: 'Sağır ve dilsiz bireylerle işaret dili veya yazı ile net iletişim kurulabilir.',
    B: 'Farklı dil konuşulduğunda tercüman kullanılır; sadece gözlem yeterli olmaz.',
    C: 'Hızlı konuşan kişiden daha yavaş konuşması istenebilir.',
    E: 'Yavaş konuşan kişiyi sabırla dinleyerek tam cevap alınabilir; gözlem asıl olarak kişi net ve açık cevap veremediğinde çok kritik hâle gelir.',
  },
  61: {
    A: 'Evlat edinme merkezleri resmî (formel) kurumlardır.',
    B: 'Okullar resmî (formel) kurumlardır.',
    D: 'Halk merkezleri kurumsal (formel) yerlerdir.',
    E: 'Hastaneler resmî (formel) kurumlardır; evler ise resmî olmayan (enformel) ortamdır.',
  },
  62: {
    B: 'Kontrolcü olmak danışanı baskı altına alır ve olumsuz bir özelliktir.',
    C: 'Egoist (bencil) olmak güveni yıkar, olumsuz bir sıfattır.',
    D: 'Otoriter olmak danışanın kendini açmasını engeller, olumsuz bir sıfattır.',
    E: 'Sabit fikirli olmak empatiyi engeller, olumsuz bir sıfattır.',
  },
  64: {
    B: 'İnsan yaşamını korumak etik hiyerarşide en sonda değil, EN BİRİNCİ (EN ÜST) sıradadır!',
    C: 'En az acı (zarar vermeme) üst sıralarda yer alır, gizlilikten daha önceliklidir.',
    D: 'İyi hayat standardı gizlilikten daha üst sırada yer alır.',
    E: 'Eşit davranma ve ayrımcılık yapmama gizlilikten daha üst sıradadır.',
  },
  65: {
    A: 'Sohbette gerçekten de belli bir amaç olmak zorunda değildir, insanlar öylesine sohbet edebilir.',
    B: 'Sohbette kimin yönetici kimin danışan olduğu gibi roller yoktur, belirsizdir.',
    C: 'Görüşmeci yaptığı mesleki çalışmadan dolayı kurumuna ve etiğe karşı hesap vermekle yükümlüdür.',
    D: 'Sosyal hizmet görüşmesinde mesleki kurallara (normlara) uygun hareket edilir.',
  },
  67: {
    A: '"Odak grup görüşmesi", küçük bir grupla yapılan tartışma görüşmesidir.',
    B: '"Yarı-yapılandırılmış görüşmede" sorular önceden hazırlanır ama sırası değiştirilebilir ve yeni sorular eklenebilir.',
    C: '"Yapılandırılmamış görüşmede" önceden belirlenmiş soru sırası veya cevap kodları yoktur, tamamen esnektir.',
    E: '"Sosyal inceleme görüşmesi", danışanı ve çevresini tanımak için yapılan görüşmedir.',
  },
  68: {
    B: '"Yarı-yapılandırılmış görüşme", bireysel olarak da yapılabilen esnek sorulu görüşmedir.',
    C: '"Yapılandırılmamış görüşme", açık uçlu ve serbest akışlı görüşmedir.',
    D: '"Yapılandırılmış görüşme", herkese birebir aynı sırada sorulan kodlu sorularla yapılır.',
    E: '"Sosyal inceleme görüşmesi", bireyin aile ve sosyal çevresini incelemek için yapılır.',
  },
  69: {
    B: 'Toplumun beklentileri zamana ve kültüre göre değişebilir, bazen insan haklarına aykırı da olabilir.',
    C: 'Kuramlar bilimsel açıklama araçlarıdır, etiğin temel ölçütü değildir.',
    D: 'Etik kurallar kişiden kişiye veya kişilik özelliklerine göre değişmez.',
    E: 'Etiğe uygunluğun en temel evrensel ölçütü "Temel insan hakları"dır.',
  },
  70: {
    A: 'Kişiyi olduğu gibi kabul etmek onu başımızdan savıp başka uzmana göndermek demek değildir.',
    B: 'Kabul etmenin temel işlevi kontrolü devretmek değil, kişinin güven duyup görüşmede kalmasını sağlamaktır.',
    D: 'Olduğu gibi kabul etmek yargılamanın tam tersidir; yargılamamak demektir.',
    E: 'Kabul etmek aktarım geliştirmek için değil, danışanın kendisini güvende hissedip süreci bırakmaması (süreçte tutulması) içindir.',
  },
  71: {
    A: '"Yardım ilişkisi", uzman ile danışan arasındaki mesleki ilişkinin genel adıdır.',
    B: '"Gerçek ilişki", tarafların birbirini çarpıtmadan, olduğu gibi algıladığı sağlıklı ilişkidir.',
    C: '"Çalışma işbirliği", sorunu çözmek için uzman ve danışanın ortak hareket etmesidir.',
    D: '"Karşıt aktarım", danışanın değil, UZMANIN kendi geçmiş duygularını danışana yansıtmasıdır.',
  },
};

export function getSimpleFeedback(
  q: ExamQuestion,
  selectedKey: OptionKey
): SimpleFeedback {
  const isCorrect = selectedKey === q.correctKey;
  const selectedOpt = q.options.find((o) => o.key === selectedKey);
  const correctOpt = q.options.find((o) => o.key === q.correctKey);

  const selectedOptionText = selectedOpt ? `${selectedOpt.key}) ${selectedOpt.text}` : selectedKey;
  const correctOptionText = correctOpt ? `${correctOpt.key}) ${correctOpt.text}` : q.correctKey;

  const qLower = q.question.toLocaleLowerCase('tr-TR');
  const isNegativeQuestion =
    qLower.includes('yanlıştır') ||
    qLower.includes('değildir') ||
    qLower.includes('yer almaz') ||
    qLower.includes('kullanılmaz') ||
    qLower.includes('beklenmez');

  let whyWrongExplanation = '';

  if (!isCorrect) {
    const customReason = OPTION_SPECIFIC_WRONG_REASONS[q.id]?.[selectedKey];
    if (customReason) {
      whyWrongExplanation = customReason;
    } else if (isNegativeQuestion) {
      whyWrongExplanation = `"${selectedOpt?.text}" ifadesi aslında DOĞRU bir bilgidir. Soru kökünde "...hangisi yanlıştır / değildir / yer almaz?" diye sorulduğu için doğru olan bilgileri değil, kurala uymayan YANLIŞ ifadeyi bulmamız gerekiyor.`;
    } else if (q.prefaceList && q.prefaceList.length > 0) {
      whyWrongExplanation = `Seçtiğiniz şık (${selectedOpt?.text}) eksik maddeleri içeriyor. Yukarıda verilen maddelerin tamamı sosyal hizmet görüşmesinde geçerlidir, bu yüzden tamamını içeren E şıkkı seçilmelidir.`;
    } else {
      whyWrongExplanation = `"${selectedOpt?.text}" seçeneği bu soruda anlatılan durumu karşılamaz. Soruda verilen tanım doğrudan "${correctOpt?.text}" kavramına aittir.`;
    }
  }

  return {
    isCorrect,
    selectedKey,
    selectedOptionText,
    correctKey: q.correctKey,
    correctOptionText,
    whyWrongExplanation,
    whyCorrectExplanation: q.explanation,
    simpleTip: q.practicalTip,
  };
}

export function filterQuestions(
  questions: ExamQuestion[],
  options: {
    filterMode: QuizFilterMode;
    selectedCategory: QuestionCategory | 'Tümü';
    selectedPart?: QuestionPart | 'Tümü';
    searchQuery: string;
    userAnswers: Record<number, OptionKey>;
    bookmarkedIds: number[];
  }
): ExamQuestion[] {
  const {
    filterMode,
    selectedCategory,
    selectedPart = 'Tümü',
    searchQuery,
    userAnswers,
    bookmarkedIds,
  } = options;
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('tr-TR');

  return questions.filter((q) => {
    if (selectedPart !== 'Tümü' && q.part !== selectedPart) {
      return false;
    }

    if (selectedCategory !== 'Tümü' && q.category !== selectedCategory) {
      return false;
    }

    if (filterMode === 'duplicates' && !q.isDuplicateInPdf) {
      return false;
    }

    if (filterMode === 'wrong') {
      const ans = userAnswers[q.id];
      if (!ans || ans === q.correctKey) return false;
    }

    if (filterMode === 'unanswered') {
      if (userAnswers[q.id]) return false;
    }

    if (filterMode === 'bookmarked') {
      if (!bookmarkedIds.includes(q.id)) return false;
    }

    if (normalizedQuery.length > 0) {
      const inQuestion = q.question.toLocaleLowerCase('tr-TR').includes(normalizedQuery);
      const inExplanation = q.explanation.toLocaleLowerCase('tr-TR').includes(normalizedQuery);
      const inTip = q.practicalTip.toLocaleLowerCase('tr-TR').includes(normalizedQuery);
      const inOptions = q.options.some((opt) =>
        opt.text.toLocaleLowerCase('tr-TR').includes(normalizedQuery)
      );
      const inPdfNum = q.pdfNumbers.toLocaleLowerCase('tr-TR').includes(normalizedQuery);
      const inGuideNum = q.guideNumber.toLocaleLowerCase('tr-TR').includes(normalizedQuery);
      if (
        !inQuestion &&
        !inExplanation &&
        !inTip &&
        !inOptions &&
        !inPdfNum &&
        !inGuideNum
      ) {
        return false;
      }
    }

    return true;
  });
}

export function calculateQuizStats(
  questions: ExamQuestion[],
  userAnswers: Record<number, OptionKey>
): OverallQuizStats {
  const totalUniqueQuestions = questions.length;
  const duplicateEliminatedCount = DUPLICATE_PAIRS_REPORT.length;
  const rawPdfQuestionCount = totalUniqueQuestions + duplicateEliminatedCount;

  let answeredCount = 0;
  let correctCount = 0;
  let wrongCount = 0;

  for (const q of questions) {
    const ans = userAnswers[q.id];
    if (ans) {
      answeredCount++;
      if (ans === q.correctKey) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  }

  const unansweredCount = totalUniqueQuestions - answeredCount;
  const accuracyPercent =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const completionPercent =
    totalUniqueQuestions > 0
      ? Math.round((answeredCount / totalUniqueQuestions) * 100)
      : 0;

  const estimatedExamScore = accuracyPercent;

  const categoryStats: CategoryStats[] = ALL_CATEGORIES.map((category) => {
    const catQuestions = questions.filter((q) => q.category === category);
    const total = catQuestions.length;
    let answered = 0;
    let correct = 0;
    let wrong = 0;

    for (const q of catQuestions) {
      const ans = userAnswers[q.id];
      if (ans) {
        answered++;
        if (ans === q.correctKey) {
          correct++;
        } else {
          wrong++;
        }
      }
    }

    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return {
      category,
      total,
      answered,
      correct,
      wrong,
      accuracy,
    };
  });

  return {
    rawPdfQuestionCount,
    duplicateEliminatedCount,
    totalUniqueQuestions,
    answeredCount,
    correctCount,
    wrongCount,
    unansweredCount,
    accuracyPercent,
    completionPercent,
    estimatedExamScore,
    categoryStats,
  };
}

export function getWrongQuestionsDetails(
  questions: ExamQuestion[],
  userAnswers: Record<number, OptionKey>
) {
  return questions
    .filter((q) => {
      const ans = userAnswers[q.id];
      return ans !== undefined && ans !== q.correctKey;
    })
    .map((q) => {
      const userKey = userAnswers[q.id];
      const userOption = q.options.find((o) => o.key === userKey);
      const correctOption = q.options.find((o) => o.key === q.correctKey);
      return {
        id: q.id,
        question: q.question,
        category: q.category,
        userAnswer: userOption ? `${userOption.key}) ${userOption.text}` : String(userKey),
        correctAnswer: correctOption
          ? `${correctOption.key}) ${correctOption.text}`
          : String(q.correctKey),
        explanation: q.explanation,
        practicalTip: q.practicalTip,
      };
    });
}

export function buildInstantAnalysis(
  stats: OverallQuizStats,
  questions: ExamQuestion[],
  userAnswers: Record<number, OptionKey>
): AnalysisPayload {
  const wrongQuestions = getWrongQuestionsDetails(questions, userAnswers);
  return {
    readinessLevel: stats.answeredCount === 0 ? 'Başlangıç' : `%${stats.accuracyPercent} Başarı`,
    overallAccuracy: stats.accuracyPercent,
    summary: `${stats.answeredCount} sorudan ${stats.correctCount} doğru, ${stats.wrongCount} yanlış.`,
    weakAreas: [],
    mistakeInsights: wrongQuestions.slice(0, 4).map((wq) => ({
      questionId: wq.id,
      trapExplanation: wq.explanation,
      memoryRule: wq.practicalTip,
    })),
    sprintPlan: [],
    examTips: [],
  };
}
