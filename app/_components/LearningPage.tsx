'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Language } from '../_lib/i18n';
import type {
  ModuleContent,
  Quiz,
  FourChoiceQuiz,
  OXQuiz,
  OrderingQuiz,
} from '../_lib/learning-types';

// ─── UI strings ───────────────────────────────────────────────
const UI = {
  ja: {
    backToHome: 'ホームに戻る',
    progress: '進捗',
    sectionComplete: 'セクション完了',
    nextSection: '次のセクションへ',
    allComplete: '全セクション完了！',
    backToTop: 'トップに戻る',
    correct: '正解！',
    incorrect: '不正解',
    explanation: '解説',
    orderingHint: 'クリックして正しい順番に選んでください',
    orderingReset: '選択をリセット',
    correctOrder: '正しい順番',
    quizLabel: '確認問題',
    langToggle: 'EN',
    resetProgress: '進捗をリセット',
    resetConfirm: 'リセットしますか？',
    progressSaved: '進捗を保存中',
    mobile: {
      sections: 'セクション一覧',
    },
  },
  en: {
    backToHome: 'Back to Home',
    progress: 'Progress',
    sectionComplete: 'sections complete',
    nextSection: 'Next Section',
    allComplete: 'All Sections Complete!',
    backToTop: 'Back to Top',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
    orderingHint: 'Click items in the correct order',
    orderingReset: 'Reset',
    correctOrder: 'Correct order',
    quizLabel: 'Quiz',
    langToggle: 'JP',
    resetProgress: 'Reset progress',
    resetConfirm: 'Reset?',
    progressSaved: 'Progress saved',
    mobile: {
      sections: 'Sections',
    },
  },
} as const;

type UIStrings = (typeof UI)[keyof typeof UI];

// ─── Quiz state ────────────────────────────────────────────────
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

function storageKey(moduleKey: string, lang: string) {
  return `sap_progress_${moduleKey}_${lang}`;
}

function loadProgress(moduleKey: string, lang: string, module: ModuleContent): QuizState[][] {
  const blank = module.sections.map((s) => s.quizzes.map(() => initQuizState()));
  if (typeof window === 'undefined') return blank;
  try {
    const raw = localStorage.getItem(storageKey(moduleKey, lang));
    if (!raw) return blank;
    const parsed = JSON.parse(raw) as QuizState[][];
    if (
      Array.isArray(parsed) &&
      parsed.length === module.sections.length &&
      parsed.every((row, i) => Array.isArray(row) && row.length === module.sections[i].quizzes.length)
    ) {
      return parsed;
    }
  } catch {}
  return blank;
}

// ─── Sub-components ────────────────────────────────────────────

