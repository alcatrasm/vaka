import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface CategoryStatInput {
  category: string;
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

interface WrongQuestionInput {
  id: number;
  question: string;
  category: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  practicalTip: string;
}

function buildFallbackAnalysis(
  categoryStats: CategoryStatInput[],
  wrongQuestions: WrongQuestionInput[],
  totalAnswered: number,
  totalCorrect: number,
  totalQuestions: number
) {
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const sortedWeak = [...categoryStats]
    .filter((c) => c.answered > 0 && c.accuracy < 80)
    .sort((a, b) => a.accuracy - b.accuracy);

  const unansweredCategories = [...categoryStats]
    .filter((c) => c.answered < c.total)
    .sort((a, b) => a.answered / a.total - b.answered / b.total);

  let readinessLevel = 'Başlangıç Aşaması';
  let summary = '';

  if (totalAnswered === 0) {
    readinessLevel = 'Henüz Test Çözülmedi — Hızlı Başlangıç Hazır';
    summary =
      'Sınava birkaç saat kala en yüksek verimi almak için öncePDF\'de 2 kez tekrar eden 8 kritik soruyu ("Mükerrer & Banko Sorular" filtresiyle) çözerek başlayın. Ardından Hızlandırılmış Eğitim modülündeki şifre tablolarına göz atıp Pratik Modda tüm 71 soruyu tamamlayın.';
  } else if (overallAccuracy >= 85 && totalAnswered >= 35) {
    readinessLevel = 'Sınava Hazır — Yüksek Başarı Potansiyeli';
    summary = `${totalAnswered} soruda %${overallAccuracy} doğruluk oranına ulaştınız. Temel kavramlara, görüşme aşamalarına ve etik ilkelere oldukça hâkimsiniz. Kalan sürede sadece yanlış yaptığınız ${wrongQuestions.length} sorunun "Pratik Şifre" kutularını tekrar etmeniz sınavda tam puana yaklaşmanızı sağlayacaktır.`;
  } else if (overallAccuracy >= 65) {
    readinessLevel = 'İyi Seviye — Nokta Atışı Tekrar Gerekli';
    summary = `${totalAnswered} soruda %${overallAccuracy} başarı gösterdiniz. Özellikle kavram ayrımları (Sosyal İnceleme vs. Teşhis/Tedavi, Yerini Değiştirme Hatası vs. İhmal Hatası, Etik Hiyerarşi sıralaması) üzerinde 20 dakikalık odaklanmış bir tekrar ile netlerinizi hızla artırabilirsiniz.`;
  } else {
    readinessLevel = 'Acil Odaklanma — Önce Pratik Şifreler';
    summary = `${totalAnswered} soruda %${overallAccuracy} doğruluk oranındasınız. Panik yapmayın! Sınav soruları doğrudan anahtar kelimeler üzerinden kurgulanmış. Önce "Hızlandırılmış Kamp" sekmesindeki kavram eşleştirmelerini okuyun, ardından "Anında Çözümlü Pratik" modunda her sorunun altındaki yeşil ipucu kutusunu okuyarak ilerleyin.`;
  }

  const weakAreas =
    sortedWeak.length > 0
      ? sortedWeak.slice(0, 3).map((w) => ({
          topic: w.category,
          issue: `${w.answered} sorudan ${w.wrong} tanesi yanlış (%${w.accuracy} başarı). Bu konudaki çeldirici şıklar arasında kavram karışıklığı yaşanıyor.`,
          quickFix: getCategoryQuickFix(w.category),
        }))
      : unansweredCategories.slice(0, 3).map((u) => ({
          topic: u.category,
          issue: `Bu kategoride henüz ${u.total - u.answered} çözülmemiş soru bulunuyor.`,
          quickFix: getCategoryQuickFix(u.category),
        }));

  const mistakeInsights = wrongQuestions.slice(0, 4).map((wq) => ({
    questionId: wq.id,
    trapExplanation: `"${wq.userAnswer}" şıkkı güçlü bir çeldiricidir; ancak sorunun kökündeki anahtar ifade doğrudan "${wq.correctAnswer}" kavramına işaret eder.`,
    memoryRule: wq.practicalTip,
  }));

  const sprintPlan = [
    {
      timeBlock: 'İlk 15 Dakika — Banko & Mükerrer Sorular',
      action:
        'PDF içinde 2 kez basılmış olan 8 mükerrer soruyu (Tedavi görüşmesi, Sosyal inceleme, Görüşmenin zayıf yanları, Kontrol görüşmesi, Yüzleştirme, Yerini değiştirme hatası, Veri kaydı ilkeleri, Sosyal inceleme raporu) %100 öğrenin. Hocanın soru havuzunda ağırlığı en yüksek sorulardır.',
    },
    {
      timeBlock: 'Sonraki 25 Dakika — Yanlışların ve Çeldiricilerin Analizi',
      action:
        wrongQuestions.length > 0
          ? `Yanlış yaptığınız ${wrongQuestions.length} soruyu "Yanlışlarım" filtresiyle tekrar açın ve sadece doğru cevabı değil, diğer şıkların neden yanlış olduğunu Pratik Bilgi kutularından okuyun.`
          : 'Henüz çözmediğiniz soruları "Anında Çözümlü Pratik" modunda hızla tarayın ve emin olmadığınız soruları "Favori/Tekrar" listesine ekleyin.',
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

function getCategoryQuickFix(category: string): string {
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  app.post('/api/ai-analysis', async (req, res) => {
    try {
      const {
        categoryStats = [],
        wrongQuestions = [],
        totalAnswered = 0,
        totalCorrect = 0,
        totalQuestions = 71,
      } = req.body || {};

      const fallback = buildFallbackAnalysis(
        categoryStats,
        wrongQuestions,
        totalAnswered,
        totalCorrect,
        totalQuestions
      );

      const ai = getGenAIClient();
      if (!ai) {
        return res.json({ analysis: fallback, source: 'smart-engine' });
      }

      const prompt = `Sen Sosyal Hizmet Görüşme İlke ve Teknikleri (Vaka Çalışması) dersi profesörüsün. Öğrenci birkaç saat içinde sınava girecek.
Öğrencinin şu anki test performansı:
- Toplam Özgün Soru: ${totalQuestions}
- Çözülen Soru: ${totalAnswered}
- Doğru Sayısı: ${totalCorrect}
- Kategori Bazlı Performans: ${JSON.stringify(categoryStats)}
- Yanlış Yapılan Sorular (İlk 8): ${JSON.stringify(wrongQuestions.slice(0, 8))}

Lütfen öğrenciye sınava birkaç saat kala maksimum net kazandıracak, motive edici, net ve nokta atışı bir sınav analizi hazırla.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Sen uzman bir Sosyal Hizmet akademisyeni ve sınav koçusun. Yanıtlarını Türkçe, çok net, akılda kalıcı şifrelerle ve JSON şemasına tam uygun olarak ver.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              readinessLevel: { type: Type.STRING },
              overallAccuracy: { type: Type.INTEGER },
              summary: { type: Type.STRING },
              weakAreas: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    topic: { type: Type.STRING },
                    issue: { type: Type.STRING },
                    quickFix: { type: Type.STRING },
                  },
                  required: ['topic', 'issue', 'quickFix'],
                },
              },
              mistakeInsights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    questionId: { type: Type.INTEGER },
                    trapExplanation: { type: Type.STRING },
                    memoryRule: { type: Type.STRING },
                  },
                  required: ['questionId', 'trapExplanation', 'memoryRule'],
                },
              },
              sprintPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timeBlock: { type: Type.STRING },
                    action: { type: Type.STRING },
                  },
                  required: ['timeBlock', 'action'],
                },
              },
              examTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'readinessLevel',
              'overallAccuracy',
              'summary',
              'weakAreas',
              'mistakeInsights',
              'sprintPlan',
              'examTips',
            ],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      return res.json({
        analysis: {
          ...fallback,
          ...parsed,
        },
        source: 'gemini',
      });
    } catch (error) {
      console.error('AI analysis error, using structured fallback:', error);
      const {
        categoryStats = [],
        wrongQuestions = [],
        totalAnswered = 0,
        totalCorrect = 0,
        totalQuestions = 71,
      } = req.body || {};
      return res.json({
        analysis: buildFallbackAnalysis(
          categoryStats,
          wrongQuestions,
          totalAnswered,
          totalCorrect,
          totalQuestions
        ),
        source: 'smart-engine',
      });
    }
  });

  app.post('/api/ai-explain', async (req, res) => {
    try {
      const { question, options, correctAnswer, explanation, practicalTip, userQuery } = req.body || {};
      const defaultReply = `**Hafıza Şifresi & Vaka Özeti:**\n\n${practicalTip}\n\n**Detaylı Mantık:** ${explanation}\n\n**Sınavda Nasıl Ayırt Edilir?** Soru kökünde geçen anahtar kelimeleri doğrudan **${correctAnswer}** seçeneğiyle eşleştirin. Diğer seçenekler farklı aşama veya kavramlara aittir.`;

      const ai = getGenAIClient();
      if (!ai) {
        return res.json({ reply: defaultReply, source: 'smart-engine' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Soru: ${question}
Şıklar: ${JSON.stringify(options)}
Doğru Cevap: ${correctAnswer}
Mevcut Açıklama: ${explanation}
Pratik İpucu: ${practicalTip}
Öğrencinin Sorusu / İsteği: ${userQuery || 'Bu soruyu sınavda asla unutmamam için bana 1 somut vaka örneği ve 1 akılda kalıcı kodlama (hafıza çivisi) ver.'}`,
        config: {
          systemInstruction:
            'Sen Sosyal Hizmet Bölümü Vaka Çalışması ve Görüşme Teknikleri dersinin uzman hocasısın. Öğrenci birkaç saat içinde sınava girecek. Çok kısa, vurucu, akılda kalıcı bir hafıza şifresi ve 2 cümlelik somut bir vaka örneği ile açıkla.',
        },
      });

      return res.json({
        reply: response.text || defaultReply,
        source: 'gemini',
      });
    } catch (error) {
      console.error('AI explain error:', error);
      const { explanation = '', practicalTip = '', correctAnswer = '' } = req.body || {};
      return res.json({
        reply: `**Pratik Kodlama:** ${practicalTip}\n\n**Özeti:** ${explanation} (Doğru yanıt: ${correctAnswer})`,
        source: 'smart-engine',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
