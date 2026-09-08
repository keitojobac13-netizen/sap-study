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
    <div className={`mt-4 p-4 rounded-md text-[0.85rem] border ${
      isCorrect ? 'bg-green-50/70 border-green-200' : 'bg-red-50/70 border-red-200'
    }`}>
      <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
        {isCorrect ? `✓ ${ui.correct}` : `✗ ${ui.incorrect}`}　{ui.explanation}
      </p>
      <p className="text-ink-soft leading-[1.9]">{text}</p>
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
        let cls = 'w-full text-left px-4 py-3 rounded-md border text-[0.9rem] transition-colors flex items-center gap-3 ';
        if (!state.answered) {
          cls += 'border-rule bg-paper text-ink-soft hover:border-accent hover:bg-accent-soft cursor-pointer';
        } else if (isCorrect) {
          cls += 'border-green-400 bg-green-50 text-green-800 font-medium';
        } else if (isSelected) {
          cls += 'border-red-300 bg-red-50 text-red-700';
        } else {
          cls += 'border-rule bg-ground text-ink-mute';
        }
        return (
          <button key={i} className={cls} onClick={() => !state.answered && onAnswer(i)} disabled={state.answered}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              !state.answered ? 'border-rule text-ink-mute' :
              isCorrect ? 'border-green-500 bg-green-500 text-white' :
              isSelected ? 'border-red-400 bg-red-400 text-white' :
              'border-rule text-ink-mute'
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
    <div className="flex gap-3">
      {([true, false] as const).map((val) => {
        const label = val ? '○' : '×';
        const isSelected = state.selectedBool === val;
        const isCorrect = quiz.correct === val;
        let cls = 'flex-1 py-5 text-2xl font-bold rounded-md border transition-colors ';
        if (!state.answered) {
          cls += val
            ? 'border-rule text-accent hover:bg-accent-soft hover:border-accent cursor-pointer'
            : 'border-rule text-ink-mute hover:bg-ground hover:border-ink-mute cursor-pointer';
        } else if (isCorrect) {
          cls += 'border-green-400 bg-green-50 text-green-600';
        } else if (isSelected) {
          cls += 'border-red-300 bg-red-50 text-red-400';
        } else {
          cls += 'border-rule bg-ground text-ink-mute';
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
      <p className="text-[0.75rem] text-ink-mute">{ui.orderingHint}</p>
      <div className="flex flex-wrap gap-2">
        {quiz.items.map((item, idx) => {
          const clickPos = orderClicks.indexOf(idx);
          const isClicked = clickPos >= 0;
          const correctPos = quiz.correctOrder.indexOf(idx);
          const isCorrectPosition = answered && clickPos === correctPos;

          let cls = 'px-3 py-2 rounded border text-[0.85rem] transition-colors flex items-center gap-2 ';
          if (answered) {
            cls += isCorrectPosition
              ? 'border-green-400 bg-green-50 text-green-800'
              : 'border-red-300 bg-red-50 text-red-700';
          } else if (isClicked) {
            cls += 'border-accent bg-accent-soft text-accent cursor-pointer';
          } else {
            cls += 'border-rule bg-paper text-ink-soft hover:border-accent hover:bg-accent-soft cursor-pointer';
          }

          return (
            <button key={idx} className={cls} onClick={() => !answered && onItemClick(idx)} disabled={answered}>
              {isClicked && (
                <span className="w-5 h-5 rounded-full bg-accent text-white text-[0.7rem] font-bold flex items-center justify-center flex-shrink-0">
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
        <button onClick={onReset} className="text-[0.75rem] text-ink-mute hover:text-ink underline underline-offset-2">
          {ui.orderingReset}
        </button>
      )}

      {answered && !correct && (
        <p className="text-[0.75rem] text-ink-mute mt-1">
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
    <section className="space-y-4 border-t border-rule pt-8" aria-labelledby="quiz-heading">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 id="quiz-heading" className="text-[1.15rem] font-bold text-ink tracking-tight">{ui.heading}</h2>
          <p className="text-[0.82rem] text-ink-mute mt-1">{ui.intro}</p>
        </div>
        {allAnswered && (
          <div className="flex items-center gap-3">
            <p className="text-[0.85rem] font-semibold text-ink-soft">
              {ui.score} {correctCount} / {quizzes.length}
            </p>
            <button
              onClick={handleReset}
              className="text-[0.75rem] px-3 py-1.5 rounded border border-rule text-ink-soft hover:border-ink-mute hover:text-ink font-medium transition-colors"
            >
              ↺ {ui.retry}
            </button>
          </div>
        )}
      </div>

      {quizzes.map((quiz, i) => {
        const state = states[i];
        return (
          <div key={i} className="rounded-md border border-rule bg-paper p-5 sm:p-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-mute mb-2">
              {ui.quizLabel} {i + 1}
            </p>
            <p className="text-ink font-medium mb-4 leading-[1.8]">{quiz.question}</p>

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
