import React, { useState, useEffect } from 'react';
import { OptionKey } from '../data/questions';
import { OrderedExamQuestion, getSimpleFeedback } from '../utils/quizLogic';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Grid,
  Lightbulb,
  XCircle,
} from 'lucide-react';

interface QuizWorkspaceProps {
  questions: OrderedExamQuestion[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: Record<number, OptionKey>;
  onSelectAnswer: (questionId: number, option: OptionKey) => void;
  showOnlyWrong: boolean;
  setShowOnlyWrong: (val: boolean) => void;
  wrongCount: number;
}

export const QuizWorkspace: React.FC<QuizWorkspaceProps> = ({
  questions,
  currentIndex,
  setCurrentIndex,
  userAnswers,
  onSelectAnswer,
  showOnlyWrong,
  setShowOnlyWrong,
  wrongCount,
}) => {
  const [showNumberPicker, setShowNumberPicker] = useState(false);

  const safeIndex =
    questions.length > 0 ? Math.min(currentIndex, questions.length - 1) : 0;
  const currentQuestion = questions[safeIndex];

  // Klavyeden yön tuşları ve A-E / 1-5 ile hızlı kullanım
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion) return;

      if (e.key === 'ArrowRight' && safeIndex < questions.length - 1) {
        setCurrentIndex(safeIndex + 1);
      } else if (e.key === 'ArrowLeft' && safeIndex > 0) {
        setCurrentIndex(safeIndex - 1);
      } else {
        const keyMap: Record<string, OptionKey> = {
          '1': 'A',
          '2': 'B',
          '3': 'C',
          '4': 'D',
          '5': 'E',
          a: 'A',
          b: 'B',
          c: 'C',
          d: 'D',
          e: 'E',
          A: 'A',
          B: 'B',
          C: 'C',
          D: 'D',
          E: 'E',
        };
        const mapped = keyMap[e.key];
        if (mapped) {
          onSelectAnswer(currentQuestion.id, mapped);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, safeIndex, questions.length, onSelectAnswer, setCurrentIndex]);

