import React, { useState, useEffect } from 'react';
import {
  ALL_CATEGORIES,
  ExamQuestion,
  OptionKey,
  QuestionCategory,
} from '../data/questions';
import { QuizFilterMode } from '../utils/quizLogic';
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  HelpCircle,
  Layers,
  ListChecks,
  RotateCcw,
  Search,
  Sparkles,
  XCircle,
} from 'lucide-react';

interface QuizWorkspaceProps {
  questions: ExamQuestion[];
  allQuestionsCount: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: Record<number, OptionKey>;
  onSelectAnswer: (questionId: number, option: OptionKey) => void;
  onClearAnswer: (questionId: number) => void;
  onResetAllAnswers: () => void;
  bookmarkedIds: number[];
  onToggleBookmark: (questionId: number) => void;
  filterMode: QuizFilterMode;
  setFilterMode: (mode: QuizFilterMode) => void;
  selectedCategory: QuestionCategory | 'Tümü';
  setSelectedCategory: (cat: QuestionCategory | 'Tümü') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  examSimulationMode: boolean;
  setExamSimulationMode: (sim: boolean) => void;
  examSubmitted: boolean;
  setExamSubmitted: (sub: boolean) => void;
  onNavigateToAiAnalysis: () => void;
}

export const QuizWorkspace: React.FC<QuizWorkspaceProps> = ({
  questions,
  allQuestionsCount,
  currentIndex,
  setCurrentIndex,
  userAnswers,
  onSelectAnswer,
  onClearAnswer,
  onResetAllAnswers,
  bookmarkedIds,
  onToggleBookmark,
  filterMode,
  setFilterMode,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  examSimulationMode,
  setExamSimulationMode,
  examSubmitted,
  setExamSubmitted,
  onNavigateToAiAnalysis,
}) => {
  const [layoutMode, setLayoutMode] = useState<'single' | 'list'>('single');
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [aiExplainLoadingId, setAiExplainLoadingId] = useState<number | null>(null);
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [confirmReset, setConfirmReset] = useState(false);

  const safeIndex =
    questions.length > 0 ? Math.min(currentIndex, questions.length - 1) : 0;
  const currentQuestion = questions[safeIndex];

  // Keyboard navigation for single-card view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }
      if (layoutMode !== 'single' || !currentQuestion) return;

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
  }, [layoutMode, currentQuestion, safeIndex, questions.length, onSelectAnswer, setCurrentIndex]);

  const handleRequestAiExplain = async (q: ExamQuestion) => {
    if (aiExplainLoadingId === q.id) return;
    setAiExplainLoadingId(q.id);
    try {
      const correctOpt = q.options.find((o) => o.key === q.correctKey);
      const response = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          correctAnswer: correctOpt
            ? `${correctOpt.key}) ${correctOpt.text}`
            : q.correctKey,
          explanation: q.explanation,
          practicalTip: q.practicalTip,
        }),
      });
      const data = await response.json();
      if (data.reply) {
        setAiExplanations((prev) => ({ ...prev, [q.id]: data.reply }));
      }
    } catch {
      setAiExplanations((prev) => ({
        ...prev,
        [q.id]: `Hafıza Şifresi: ${q.practicalTip}\n\nDetay: ${q.explanation}`,
      }));
    } finally {
      setAiExplainLoadingId(null);
    }
  };

  const renderQuestionCard = (q: ExamQuestion, indexInFiltered: number) => {
    const selectedKey = userAnswers[q.id];
    const isAnswered = selectedKey !== undefined;
    const isCorrect = selectedKey === q.correctKey;
    const isBookmarked = bookmarkedIds.includes(q.id);
    const showSolution =
      !examSimulationMode || examSubmitted || isAnswered || revealedQuestions[q.id];
    const shouldHighlightResult =
      (!examSimulationMode && isAnswered) ||
      (examSimulationMode && examSubmitted && isAnswered) ||
      revealedQuestions[q.id];

    return (
      <article
        key={q.id}
        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs transition-all"
      >
        {/* Question Metadata Top Row (Zero-Pill Unboxed Text with Separators) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-mono-num font-semibold text-slate-900">
              Özgün Soru #{q.id} / {allQuestionsCount}
            </span>
            <span aria-hidden="true">·</span>
            <span>{q.pdfNumbers}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-sky-700">{q.category}</span>
            {q.isDuplicateInPdf && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-700">
                  ★ PDF&apos;de 2 Kez Soruldu (Yüksek Çıkma İhtimali)
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAnswered && (
              <button
                type="button"
                onClick={() => onClearAnswer(q.id)}
                className="min-h-[36px] px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                title="Bu sorudaki cevabımı temizle"
              >
                Cevabı Temizle
              </button>
            )}
            <button
              type="button"
              onClick={() => onToggleBookmark(q.id)}
              aria-label={`Soru ${q.id} favorilere ekle veya çıkar`}
              className={`min-h-[38px] px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
              <span>{isBookmarked ? 'Tekrar Listemde' : 'Tekrar Listesine Ekle'}</span>
            </button>
          </div>
        </div>

        {/* Duplicate Note Banner if applicable */}
        {q.isDuplicateInPdf && q.duplicateNote && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between gap-2">
            <span>
              <strong>Mükerrer Soru Birleştirmesi:</strong> {q.duplicateNote}
            </span>
          </div>
        )}

        {/* Roman Numeral Preface List if present */}
        {q.prefaceList && q.prefaceList.length > 0 && (
          <div className="mb-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            {q.prefaceList.map((item, idx) => (
              <p key={idx} className="text-sm text-slate-800 leading-relaxed font-medium">
                {item}
              </p>
            ))}
          </div>
        )}

        {/* Question Stem */}
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug mb-3.5">
          {indexInFiltered + 1}. {q.question}
        </h2>

        {/* 5 Options (A-E) with >=46px Touch Targets */}
        <div className="space-y-2" role="radiogroup" aria-label={`Soru ${q.id} seçenekleri`}>
          {q.options.map((opt) => {
            const isThisSelected = selectedKey === opt.key;
            const isThisCorrect = opt.key === q.correctKey;

            let optionStyle =
              'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/70';
            let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
            let statusLabel: React.ReactNode = null;

            if (shouldHighlightResult) {
              if (isThisCorrect) {
                optionStyle = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-medium';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                statusLabel = (
                  <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-emerald-800 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Doğru Cevap</span>
                  </span>
                );
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'bg-rose-50/90 border-rose-400 text-rose-950';
                badgeStyle = 'bg-rose-600 text-white border-rose-600';
                statusLabel = (
                  <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-rose-800 shrink-0">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Sizin Seçiminiz</span>
                  </span>
                );
              } else {
                optionStyle = 'bg-white border-slate-200 text-slate-500 opacity-85';
              }
            } else if (isThisSelected) {
              optionStyle = 'bg-sky-50 border-sky-600 text-slate-900 font-medium';
              badgeStyle = 'bg-sky-600 text-white border-sky-600';
              statusLabel = (
                <span className="ml-auto text-xs font-semibold text-sky-800 shrink-0">
                  Seçildi
                </span>
              );
            }

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onSelectAnswer(q.id, opt.key)}
                className={`w-full min-h-[46px] p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${optionStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg border text-xs sm:text-sm font-mono-num font-semibold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-[15px] leading-snug flex-1">{opt.text}</span>
                {statusLabel}
              </button>
            );
          })}
        </div>

        {/* Action to reveal answer without selecting, or when in Practice Mode */}
        {!shouldHighlightResult && (
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() =>
                setRevealedQuestions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
              }
              className="min-h-[40px] px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Cevabı ve Pratik Şifreyi Göster</span>
            </button>
            <span className="text-xs text-slate-500 hidden sm:inline">
              İpucu: Klavyeden A-E veya 1-5 tuşlarıyla hızlıca işaretleyebilirsiniz.
            </span>
          </div>
        )}

        {/* Explanation & Practical Exam Tip Box */}
        {showSolution && shouldHighlightResult && (
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-3.5">
            {/* Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {isAnswered ? (
                  isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Harika! Doğru yanıtladınız ({q.correctKey} şıkkı).</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700">
                      <XCircle className="w-4 h-4" />
                      <span>
                        Dikkat! Seçiminiz {selectedKey}, ancak doğru yanıt {q.correctKey} şıkkı.
                      </span>
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700">
                    <HelpCircle className="w-4 h-4" />
                    <span>Doğru Yanıt: {q.correctKey} Şıkkı</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleRequestAiExplain(q)}
                disabled={aiExplainLoadingId === q.id}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>
                  {aiExplainLoadingId === q.id
                    ? 'Yapay Zeka Hazırlıyor...'
                    : aiExplanations[q.id]
                    ? 'Yapay Zeka Notunu Yenile'
                    : 'Yapay Zekadan Vaka Örneği & Kodlama İste'}
                </span>
              </button>
            </div>

            {/* Practical Exam Password / Tip */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
              <div className="text-xs font-bold tracking-tight text-emerald-800 mb-1">
                PRATİK BİLGİ & SINAV ŞİFRESİ (AKILDA TUTMA KURALI)
              </div>
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                {q.practicalTip}
              </p>
            </div>

            {/* Detailed Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
              <div className="text-xs font-bold tracking-tight text-slate-700 mb-1">
                ANLAŞILIR ÇÖZÜM VE KAVRAMSAL AÇIKLAMA
              </div>
              <p className="text-sm leading-relaxed">{q.explanation}</p>
            </div>

            {/* AI Custom Memory Hook if requested */}
            {aiExplanations[q.id] && (
              <div className="p-4 rounded-xl bg-sky-50/90 border border-sky-200 text-slate-900">
                <div className="text-xs font-bold tracking-tight text-sky-800 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>YAPAY ZEKA HAFIZA ÇİVİSİ & SOMUT VAKA ÖRNEĞİ</span>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {aiExplanations[q.id]}
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="space-y-5">
      {/* Control & Filter Toolbar */}
      <section
        aria-label="Test filtreleri ve çalışma modu"
        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Interactive Filter Segmented Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all' as QuizFilterMode, label: 'Tüm Sorular (71)' },
              { id: 'duplicates' as QuizFilterMode, label: '★ Banko / Mükerrer (8)' },
              { id: 'unanswered' as QuizFilterMode, label: 'Çözülmemiş' },
              { id: 'wrong' as QuizFilterMode, label: 'Yanlışlarım' },
              { id: 'bookmarked' as QuizFilterMode, label: `Tekrar Listem (${bookmarkedIds.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setFilterMode(tab.id);
                  setCurrentIndex(0);
                }}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  filterMode === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mode & View Switchers */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Study Mode vs Simulation Mode */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setExamSimulationMode(false);
                  setExamSubmitted(false);
                }}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  !examSimulationMode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Anında Çözümlü Pratik
              </button>
              <button
                type="button"
                onClick={() => {
                  setExamSimulationMode(true);
                  setExamSubmitted(false);
                }}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  examSimulationMode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sınav Simülasyonu
              </button>
            </div>

            {/* Single Card vs All-in-one Rapid List */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setLayoutMode('single')}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
                  layoutMode === 'single'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tek Tek Çöz</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('list')}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
                  layoutMode === 'list'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Liste Görünümü</span>
              </button>
            </div>
          </div>
        </div>

        {/* Second Filter Row: Category Select + Search Input + Reset */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="sm:col-span-5">
            <label htmlFor="category-select" className="sr-only">
              Konu Kategorisi Seçin
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as QuestionCategory | 'Tümü');
                setCurrentIndex(0);
              }}
              className="w-full min-h-[42px] px-3.5 py-2 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-sky-600"
            >
              <option value="Tümü">Tüm Konu Başlıkları (6 Kategori)</option>
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-5 relative">
            <label htmlFor="question-search" className="sr-only">
              Soru veya kavram ara
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="question-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Soru, şık veya kavram ara (örn: Foucault, yüzleştirme, inceleme)..."
              className="w-full min-h-[42px] pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-600"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-end">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="w-full sm:w-auto min-h-[42px] px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 w-full justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onResetAllAnswers();
                    setRevealedQuestions({});
                    setConfirmReset(false);
                  }}
                  className="min-h-[40px] px-2.5 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg whitespace-nowrap shrink-0"
                >
                  Onayla
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="min-h-[40px] px-2.5 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-lg whitespace-nowrap shrink-0"
                >
                  İptal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Simulation Mode Status Bar if active */}
        {examSimulationMode && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              <strong>Gerçek Sınav Simülasyonu Aktif:</strong> Şıkları işaretleyin, bitirdiğinizde
              &ldquo;Sınavı Bitir ve Sonuçları Gör&rdquo; butonuna basın.
            </p>
            <button
              type="button"
              onClick={() => setExamSubmitted(!examSubmitted)}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              {examSubmitted ? 'Simülasyona Devam Et' : 'Sınavı Bitir ve Sonuçları Gör'}
            </button>
          </div>
        )}
      </section>

      {/* Empty State if Filter Has 0 Matches */}
      {questions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
          <p className="text-base font-semibold text-slate-900">
            Seçtiğiniz filtreye uygun soru bulunamadı.
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {filterMode === 'wrong'
              ? 'Harika! Şu ana kadar yanlış yanıtladığınız bir soru bulunmuyor.'
              : filterMode === 'bookmarked'
              ? 'Henüz tekrar listenize (favorilere) soru eklemediniz.'
              : 'Arama terimini veya kategori filtresini temizleyerek tüm 71 özgün soruya dönebilirsiniz.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterMode('all');
              setSelectedCategory('Tümü');
              setSearchQuery('');
              setCurrentIndex(0);
            }}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Tüm Soruları Göster (71 Soru)
          </button>
        </div>
      ) : layoutMode === 'single' && currentQuestion ? (
        /* Desktop 2-Column Split: Main Question Stage (8 cols) + Navigator Deck (4 cols) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            {renderQuestionCard(currentQuestion, safeIndex)}

            {/* Bottom Prev / Next Ergonomic Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={safeIndex === 0}
                onClick={() => setCurrentIndex(Math.max(0, safeIndex - 1))}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 disabled:opacity-40 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Önceki Soru</span>
              </button>

              <div className="text-xs font-mono-num text-slate-600 text-center">
                Soru <strong className="text-slate-900">{safeIndex + 1}</strong> / {questions.length}
              </div>

              {safeIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex(Math.min(questions.length - 1, safeIndex + 1))
                  }
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Sonraki Soru</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNavigateToAiAnalysis}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Yapay Zeka Analizini Gör</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Question Navigator Matrix & Quick Stats */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Soru Haritası ({questions.length} Soru)
              </h3>
              <button
                type="button"
                onClick={onNavigateToAiAnalysis}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap shrink-0"
              >
                AI Analiz Raporu →
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span>■ Yeşil: Doğru</span>
              <span>·</span>
              <span>■ Kırmızı: Yanlış</span>
              <span>·</span>
              <span>★ Mükerrer (Banko)</span>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-8 lg:grid-cols-6 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurr = idx === safeIndex;
                let btnClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';

                if (ans && (!examSimulationMode || examSubmitted)) {
                  if (ans === q.correctKey) {
                    btnClass = 'bg-emerald-600 text-white border-emerald-600 font-semibold';
                  } else {
                    btnClass = 'bg-rose-600 text-white border-rose-600 font-semibold';
                  }
                } else if (ans) {
                  btnClass = 'bg-sky-600 text-white border-sky-600 font-semibold';
                }

                if (isCurr) {
                  btnClass += ' ring-2 ring-slate-900 ring-offset-1';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Soru ${q.id}${q.isDuplicateInPdf ? ' (Mükerrer)' : ''}`}
                    className={`min-h-[38px] rounded-lg border text-xs font-mono-num flex items-center justify-center relative transition-all ${btnClass}`}
                  >
                    <span>{q.id}</span>
                    {q.isDuplicateInPdf && (
                      <span
                        className="absolute -top-1 -right-1 text-[10px] leading-none text-amber-500 font-bold"
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      ) : (
        /* List Mode: All Filtered Questions Rendered for Fast Scrolling */
        <div className="space-y-5">
          {questions.map((q, idx) => renderQuestionCard(q, idx))}
        </div>
      )}
    </div>
  );
};
