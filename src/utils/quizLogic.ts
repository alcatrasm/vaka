import {
  ALL_CATEGORIES,
  DUPLICATE_PAIRS_REPORT,
  ExamQuestion,
  OptionKey,
  QuestionCategory,
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

export function filterQuestions(
  questions: ExamQuestion[],
  options: {
    filterMode: QuizFilterMode;
    selectedCategory: QuestionCategory | 'Tümü';
    searchQuery: string;
    userAnswers: Record<number, OptionKey>;
    bookmarkedIds: number[];
  }
): ExamQuestion[] {
  const {
    filterMode,
    selectedCategory,
    searchQuery,
    userAnswers,
    bookmarkedIds,
  } = options;
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('tr-TR');

  return questions.filter((q) => {
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
      if (!inQuestion && !inExplanation && !inTip && !inOptions && !inPdfNum) {
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

function getCategoryQuickFixClient(category: string): string {
  switch (category) {
    case 'Görüşme Aşamaları & Süreç':
      return 'Temel aşamalar: Başlama -> Değerlendirme -> Sorun Çözme -> Sonlandırma. Tamamlayıcı aşamalar: Hazırlık, Kayıt Tutma, İzleme. Planlamanın son alt basamağı: Sözleşme hazırlama.';
    case 'Görüşme Türleri & Teknikleri':
      return 'Sosyal İnceleme = Çevre/Aile bilgisi; Tedavi = Tutum/davranış değiştirme; Yapılandırılmış = Sorular/sıra/kodlar önceden belli; Odak Grup = Topluluk davranış nedenleri; Kontrol = Değişimin seyrini izleme.';
    case 'İletişim & Görüşme Becerileri':
      return 'İletişim durağan DEĞİL dinamiktir. Dil sözlüdür (sözsüz değildir). Yorgunluk psikolojik gürültü değildir. İçe dönüklük görüşme becerisi değildir. Etkin dinleyici konuşurken tavsiye vermez.';
    case 'Etik İlkeler & Profesyonel İlişki':
      return 'Etiğin konusu = Ahlak. Temel ölçüt = Temel insan hakları (İHEB Madde 2 = Farklılıklara duyarlılık). Etik hiyerarşide en son = Gizlilik-mahremiyet. Bilgilendirilmiş onay = Çalışmanın doğasını bilerek kabul.';
    case 'Kayıt Tutma & Raporlama':
      return 'Sıra/bağlantı unutma = Yerini değiştirme hatası. Kurum dosyası için sistematik sunum = Görüşme raporu. Gözlemleri canlandıran = Araştırma günlüğünde kayıt. Ağ yazışmasında cihazla kayıt kullanılmaz.';
    case 'Kuramlar & Yaklaşımlar':
      return 'Sistem: Birey aksaklığı = Güçlük, parçalar arası etkileşim = Bütünlük. Egan 1. aşama (Öykü) = Fark yaratacak konular. Problem çözme: Tanımlamadan hemen sonra = Alternatif çözüm önerileri geliştirme.';
    default:
      return 'Anahtar kavramları Hızlandırılmış Eğitim sekmesindeki özet kartlardan tekrar edin.';
  }
}

export function buildInstantAnalysis(
  stats: OverallQuizStats,
  questions: ExamQuestion[],
  userAnswers: Record<number, OptionKey>
): AnalysisPayload {
  const wrongQuestions = getWrongQuestionsDetails(questions, userAnswers);
  const overallAccuracy = stats.accuracyPercent;

  const sortedWeak = [...stats.categoryStats]
    .filter((c) => c.answered > 0 && c.accuracy < 80)
    .sort((a, b) => a.accuracy - b.accuracy);

  const unansweredCategories = [...stats.categoryStats]
    .filter((c) => c.answered < c.total)
    .sort((a, b) => a.answered / a.total - b.answered / b.total);

  let readinessLevel = 'Başlangıç Aşaması — Hızlı Sprint Hazır';
  let summary = '';

  if (stats.answeredCount === 0) {
    readinessLevel = 'Henüz Test Çözülmedi — Hızlı Başlangıç Hazır';
    summary =
      'Sınava birkaç saat kala en yüksek verimi almak için önce PDF\'de 2 kez tekrar eden 8 kritik soruyu ("Banko / Mükerrer (8)" filtresiyle) çözerek başlayın. Ardından Hızlandırılmış Kamp modülündeki şifre tablolarına göz atıp Pratik Modda tüm 71 soruyu tamamlayın.';
  } else if (overallAccuracy >= 85 && stats.answeredCount >= 35) {
    readinessLevel = 'Sınava Hazır — Yüksek Başarı Potansiyeli';
    summary = `${stats.answeredCount} soruda %${overallAccuracy} doğruluk oranına ulaştınız. Temel kavramlara, görüşme aşamalarına ve etik ilkelere oldukça hâkimsiniz. Kalan sürede sadece yanlış yaptığınız ${wrongQuestions.length} sorunun "Pratik Şifre" kutularını tekrar etmeniz sınavda tam puana yaklaşmanızı sağlayacaktır.`;
  } else if (overallAccuracy >= 65) {
    readinessLevel = 'İyi Seviye — Nokta Atışı Tekrarla Yükselebilir';
    summary = `${stats.answeredCount} soruda %${overallAccuracy} başarı gösterdiniz. Özellikle kavram ayrımları (Sosyal İnceleme vs. Tedavi Görüşmesi, Yerini Değiştirme Hatası, Etik Hiyerarşi sıralaması) üzerinde 20 dakikalık odaklanmış bir tekrar ile netlerinizi hızla artırabilirsiniz.`;
  } else {
    readinessLevel = 'Acil Odaklanma — Önce Pratik Şifreler';
    summary = `${stats.answeredCount} soruda %${overallAccuracy} doğruluk oranındasınız. Sınav soruları doğrudan anahtar kelimeler üzerinden kurgulanmış. Önce "Hızlandırılmış Kamp" sekmesindeki kavram eşleştirmelerini okuyun, ardından "Anında Çözümlü Pratik" modunda her sorunun altındaki yeşil ipucu kutusunu okuyarak ilerleyin.`;
  }

  const weakAreas =
    sortedWeak.length > 0
      ? sortedWeak.slice(0, 3).map((w) => ({
          topic: w.category,
          issue: `${w.answered} sorudan ${w.wrong} tanesi yanlış (%${w.accuracy} başarı). Bu konudaki çeldirici şıklar arasında kavram karışıklığı yaşanıyor.`,
          quickFix: getCategoryQuickFixClient(w.category),
        }))
      : unansweredCategories.slice(0, 3).map((u) => ({
          topic: u.category,
          issue: `Bu kategoride henüz ${u.total - u.answered} çözülmemiş soru bulunuyor.`,
          quickFix: getCategoryQuickFixClient(u.category),
        }));

  const mistakeInsights = wrongQuestions.slice(0, 4).map((wq) => ({
    questionId: wq.id,
    trapExplanation: `"${wq.userAnswer}" şıkkı güçlü bir çeldiricidir; ancak sorunun kökündeki anahtar ifade doğrudan "${wq.correctAnswer}" kavramına işaret eder.`,
    memoryRule: wq.practicalTip,
  }));

  const sprintPlan = [
    {
      timeBlock: 'İlk 15 Dakika — Banko & Mükerrer Sorular (8 Soru)',
      action:
        'PDF içinde 2 kez basılmış olan 8 mükerrer soruyu (Tedavi görüşmesi, Sosyal inceleme, Görüşmenin zayıf yanları, Kontrol görüşmesi, Yüzleştirme, Yerini değiştirme hatası, Veri kaydı ilkeleri, Sosyal inceleme raporu) %100 öğrenin.',
    },
    {
      timeBlock: 'Sonraki 25 Dakika — Yanlışların ve Çeldiricilerin Analizi',
      action:
        wrongQuestions.length > 0
          ? `Yanlış yaptığınız ${wrongQuestions.length} soruyu "Yanlışlarım" filtresiyle tekrar açın ve diğer şıkların neden yanlış olduğunu Pratik Bilgi kutularından okuyun.`
          : 'Henüz çözmediğiniz soruları "Anında Çözümlü Pratik" modunda hızla tarayın ve emin olmadığınız soruları "Tekrar Listeme Ekle" ile işaretleyin.',
    },
    {
      timeBlock: 'Sınavdan Önceki Son 15 Dakika — Kritik Liste Tekrarı',
      action:
        'Loewenberg & Dolgoff Etik Hiyerarşisi (1. Yaşamı koruma ... 6. Gizlilik), Egan 3 Aşama Modeli (Öykü -> Tercih Edilen Senaryo -> Eylem), Sistem Yaklaşımı (Güçlük=Birey, Problem=Sistem, Bütünlük=Parça Etkileşimi) şifrelerine son kez göz atın.',
    },
  ];

  return {
    readinessLevel,
    overallAccuracy,
    summary,
    weakAreas,
    mistakeInsights,
    sprintPlan,
    examTips: [
      'Soruda "ailesi, kardeşleri, okul ve iş yeri ile görüşülerek" diyorsa cevap her zaman SOSYAL İNCELEME (Görüşmesi / Raporu) olur.',
      'Soruda "tutum ve davranışların değiştirilmesi + psikolojik ilke ve prosedürler" diyorsa cevap TEDAVİ GÖRÜŞMESİ olur.',
      'İlişki kurma aşamasında YÜZLEŞTİRME asla yapılmaz; yüzleştirme için önce güven ve güçlü ilişki kurulmalıdır.',
      'Etik hiyerarşide en üstte İNSAN YAŞAMINI KORUMAK, şıklarda en sonda ise GİZLİLİK-MAHREMİYET gelir.',
      'Yorgunluk psikolojik değil FİZYOLOJİK/FİZİKSEL gürültü kaynağıdır; önyargı, heyecan, üzüntü, sevinç psikolojiktir.',
    ],
  };
}
