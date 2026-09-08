'use client';

import { useState, useEffect } from 'react';
import type { Language } from '../_lib/i18n';
import type {
  Quiz,
  FourChoiceQuiz,
  OXQuiz,
  OrderingQuiz,
} from '../_lib/learning-types';

const UI = {
  ja: {
    correct: '正解！',
    incorrect: '不正解',
    explanation: '解説',
    orderingHint: 'クリックして正しい順番に選んでください',
    orderingReset: '選択をリセット',
    correctOrder: '正しい順番',
    quizLabel: '確認問題',
    heading: '理解度チェック',
    intro: 'このセクションの内容を確認しましょう。',
    score: '正答',
    retry: 'もう一度解く',
  },
  en: {
    correct: 'Correct!',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
    orderingHint: 'Click items in the correct order',
    orderingReset: 'Reset',
    correctOrder: 'Correct order',
    quizLabel: 'Quiz',
    heading: 'Check your understanding',
    intro: 'Test what you just read.',
    score: 'Score',
    retry: 'Try again',
  },
} as const;

type UIStrings = (typeof UI)[Language];

type QuizState = {
  answered: boolean;
  correct: boolean | null;
  selectedIndex: number | null;
  selectedBool: boolean | null;
  orderClicks: number[];
};

function initQuizState(): QuizState {
  return { answered: false, correct: null, selectedIndex: null, selectedBool: null, orderClicks: [] };
}

function storageKey(moduleKey: string, sectionId: string, lang: Language) {
  return `sap_quiz_${moduleKey}_${sectionId}_${lang}`;
}

function loadProgress(moduleKey: string, sectionId: string, lang: Language, count: number): QuizState[] {
  const blank = Array.from({ length: count }, initQuizState);
  if (typeof window === 'undefined') return blank;
  try {
    const raw = localStorage.getItem(storageKey(moduleKey, sectionId, lang));
    if (!raw) return blank;
    const parsed = JSON.parse(raw) as QuizState[];
    if (Array.isArray(parsed) && parsed.length === count) return parsed;
  } catch {}
  return blank;
}

// ─── Quiz views ────────────────────────────────────────────────

