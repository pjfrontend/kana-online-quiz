export type KanaType = 'k' | 'h';

export interface KanaCharacter {
  id: string;
  row: number;
  kana: string;
  reading: string;
  type: KanaType;
  column: number;
}

export interface QuizQuestion {
  answer: KanaCharacter;
  questions: KanaCharacter[];
}

export interface KanaContextType {
  kana: KanaType;
  setKana: React.Dispatch<React.SetStateAction<KanaType>>;
  kanaLabel: string;
  shuffledKanaIds: string[];
  quizIndex: number;
  quizQuestion: QuizQuestion | undefined;
  incrementQuizQuestion: () => void;
  incrementCorrectQuestion: () => void;
  correctAnswersCount: number;
  resetQuiz: () => void;
  isLastQuizIndex: boolean;
}

export type AnswerType = 'correct' | 'wrong' | 'unanswered';
