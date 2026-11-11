import React, { useState, useMemo } from 'react';
import { ExamQuestion, OptionKey, QuestionCategory } from '../data/questions';
import {
  AnalysisPayload,
  OverallQuizStats,
  buildInstantAnalysis,
  getWrongQuestionsDetails,
} from '../utils/quizLogic';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

interface AiAnalysisViewProps {
  questions: ExamQuestion[];
  userAnswers: Record<number, OptionKey>;
  stats: OverallQuizStats;
  onPracticeCategory: (category: QuestionCategory) => void;
  onPracticeWrongQuestions: () => void;
  onJumpToQuestion: (questionId: number) => void;
}

export const AiAnalysisView: React.FC<AiAnalysisViewProps> = ({
  questions,
  userAnswers,
  stats,
  onPracticeCategory,
  onPracticeWrongQuestions,
  onJumpToQuestion,
}) => {
  const instantAnalysis = useMemo(
    () => buildInstantAnalysis(stats, questions, userAnswers),
    [stats, questions, userAnswers]
  );

  const [customAiAnalysis, setCustomAiAnalysis] = useState<AnalysisPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const analysis = customAiAnalysis || instantAnalysis;

  const runDeepAiAnalysis = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const wrongQuestions = getWrongQuestionsDetails(questions, userAnswers);
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryStats: stats.categoryStats,
          wrongQuestions,
          totalAnswered: stats.answeredCount,
          totalCorrect: stats.correctCount,
          totalQuestions: stats.totalUniqueQuestions,
        }),
      });
      if (!response.ok) {
        setCustomAiAnalysis(instantAnalysis);
        return;
      }
      const data = await response.json();
      if (data.analysis) {
        setCustomAiAnalysis(data.analysis);
      }
    } catch {
      setCustomAiAnalysis(instantAnalysis);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Performance & AI Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-sky-700">Yapay Zeka Performans ve Konu Analizi</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">
                Çözülen: {stats.answeredCount} / {stats.totalUniqueQuestions}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">Doğruluk: %{stats.accuracyPercent}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Kişiselleştirilmiş Sınav Karnesi ve Son Saat Çalışma Stratejisi
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl">
              Çözdüğünüz sorular, yanlış yaptığınız şıklardaki çeldiriciler ve konu bazlı
              netleriniz analiz edilerek sınav öncesi en hızlı net artırma planı çıkarıldı.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {stats.wrongCount > 0 && (
              <button
                type="button"
                onClick={onPracticeWrongQuestions}
                className="min-h-[44px] px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Yanlışlarımı Tekrar Çöz ({stats.wrongCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={runDeepAiAnalysis}
              disabled={loading}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>
                {loading
                  ? 'Gemini AI Analiz Ediyor...'
                  : 'Yapay Zeka ile Derin Analizi Yenile'}
              </span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-xs text-slate-500">Tamamlanma Oranı</div>
            <div className="text-2xl font-bold font-mono-num text-slate-900 mt-1">
              %{stats.completionPercent}
            </div>
            <div className="text-xs text-slate-600 mt-1 font-mono-num">
              {stats.answeredCount} / {stats.totalUniqueQuestions} özgün soru
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="text-xs text-emerald-800">Doğru Yanıt</div>
            <div className="text-2xl font-bold font-mono-num text-emerald-900 mt-1">
              {stats.correctCount}
            </div>
            <div className="text-xs text-emerald-800 mt-1 font-mono-num">
              Başarı Oranı: %{stats.accuracyPercent}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80">
            <div className="text-xs text-rose-800">Yanlış Yanıt</div>
            <div className="text-2xl font-bold font-mono-num text-rose-900 mt-1">
              {stats.wrongCount}
            </div>
            <div className="text-xs text-rose-800 mt-1">
              {stats.wrongCount === 0
                ? 'Hatasız ilerliyorsunuz'
                : 'Öncelikli tekrar listesi'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/80">
            <div className="text-xs text-sky-800">Tahmini Sınav Puanı</div>
            <div className="text-2xl font-bold font-mono-num text-sky-900 mt-1">
              {stats.answeredCount > 0 ? `${stats.estimatedExamScore} / 100` : '— / 100'}
            </div>
            <div className="text-xs text-sky-800 mt-1">
              {stats.unansweredCount} soru henüz çözülmedi
            </div>
          </div>
        </div>

        {/* Category Performance Bars */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-slate-900">
            Konu Kategorilerine Göre Hakimiyet Tablosu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {stats.categoryStats.map((cat) => (
              <div
                key={cat.category}
                className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                    {cat.category}
                  </span>
                  <span className="text-xs font-mono-num text-slate-600">
                    {cat.correct} Doğru · {cat.wrong} Yanlış · {cat.total - cat.answered} Boş
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      cat.answered === 0
                        ? 'bg-slate-300'
                        : cat.accuracy >= 80
                        ? 'bg-emerald-600'
                        : cat.accuracy >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-600'
                    }`}
                    style={{
                      width: `${cat.answered > 0 ? Math.max(8, cat.accuracy) : 0}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-num font-medium text-slate-700">
                    {cat.answered > 0
                      ? `Doğruluk: %${cat.accuracy}`
                      : 'Henüz soru çözülmedi'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onPracticeCategory(cat.category)}
                    className="font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Bu Konuyu Çöz →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900">
          {errorMsg}
        </div>
      )}

      {/* AI Generated Insights Section (Zero-latency available) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Readiness Summary, Weak Areas & Wrong Question Traps */}
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
              <Sparkles className="w-4 h-4" />
              <span>YAPAY ZEKA GENEL DEĞERLENDİRMESİ</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Durum: {analysis.readinessLevel}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{analysis.summary}</p>
          </section>

          {/* Weak Areas & Quick Fixes */}
          <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">
                Öncelikli Odaklanılacak Konular ve Hızlı Çözüm Şifreleri
              </h2>
            </div>

            <div className="space-y-3">
              {analysis.weakAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="text-sm font-bold text-slate-900">{area.topic}</div>
                  <p className="text-xs text-slate-600">{area.issue}</p>
                  <div className="pt-1.5 text-xs sm:text-sm font-medium text-emerald-900">
                    <strong>Hızlı Telafi Kuralı:</strong> {area.quickFix}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mistake Insights if any wrong questions */}
          {analysis.mistakeInsights && analysis.mistakeInsights.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Yanlış Yaptığınız Sorulardaki Çeldirici Analizi
                </h2>
              </div>

              <div className="space-y-3">
                {analysis.mistakeInsights.map((mi, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-num font-bold text-rose-900">
                        Özgün Soru #{mi.questionId}
                      </span>
                      <button
                        type="button"
                        onClick={() => onJumpToQuestion(mi.questionId)}
                        className="text-xs font-semibold text-slate-900 underline underline-offset-4"
                      >
                        Soruya Git →
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800">{mi.trapExplanation}</p>
                    <div className="text-xs font-semibold text-emerald-900 bg-white/90 p-2.5 rounded-lg border border-emerald-200">
                      Hafıza Kuralı: {mi.memoryRule}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right 5 Columns: Sprint Plan & Golden Rules */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-700" />
              <h2 className="text-base font-bold text-slate-900">
                Sınava Girerken Son 55 Dakika Eylem Planı
              </h2>
            </div>

            <div className="space-y-3">
              {analysis.sprintPlan.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <div className="text-xs font-bold text-sky-800">{step.timeBlock}</div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Sınav Anında Net Kazandıran 5 Altın İpucu
              </h2>
            </div>

            <ul className="space-y-2.5">
              {analysis.examTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs sm:text-sm text-slate-800 leading-relaxed"
                >
                  <strong className="font-mono-num text-emerald-900 mr-1.5">
                    0{idx + 1}.
                  </strong>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
