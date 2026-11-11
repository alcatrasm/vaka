import { useState, useEffect, useMemo } from 'react';
import { EXAM_QUESTIONS, OptionKey } from './data/questions';
import {
  calculateQuizStats,
  getOrderedQuestions,
} from './utils/quizLogic';
import { QuizWorkspace } from './components/QuizWorkspace';
import { RotateCcw } from 'lucide-react';

const STORAGE_ANSWERS_KEY = 'vaka_sprint_answers_v2';

export default function App() {
  const [userAnswers, setUserAnswers] = useState<Record<number, OptionKey>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showOnlyWrong, setShowOnlyWrong] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(userAnswers));
    } catch {
      // Ignore storage quota errors
    }
  }, [userAnswers]);

  // 71 özgün soru en mantıklı konu sırasına göre dizilir
  const orderedQuestions = useMemo(
    () => getOrderedQuestions(EXAM_QUESTIONS),
    []
  );

  const stats = useMemo(
    () => calculateQuizStats(EXAM_QUESTIONS, userAnswers),
    [userAnswers]
  );

  const displayedQuestions = useMemo(() => {
    if (!showOnlyWrong) return orderedQuestions;
    return orderedQuestions.filter((q) => {
      const ans = userAnswers[q.id];
      return ans !== undefined && ans !== q.correctKey;
    });
  }, [orderedQuestions, showOnlyWrong, userAnswers]);

  const handleSelectAnswer = (questionId: number, option: OptionKey) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleResetAll = () => {
    setUserAnswers({});
    setShowOnlyWrong(false);
    setCurrentIndex(0);
    setConfirmReset(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 pb-10">
      {/* Sade ve Net Üst Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="font-bold text-sm sm:text-base text-slate-900 truncate">
          Vaka Dersi Sıralı Soru Öğrenme
        </div>

        <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono-num shrink-0">
          <div>
            <span className="text-slate-500">Çözülen: </span>
            <strong className="text-slate-900">
              {stats.answeredCount}/{stats.totalUniqueQuestions}
            </strong>
          </div>
          <div>
            <strong className="text-emerald-700">{stats.correctCount} Doğru</strong>
            <span className="text-slate-300 mx-1.5">·</span>
            <strong className="text-rose-700">{stats.wrongCount} Yanlış</strong>
          </div>

          {stats.answeredCount > 0 && (
            <div>
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-sans font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sıfırla</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 font-sans">
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Evet, Sıfırla
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs cursor-pointer"
                  >
                    İptal
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Tek Sütunlu Odaklanmış Soru Çözüm Alanı */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-5 sm:pt-7">
        <QuizWorkspace
          questions={displayedQuestions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          userAnswers={userAnswers}
          onSelectAnswer={handleSelectAnswer}
          showOnlyWrong={showOnlyWrong}
          setShowOnlyWrong={setShowOnlyWrong}
          wrongCount={stats.wrongCount}
        />
      </main>
    </div>
  );
}
