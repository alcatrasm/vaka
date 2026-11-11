import test from 'node:test';
import assert from 'node:assert/strict';
import { EXAM_QUESTIONS, DUPLICATE_PAIRS_REPORT } from '../data/questions';
import {
  calculateQuizStats,
  filterQuestions,
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