function ExplanationBox({ text, correct, ui }: { text: string; correct: boolean | null; ui: UIStrings }) {
  const isCorrect = correct === true;
  return (
    <div className={`mt-4 p-4 rounded-xl text-sm border ${
      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    }`}>
      <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
        {isCorrect ? `✓ ${ui.correct}` : `✗ ${ui.incorrect}`}　{ui.explanation}
      </p>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function FourChoiceQuizView({ quiz, state, onAnswer }: {
  quiz: FourChoiceQuiz;
  state: QuizState;
  onAnswer: (idx: number) => void;
}) {
  return (
    <div className="space-y-2">
      {quiz.choices.map((choice, i) => {
        const isSelected = state.selectedIndex === i;
        const isCorrect = i === quiz.correctIndex;
        let cls = 'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ';
        if (!state.answered) {
          cls += 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
        } else if (isCorrect) {
          cls += 'border-green-400 bg-green-50 text-green-800 font-medium';
        } else if (isSelected) {
          cls += 'border-red-300 bg-red-50 text-red-700';
        } else {
          cls += 'border-gray-200 bg-gray-50 text-gray-500';
        }
        return (
          <button key={i} className={cls} onClick={() => !state.answered && onAnswer(i)} disabled={state.answered}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              !state.answered ? 'border-gray-300 text-gray-500' :
              isCorrect ? 'border-green-500 bg-green-500 text-white' :
              isSelected ? 'border-red-400 bg-red-400 text-white' :
              'border-gray-300 text-gray-500'
            }`}>
              {['A', 'B', 'C', 'D'][i]}
            </span>
            <span className="flex-1">{choice}</span>
            {state.answered && isCorrect && <span className="text-green-600">✓</span>}
            {state.answered && isSelected && !isCorrect && <span className="text-red-500">✗</span>}
          </button>
        );
      })}
    </div>
  );
}

function OXQuizView({ quiz, state, onAnswer }: {
  quiz: OXQuiz;
  state: QuizState;
  onAnswer: (val: boolean) => void;
}) {
  return (
    <div className="flex gap-4">
      {([true, false] as const).map((val) => {
        const label = val ? '○' : '×';
        const isSelected = state.selectedBool === val;
        const isCorrect = quiz.correct === val;
        let cls = 'flex-1 py-8 text-4xl font-bold rounded-2xl border-2 transition-all ';
        if (!state.answered) {
          cls += val
            ? 'border-blue-300 text-blue-500 hover:bg-blue-50 hover:border-blue-400 cursor-pointer'
            : 'border-red-300 text-red-400 hover:bg-red-50 hover:border-red-400 cursor-pointer';
        } else if (isCorrect) {
          cls += 'border-green-400 bg-green-50 text-green-600';
        } else if (isSelected) {
          cls += 'border-red-300 bg-red-50 text-red-400';
        } else {
          cls += 'border-gray-200 bg-gray-50 text-gray-300';
        }
        return (
          <button key={String(val)} className={cls} onClick={() => !state.answered && onAnswer(val)} disabled={state.answered}>
            {label}
            {state.answered && isCorrect && <span className="block text-sm font-normal mt-1 text-green-600">✓</span>}
          </button>
        );
      })}
    </div>
  );
}

function OrderingQuizView({ quiz, state, onItemClick, onReset, ui }: {
  quiz: OrderingQuiz;
  state: QuizState;
  onItemClick: (idx: number) => void;
  onReset: () => void;
  ui: UIStrings;
}) {
  const { orderClicks, answered, correct } = state;

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">{ui.orderingHint}</p>
      <div className="flex flex-wrap gap-2">
        {quiz.items.map((item, idx) => {
          const clickPos = orderClicks.indexOf(idx);
          const isClicked = clickPos >= 0;
          const correctPos = quiz.correctOrder.indexOf(idx);
          const isCorrectPosition = answered && clickPos === correctPos;

          let cls = 'px-3 py-2 rounded-lg border text-sm transition-all flex items-center gap-2 ';
          if (answered) {
            cls += isCorrectPosition
              ? 'border-green-400 bg-green-50 text-green-800'
              : 'border-red-300 bg-red-50 text-red-700';
          } else if (isClicked) {
            cls += 'border-blue-400 bg-blue-50 text-blue-800 cursor-pointer';
          } else {
            cls += 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
          }

          return (
            <button key={idx} className={cls} onClick={() => !answered && onItemClick(idx)} disabled={answered}>
              {isClicked && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {clickPos + 1}
                </span>
              )}
              {item}
              {answered && isCorrectPosition && <span className="text-green-600 text-xs">✓</span>}
              {answered && !isCorrectPosition && clickPos >= 0 && <span className="text-red-500 text-xs">✗</span>}
            </button>
          );
        })}
      </div>

      {!answered && orderClicks.length > 0 && (
        <button onClick={onReset} className="text-xs text-gray-500 hover:text-gray-700 underline">
          {ui.orderingReset}
        </button>
      )}

      {answered && !correct && (
        <p className="text-xs text-gray-500 mt-1">
          {ui.correctOrder}: {quiz.correctOrder.map((i) => quiz.items[i]).join(' → ')}
        </p>
      )}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────

export default function SectionQuizzes({ quizzes, lang, moduleKey, sectionId }: {
  quizzes: Quiz[];
  lang: Language;
  moduleKey: string;
  sectionId: string;
}) {
  const ui = UI[lang];
  const [states, setStates] = useState<QuizState[]>(() =>
    Array.from({ length: quizzes.length }, initQuizState)
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Saved answers live in localStorage, which does not exist during SSR.
    // The first render therefore has to match the server (all unanswered),
    // and restoring progress can only happen once mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStates(loadProgress(moduleKey, sectionId, lang, quizzes.length));
    setHydrated(true);
  }, [moduleKey, sectionId, lang, quizzes.length]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey(moduleKey, sectionId, lang), JSON.stringify(states));
    } catch {}
  }, [states, hydrated, moduleKey, sectionId, lang]);

  function update(index: number, next: Partial<QuizState>) {
    setStates((prev) => prev.map((s, i) => (i === index ? { ...s, ...next } : s)));
  }

  function handleReset() {
    setStates(Array.from({ length: quizzes.length }, initQuizState));
  }

  function handleOrderClick(index: number, quiz: OrderingQuiz, itemIdx: number) {
    const state = states[index];
    if (state.orderClicks.includes(itemIdx)) return;
    const clicks = [...state.orderClicks, itemIdx];
    if (clicks.length < quiz.items.length) {
      update(index, { orderClicks: clicks });
      return;
    }
    const correct = clicks.every((item, pos) => quiz.correctOrder[pos] === item);
    update(index, { orderClicks: clicks, answered: true, correct });
  }

  const answeredCount = states.filter((s) => s.answered).length;
  const correctCount = states.filter((s) => s.correct === true).length;
  const allAnswered = answeredCount === quizzes.length && quizzes.length > 0;

  return (
    <section className="space-y-4" aria-labelledby="quiz-heading">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 id="quiz-heading" className="text-lg font-bold text-gray-900">{ui.heading}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{ui.intro}</p>
        </div>
        {allAnswered && (
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-700">
              {ui.score} {correctCount} / {quizzes.length}
            </p>
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold transition-colors"
            >
              ↺ {ui.retry}
            </button>
          </div>
        )}
      </div>

      {quizzes.map((quiz, i) => {
        const state = states[i];
        return (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 mb-2">
              {ui.quizLabel} {i + 1}
            </p>
            <p className="text-gray-900 font-medium mb-4 leading-relaxed">{quiz.question}</p>

            {quiz.type === 'four-choice' && (
              <FourChoiceQuizView
                quiz={quiz}
                state={state}
                onAnswer={(idx) =>
                  update(i, { answered: true, correct: idx === quiz.correctIndex, selectedIndex: idx })
                }
              />
            )}
            {quiz.type === 'ox' && (
              <OXQuizView
                quiz={quiz}
                state={state}
                onAnswer={(val) =>
                  update(i, { answered: true, correct: val === quiz.correct, selectedBool: val })
                }
              />
            )}
            {quiz.type === 'ordering' && (
              <OrderingQuizView
                quiz={quiz}
                state={state}
                ui={ui}
                onItemClick={(idx) => handleOrderClick(i, quiz, idx)}
                onReset={() => update(i, { orderClicks: [] })}
              />
            )}

            {state.answered && (
              <ExplanationBox text={quiz.explanation} correct={state.correct} ui={ui} />
            )}
          </div>
        );
      })}
    </section>
  );
}