function ExplanationBox({ text, correct, ui }: {
  text: string;
  correct: boolean | null;
  ui: UIStrings;
}) {
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
          cls += 'border-gray-200 bg-gray-50 text-gray-400';
        }
        return (
          <button key={i} className={cls} onClick={() => !state.answered && onAnswer(i)} disabled={state.answered}>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              !state.answered ? 'border-gray-300 text-gray-500' :
              isCorrect ? 'border-green-500 bg-green-500 text-white' :
              isSelected ? 'border-red-400 bg-red-400 text-white' :
              'border-gray-300 text-gray-400'
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
          const userPos = orderClicks.indexOf(idx);
          const correctPos = quiz.correctOrder.indexOf(idx);
          const isCorrectPosition = answered && userPos === correctPos;

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
              {answered && !isCorrectPosition && userPos >= 0 && <span className="text-red-500 text-xs">✗</span>}
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

// ─── Main component ─────────────────────────────────────────────
export default function LearningPage({ module, lang, moduleKey }: {
  module: ModuleContent;
  lang: Language;
  moduleKey: string;
}) {
  const ui = UI[lang];
  const toggleHref = `?lang=${lang === 'ja' ? 'en' : 'ja'}`;

  const [currentSection, setCurrentSection] = useState(0);
  const [quizStates, setQuizStates] = useState<QuizState[][]>(() =>
    loadProgress(moduleKey, lang, module)
  );
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Persist progress to localStorage whenever quizStates changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(moduleKey, lang), JSON.stringify(quizStates));
    } catch {}
  }, [quizStates, moduleKey, lang]);

  const section = module.sections[currentSection];
  const sectionStates = quizStates[currentSection];
  const allAnswered = sectionStates.every((qs) => qs.answered);
  const isLastSection = currentSection === module.sections.length - 1;
  const completedSections = quizStates.filter((states) => states.every((qs) => qs.answered)).length;

  function updateQuizState(quizIdx: number, update: Partial<QuizState>) {
    setQuizStates((prev) => {
      const next = prev.map((row) => [...row]);
      next[currentSection][quizIdx] = { ...next[currentSection][quizIdx], ...update };
      return next;
    });
  }

  function handleFourChoice(quizIdx: number, selectedIndex: number) {
    const quiz = section.quizzes[quizIdx] as FourChoiceQuiz;
    updateQuizState(quizIdx, {
      answered: true,
      correct: selectedIndex === quiz.correctIndex,
      selectedIndex,
    });
  }

  function handleOX(quizIdx: number, selected: boolean) {
    const quiz = section.quizzes[quizIdx] as OXQuiz;
    updateQuizState(quizIdx, {
      answered: true,
      correct: selected === quiz.correct,
      selectedBool: selected,
    });
  }

  function handleOrderingClick(quizIdx: number, itemIndex: number) {
    const qs = quizStates[currentSection][quizIdx];
    const quiz = section.quizzes[quizIdx] as OrderingQuiz;
    if (qs.answered) return;

    const existingPos = qs.orderClicks.indexOf(itemIndex);
    const newClicks = existingPos >= 0
      ? qs.orderClicks.slice(0, existingPos)
      : [...qs.orderClicks, itemIndex];

    if (newClicks.length === quiz.items.length) {
      const correct = newClicks.every((idx, pos) => idx === quiz.correctOrder[pos]);
      updateQuizState(quizIdx, { answered: true, correct, orderClicks: newClicks });
    } else {
      updateQuizState(quizIdx, { orderClicks: newClicks });
    }
  }

  function handleOrderingReset(quizIdx: number) {
    updateQuizState(quizIdx, { orderClicks: [] });
  }

  function handleResetProgress() {
    const blank = module.sections.map((s) => s.quizzes.map(() => initQuizState()));
    setQuizStates(blank);
    setCurrentSection(0);
    setResetting(false);
    try {
      localStorage.removeItem(storageKey(moduleKey, lang));
    } catch {}
  }

  function renderQuiz(quiz: Quiz, idx: number) {
    const state = sectionStates[idx];
    return (
      <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
          {ui.quizLabel} {idx + 1}
        </p>
        <p className="text-gray-900 font-medium mb-4 leading-relaxed">{quiz.question}</p>

        {quiz.type === 'four-choice' && (
          <FourChoiceQuizView quiz={quiz} state={state} onAnswer={(i) => handleFourChoice(idx, i)} />
        )}
        {quiz.type === 'ox' && (
          <OXQuizView quiz={quiz} state={state} onAnswer={(v) => handleOX(idx, v)} />
        )}
        {quiz.type === 'ordering' && (
          <OrderingQuizView
            quiz={quiz}
            state={state}
            onItemClick={(i) => handleOrderingClick(idx, i)}
            onReset={() => handleOrderingReset(idx)}
            ui={ui}
          />
        )}

        {state.answered && (
          <ExplanationBox text={quiz.explanation} correct={state.correct} ui={ui} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0">
              ← {ui.backToHome}
            </Link>
            <span className="text-gray-300 hidden sm:block">|</span>
            <span className="font-semibold text-gray-900 text-sm truncate hidden sm:block">
              {module.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className="lg:hidden text-sm text-gray-600 border border-gray-300 rounded-lg px-2.5 py-1.5"
            >
              ☰ {ui.mobile.sections}
            </button>
            <Link
              href={toggleHref}
              className="text-sm font-semibold border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              🌐 {ui.langToggle}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setShowMobileSidebar(false)}>
          <div className="bg-white w-64 h-full p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <SidebarContent
              module={module}
              currentSection={currentSection}
              quizStates={quizStates}
              completedSections={completedSections}
              ui={ui}
              resetting={resetting}
              onSelect={(i) => { setCurrentSection(i); setShowMobileSidebar(false); }}
              onResetRequest={() => setResetting(true)}
              onResetConfirm={handleResetProgress}
              onResetCancel={() => setResetting(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-20">
            <SidebarContent
              module={module}
              currentSection={currentSection}
              quizStates={quizStates}
              completedSections={completedSections}
              ui={ui}
              resetting={resetting}
              onSelect={setCurrentSection}
              onResetRequest={() => setResetting(true)}
              onResetConfirm={handleResetProgress}
              onResetCancel={() => setResetting(false)}
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Section header */}
          <div>
            <p className="text-xs text-gray-500 mb-1">
              {currentSection + 1} / {module.sections.length}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{section.title}</h1>
          </div>

          {/* Explanation */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-4">
            {section.content.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-sm sm:text-base">{para}</p>
            ))}
          </div>

          {/* Quizzes */}
          <div className="space-y-4">
            {section.quizzes.map((quiz, i) => renderQuiz(quiz, i))}
          </div>

          {/* Next / complete button */}
          {allAnswered && (
            <div className="flex justify-end">
              {isLastSection ? (
                <div className="text-center w-full py-6">
                  <p className="text-lg font-bold text-green-700 mb-4">🎉 {ui.allComplete}</p>
                  <Link
                    href={`/?lang=${lang}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  >
                    {ui.backToTop}
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentSection((s) => s + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm"
                >
                  {ui.nextSection} →
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Sidebar content (shared between desktop and mobile) ────────
function SidebarContent({ module, currentSection, quizStates, completedSections, ui, resetting, onSelect, onResetRequest, onResetConfirm, onResetCancel }: {
  module: ModuleContent;
  currentSection: number;
  quizStates: QuizState[][];
  completedSections: number;
  ui: UIStrings;
  resetting: boolean;
  onSelect: (i: number) => void;
  onResetRequest: () => void;
  onResetConfirm: () => void;
  onResetCancel: () => void;
}) {
  const total = module.sections.length;
  const progressPct = Math.round((completedSections / total) * 100);

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{ui.progress}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">
          {completedSections} / {total} {ui.sectionComplete}
        </p>
      </div>

      {/* Section list */}
      <nav className="space-y-1">
        {module.sections.map((s, i) => {
          const done = quizStates[i].every((qs) => qs.answered);
          const isCurrent = i === currentSection;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(i)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                isCurrent
                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                  : done
                  ? 'text-gray-500 hover:bg-gray-100'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${
                done ? 'bg-green-500 border-green-500 text-white' :
                isCurrent ? 'border-blue-400 text-blue-600' :
                'border-gray-300 text-gray-400'
              }`}>
                {done ? '✓' : i + 1}
              </span>
              <span className="leading-snug">{s.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Reset progress */}
      <div className="pt-2 border-t border-gray-100">
        {resetting ? (
          <div className="space-y-1.5">
            <p className="text-xs text-gray-500">{ui.resetConfirm}</p>
            <div className="flex gap-2">
              <button
                onClick={onResetConfirm}
                className="flex-1 text-xs py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-semibold transition-colors"
              >
                OK
              </button>
              <button
                onClick={onResetCancel}
                className="flex-1 text-xs py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold transition-colors"
              >
                {ui.langToggle === 'EN' ? 'キャンセル' : 'Cancel'}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onResetRequest}
            className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-1 text-left"
          >
            ↺ {ui.resetProgress}
          </button>
        )}
      </div>
    </div>
  );
}