  if (!currentQuestion) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
        <p className="text-lg font-semibold text-slate-900">
          Yanlış cevapladığınız soru kalmadı!
        </p>
        <button
          type="button"
          onClick={() => {
            setShowOnlyWrong(false);
            setCurrentIndex(0);
          }}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Tüm Sorulara Dön (71 Soru)
        </button>
      </div>
    );
  }

  const selectedKey = userAnswers[currentQuestion.id];
  const isAnswered = selectedKey !== undefined;
  const feedback = isAnswered ? getSimpleFeedback(currentQuestion, selectedKey) : null;
  const progressPercent = Math.round(((safeIndex + 1) / questions.length) * 100);

  return (
    <div className="space-y-4">
      {/* Üst İlerleme Çubuğu ve Konu Başlığı */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs sm:text-sm font-semibold text-slate-800">
            {currentQuestion.sectionTitle}
          </div>

          <div className="flex items-center gap-2">
            {wrongCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setShowOnlyWrong(!showOnlyWrong);
                  setCurrentIndex(0);
                }}
                className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  showOnlyWrong
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                {showOnlyWrong
                  ? 'Tüm Sorulara Dön (71)'
                  : `Sadece Yanlışlarımı Çöz (${wrongCount})`}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowNumberPicker(!showNumberPicker)}
              className="min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{showNumberPicker ? 'Listeyi Kapat' : 'Soru Seç (1–71)'}</span>
            </button>
          </div>
        </div>

        {/* İlerleme Çizgisi */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-600 transition-all duration-200 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* İsteğe Bağlı Açılır Soru Numarası Seçici */}
        {showNumberPicker && (
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>İstediğiniz soruya doğrudan geçmek için numaraya tıklayın:</span>
              <span>Yeşil: Doğru · Kırmızı: Yanlış</span>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5 max-h-56 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurr = idx === safeIndex;
                let btnColor = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (ans) {
                  btnColor =
                    ans === q.correctKey
                      ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                      : 'bg-rose-600 text-white border-rose-600 font-semibold';
                }
                if (isCurr) {
                  btnColor += ' ring-2 ring-slate-900 ring-offset-1';
                }
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNumberPicker(false);
                    }}
                    className={`h-8 rounded-lg border text-xs font-mono-num flex items-center justify-center transition-all cursor-pointer ${btnColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Ana Soru Kartı */}
      <article className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
        {/* Üst Bilgi Satırı */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-num font-bold text-slate-900 text-sm">
              Soru {safeIndex + 1} / {questions.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>{currentQuestion.category}</span>
            {currentQuestion.isDuplicateInPdf && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-700">
                  ★ Mükerrer Soru Birleştirildi (Dosyada 2 kez geçti)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Romen Rakamlı Öncüller (Varsa) */}
        {currentQuestion.prefaceList && currentQuestion.prefaceList.length > 0 && (
          <div className="mb-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            {currentQuestion.prefaceList.map((item, idx) => (
              <p key={idx} className="text-sm sm:text-base text-slate-800 font-medium">
                {item}
              </p>
            ))}
          </div>
        )}

        {/* Soru Metni */}
        <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-snug mb-5">
          {safeIndex + 1}. {currentQuestion.question}
        </h1>

        {/* Şıklar (A - E) */}
        <div
          className="space-y-2.5"
          role="radiogroup"
          aria-label={`Soru ${safeIndex + 1} seçenekleri`}
        >
          {currentQuestion.options.map((opt) => {
            const isThisSelected = selectedKey === opt.key;
            const isThisCorrect = opt.key === currentQuestion.correctKey;

            let optionStyle =
              'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';
            let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
            let statusBadge: React.ReactNode = null;

            if (isAnswered) {
              if (isThisCorrect) {
                optionStyle =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                statusBadge = (
                  <span className="ml-auto flex items-center gap-1 text-xs font-bold text-emerald-800 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Doğru Cevap</span>
                  </span>
                );
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-medium';
                badgeStyle = 'bg-rose-600 text-white border-rose-600';
                statusBadge = (
                  <span className="ml-auto flex items-center gap-1 text-xs font-bold text-rose-800 shrink-0">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Yanlış Seçim</span>
                  </span>
                );
              } else {
                optionStyle = 'bg-white border-slate-200 text-slate-500 opacity-80';
              }
            }

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onSelectAnswer(currentQuestion.id, opt.key)}
                className={`w-full min-h-[48px] p-3 sm:px-4 sm:py-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${optionStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg border text-xs sm:text-sm font-mono-num font-bold flex items-center justify-center shrink-0 ${badgeStyle}`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-base leading-snug flex-1">
                  {opt.text}
                </span>
                {statusBadge}
              </button>
            );
          })}
        </div>

        {/* Cevap Verildiğinde Açılan Basit Türkçe Açıklama Alanı */}
        {feedback && (
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-3.5">
            {/* Yanlış Cevap Verildiyse: NEDEN YANLIŞ Kutusu */}
            {!feedback.isCorrect && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-rose-800">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    Seçtiğiniz {feedback.selectedKey} Şıkkı Neden Yanlış?
                  </span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  {feedback.whyWrongExplanation}
                </p>
              </div>
            )}

            {/* Her Durumda: DOĞRU CEVAP NEDEN DOĞRU Kutusu */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5">
              <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {feedback.isCorrect
                    ? `Doğru Cevap (${feedback.correctKey} Şıkkı) — Neden Doğru?`
                    : `Doğru Cevap: ${feedback.correctOptionText} — Neden Doğru?`}
                </span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed">
                {feedback.whyCorrectExplanation}
              </p>
            </div>

            {/* Kısa Akılda Tutma İpucu */}
            <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="font-bold">Akılda Tut: </strong>
                {feedback.simpleTip}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Alt İleri / Geri Gezinme Çubuğu */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={safeIndex === 0}
          onClick={() => {
            setCurrentIndex(Math.max(0, safeIndex - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 disabled:opacity-40 text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Önceki Soru</span>
        </button>

        <div className="text-xs sm:text-sm font-mono-num text-slate-600 text-center">
          <strong className="text-slate-900">{safeIndex + 1}</strong> / {questions.length}
        </div>

        <button
          type="button"
          disabled={safeIndex >= questions.length - 1}
          onClick={() => {
            setCurrentIndex(Math.min(questions.length - 1, safeIndex + 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer ${
            isAnswered
              ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <span>Sonraki Soru</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
