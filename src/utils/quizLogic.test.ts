import test from 'node:test';
import assert from 'node:assert/strict';
import { EXAM_QUESTIONS, DUPLICATE_PAIRS_REPORT } from '../data/questions';
import {
  calculateQuizStats,
  filterQuestions,
  getOrderedQuestions,
  getSimpleFeedback,
  getWrongQuestionsDetails,
} from './quizLogic';

test('PDF deduplication integrity: 79 raw questions reduced by 8 duplicates to 71 unique questions', () => {
  assert.equal(EXAM_QUESTIONS.length, 71);
  assert.equal(DUPLICATE_PAIRS_REPORT.length, 8);

  const duplicateFlagged = EXAM_QUESTIONS.filter((q) => q.isDuplicateInPdf);
  assert.equal(duplicateFlagged.length, 8);

  // Verify every mergedQuestionId in DUPLICATE_PAIRS_REPORT points to a valid duplicate-flagged question
  for (const pair of DUPLICATE_PAIRS_REPORT) {
    const found = EXAM_QUESTIONS.find((q) => q.id === pair.mergedQuestionId);
    assert.ok(found, `Missing question for mergedQuestionId ${pair.mergedQuestionId}`);
    assert.equal(found.isDuplicateInPdf, true);
    assert.equal(found.duplicateCount, 2);
  }
});

test('getOrderedQuestions sorts all 71 unique questions into logical learning order with zero duplicates', () => {
  const ordered = getOrderedQuestions(EXAM_QUESTIONS);
  assert.equal(ordered.length, 71);

  const uniqueIds = new Set(ordered.map((q) => q.id));
  assert.equal(uniqueIds.size, 71);

  // First section is communication basics (Question ID 4 is step 1)
  assert.equal(ordered[0].id, 4);
  assert.equal(ordered[0].stepNumber, 1);
  assert.ok(ordered[0].sectionTitle.includes('1. Bölüm'));

  // Last section is recording and reporting (Question ID 44 is step 71)
  assert.equal(ordered[70].id, 44);
  assert.equal(ordered[70].stepNumber, 71);
  assert.ok(ordered[70].sectionTitle.includes('7. Bölüm'));
});

test('getSimpleFeedback returns clear why-wrong and why-correct explanations in simple Turkish', () => {
  const q4 = EXAM_QUESTIONS.find((q) => q.id === 4)!; // Correct is C
  const wrongFeedback = getSimpleFeedback(q4, 'A');
  assert.equal(wrongFeedback.isCorrect, false);
  assert.ok(wrongFeedback.whyWrongExplanation.length > 20);
  assert.ok(wrongFeedback.whyCorrectExplanation.length > 20);

  const rightFeedback = getSimpleFeedback(q4, 'C');
  assert.equal(rightFeedback.isCorrect, true);
  assert.equal(rightFeedback.whyWrongExplanation, '');
  assert.ok(rightFeedback.whyCorrectExplanation.length > 20);
});

test('Every question has 5 valid options (A-E), a valid correctKey, explanation, and practicalTip', () => {
  for (const q of EXAM_QUESTIONS) {
    assert.equal(q.options.length, 5, `Question ${q.id} should have 5 options`);
    const keys = q.options.map((o) => o.key);
    assert.deepEqual(keys, ['A', 'B', 'C', 'D', 'E']);
    assert.ok(keys.includes(q.correctKey), `Question ${q.id} has invalid correctKey`);
    assert.ok(q.explanation.length > 20, `Question ${q.id} explanation too short`);
    assert.ok(q.practicalTip.length > 10, `Question ${q.id} practicalTip too short`);
  }
});

test('calculateQuizStats computes accuracy, completion, and category breakdowns accurately', () => {
  const statsEmpty = calculateQuizStats(EXAM_QUESTIONS, {});
  assert.equal(statsEmpty.rawPdfQuestionCount, 79);
  assert.equal(statsEmpty.duplicateEliminatedCount, 8);
  assert.equal(statsEmpty.totalUniqueQuestions, 71);
  assert.equal(statsEmpty.answeredCount, 0);
  assert.equal(statsEmpty.accuracyPercent, 0);

  // Answer Q1 correctly (D) and Q2 wrongly (A instead of C)
  const statsPartial = calculateQuizStats(EXAM_QUESTIONS, {
    1: 'D',
    2: 'A',
  });
  assert.equal(statsPartial.answeredCount, 2);
  assert.equal(statsPartial.correctCount, 1);
  assert.equal(statsPartial.wrongCount, 1);
  assert.equal(statsPartial.accuracyPercent, 50);

  const wrongDetails = getWrongQuestionsDetails(EXAM_QUESTIONS, {
    1: 'D',
    2: 'A',
  });
  assert.equal(wrongDetails.length, 1);
  assert.equal(wrongDetails[0].id, 2);
});

test('filterQuestions filters by duplicates, wrong answers, bookmarks, category, and Turkish search query', () => {
  const dupOnly = filterQuestions(EXAM_QUESTIONS, {
    filterMode: 'duplicates',
    selectedCategory: 'Tümü',
    searchQuery: '',
    userAnswers: {},
    bookmarkedIds: [],
  });
  assert.equal(dupOnly.length, 8);

  const wrongOnly = filterQuestions(EXAM_QUESTIONS, {
    filterMode: 'wrong',
    selectedCategory: 'Tümü',
    searchQuery: '',
    userAnswers: { 1: 'D', 2: 'A', 4: 'A' },
    bookmarkedIds: [],
  });
  assert.equal(wrongOnly.length, 2);
  assert.deepEqual(
    wrongOnly.map((q) => q.id),
    [2, 4]
  );

  const searchFoucault = filterQuestions(EXAM_QUESTIONS, {
    filterMode: 'all',
    selectedCategory: 'Tümü',
    searchQuery: 'Foucault',
    userAnswers: {},
    bookmarkedIds: [],
  });
  assert.equal(searchFoucault.length, 1);
  assert.equal(searchFoucault[0].id, 45);
});


