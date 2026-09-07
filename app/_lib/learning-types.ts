export type FourChoiceQuiz = {
  type: 'four-choice';
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type OXQuiz = {
  type: 'ox';
  question: string;
  correct: boolean;
  explanation: string;
};

export type OrderingQuiz = {
  type: 'ordering';
  question: string;
  items: string[];
  correctOrder: number[]; // correctOrder[position] = item index
  explanation: string;
};

export type Quiz = FourChoiceQuiz | OXQuiz | OrderingQuiz;

// ─── Rich content blocks ───────────────────────────────────────
// Rendered on the server so the full article text is present in the
// initial HTML (required for search / AdSense crawlers).

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'note'; variant: 'tip' | 'warn' | 'info'; title: string; text: string }
  | { type: 'code'; caption?: string; code: string };

export type Section = {
  id: string;
  title: string;
  /** One-sentence summary. Used for meta description and hub cards. */
  summary?: string;
  /** Legacy plain paragraphs. Kept as a fallback while modules migrate to `body`. */
  content: string[];
  /** Rich article body. When present it replaces `content`. */
  body?: Block[];
  /** Extra search keywords for the section meta tags. */
  keywords?: string[];
  quizzes: Quiz[];
};

export type ModuleContent = {
  id: string;
  title: string;
  description: string;
  /** Longer lead paragraph shown on the module hub page. */
  intro?: string[];
  sections: Section[];
};

/** Paragraphs to render for a section, preferring the rich body. */
export function sectionBlocks(section: Section): Block[] {
  if (section.body && section.body.length > 0) return section.body;
  return section.content.map((text) => ({ type: 'p', text }) as Block);
}

/** Plain-text summary for meta descriptions, derived if not authored. */
export function sectionSummary(section: Section): string {
  if (section.summary) return section.summary;
  const first =
    section.body?.find((b): b is Extract<Block, { type: 'p' }> => b.type === 'p')?.text ??
    section.content[0] ??
    '';
  return first.length > 150 ? `${first.slice(0, 147)}…` : first;
}
