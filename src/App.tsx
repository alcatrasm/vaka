import { useState, useEffect, useMemo } from 'react';
import {
  EXAM_QUESTIONS,
  OptionKey,
  QuestionCategory,
} from './data/questions';
import {
  QuizFilterMode,
  calculateQuizStats,
  filterQuestions,
} from './utils/quizLogic';
import { QuizWorkspace } from './components/QuizWorkspace';
import { CrashCourseView } from './components/CrashCourseView';
import { DeduplicationView } from './components/DeduplicationView';
import { AiAnalysisView } from './components/AiAnalysisView';
import {
  BookOpen,
  CheckSquare,
  GitMerge,
  Sparkles,
} from 'lucide-react';

type ActiveTab = 'quiz' | 'crash-course' | 'deduplication' | 'ai-analysis';

const STORAGE_ANSWERS_KEY = 'vaka_sprint_answers_v1';
const STORAGE_BOOKMARKS_KEY = 'vaka_sprint_bookmarks_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');
  const [userAnswers, setUserAnswers] = useState<Record<number, OptionKey>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterMode, setFilterMode] = useState<QuizFilterMode>('all');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'Tümü'>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [examSimulationMode, setExamSimulationMode] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(userAnswers));
    } catch {
      // Ignore storage quota errors
    }
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  const stats = useMemo(
    () => calculateQuizStats(EXAM_QUESTIONS, userAnswers),
    [userAnswers]
  );

  const filteredQuestions = useMemo(
    () =>
      filterQuestions(EXAM_QUESTIONS, {
        filterMode,
        selectedCategory,
        searchQuery,
        userAnswers,
        bookmarkedIds,
      }),
    [filterMode, selectedCategory, searchQuery, userAnswers, bookmarkedIds]
  );

  const handleSelectAnswer = (questionId: number, option: OptionKey) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleClearAnswer = (questionId: number) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleResetAllAnswers = () => {
    setUserAnswers({});
    setExamSubmitted(false);
  };

  const handleToggleBookmark = (questionId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleJumpToQuestion = (questionId: number) => {
    setFilterMode('all');
    setSelectedCategory('Tümü');
    setSearchQuery('');
    const targetIdx = EXAM_QUESTIONS.findIndex((q) => q.id === questionId);
    setCurrentIndex(targetIdx >= 0 ? targetIdx : 0);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDuplicatesQuiz = () => {
    setFilterMode('duplicates');
    setSelectedCategory('Tümü');
    setSearchQuery('');
    setCurrentIndex(0);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCategoryPractice = (category: QuestionCategory) => {
    setFilterMode('all');
    setSelectedCategory(category);
    setSearchQuery('');
    setCurrentIndex(0);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeWrongQuestions = () => {
    setFilterMode('wrong');
    setSelectedCategory('Tümü');
    setSearchQuery('');
    setCurrentIndex(0);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 pb-20 md:pb-12">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('quiz');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
        >
          VakaSprint
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Ana gezinme"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quiz'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Soru Çözümü (71)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('crash-course')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'crash-course'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Hızlandırılmış Kamp
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('deduplication')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'deduplication'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Mükerrer Analizi (8 Çift)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai-analysis')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'ai-analysis'
                ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-2 decoration-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Yapay Zeka Analizi
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('ai-analysis')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Yapay Zeka Analizi Al
          </button>
        </div>
      </header>

      {/* Main Content Container (1440px Desktop Baseline with max-w-7xl) */}
      <main id="top" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 sm:pt-7 space-y-6">
        {/* Compact Sprint Context & Live Score Strip */}
        <section
          aria-label="Sınav hazırlık özeti"
          className="bg-white border border-slate-200 rounded-2xl p-4 sm:px-6 sm:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Sosyal Hizmet Görüşme İlke ve Teknikleri (Vaka Dersi)
              </span>
              <span aria-hidden="true">·</span>
              <span>79 PDF Sorusu İncelendi</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-medium">
                8 Mükerrer Çift Tek Soruya İndirgendi
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 font-medium">71 Özgün Soru + Pratik Şifre</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Sınava birkaç saat kala hızlı tekrar için her soruya anlaşılır çözüm, akılda kalıcı
              sınav şifresi ve yapay zeka analiz desteği eklendi.
            </p>
          </div>

          {/* Live Numeric Telemetry (Tabular Numerals, Unboxed) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
            <div>
              <div className="text-[11px] text-slate-500">Çözülen</div>
              <div className="text-sm sm:text-base font-bold font-mono-num text-slate-900">
                {stats.answeredCount} / {stats.totalUniqueQuestions}
              </div>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="text-[11px] text-slate-500">Doğru / Yanlış</div>
              <div className="text-sm sm:text-base font-bold font-mono-num">
                <span className="text-emerald-700">{stats.correctCount} D</span>
                <span className="text-slate-300 mx-1">/</span>
                <span className="text-rose-700">{stats.wrongCount} Y</span>
              </div>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="text-[11px] text-slate-500">Başarı Oranı</div>
              <div className="text-sm sm:text-base font-bold font-mono-num text-sky-700">
                %{stats.accuracyPercent}
              </div>
            </div>
          </div>
        </section>

        {/* Active View Stage */}
        {activeTab === 'quiz' && (
          <QuizWorkspace
            questions={filteredQuestions}
            allQuestionsCount={EXAM_QUESTIONS.length}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            userAnswers={userAnswers}
            onSelectAnswer={handleSelectAnswer}
            onClearAnswer={handleClearAnswer}
            onResetAllAnswers={handleResetAllAnswers}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            examSimulationMode={examSimulationMode}
            setExamSimulationMode={setExamSimulationMode}
            examSubmitted={examSubmitted}
            setExamSubmitted={setExamSubmitted}
            onNavigateToAiAnalysis={() => setActiveTab('ai-analysis')}
          />
        )}

        {activeTab === 'crash-course' && (
          <CrashCourseView
            onStartCategoryPractice={handleStartCategoryPractice}
            onStartDuplicatesPractice={handleStartDuplicatesQuiz}
          />
        )}

        {activeTab === 'deduplication' && (
          <DeduplicationView
            onJumpToQuestion={handleJumpToQuestion}
            onStartDuplicatesQuiz={handleStartDuplicatesQuiz}
          />
        )}

        {activeTab === 'ai-analysis' && (
          <AiAnalysisView
            questions={EXAM_QUESTIONS}
            userAnswers={userAnswers}
            stats={stats}
            onPracticeCategory={handleStartCategoryPractice}
            onPracticeWrongQuestions={handlePracticeWrongQuestions}
            onJumpToQuestion={handleJumpToQuestion}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar (Ergonomic Thumb Zone, <= 15% Sticky Cap) */}
      <nav
        aria-label="Mobil alt menü"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-4 items-center h-14 px-1"
      >
        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'quiz' ? 'text-sky-700 font-bold' : 'text-slate-600'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            Test (71)
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('crash-course')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'crash-course' ? 'text-sky-700 font-bold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            Özet Kamp
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('deduplication')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'deduplication' ? 'text-sky-700 font-bold' : 'text-slate-600'
          }`}
        >
          <GitMerge className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            Mükerrer (8)
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ai-analysis')}
          className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
            activeTab === 'ai-analysis' ? 'text-sky-700 font-bold' : 'text-slate-600'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            AI Analiz
          </span>
        </button>
      </nav>
    </div>
  );
}
