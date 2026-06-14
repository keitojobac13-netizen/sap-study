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

export type Section = {
  id: string;
  title: string;
  content: string[]; // paragraphs
  quizzes: Quiz[];
};

export type ModuleContent = {
  id: string;
  title: string;
  description: string;
  sections: Section[];
};
