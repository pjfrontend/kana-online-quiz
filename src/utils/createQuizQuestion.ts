import {MAX_NUMBER_OF_QUESTIONS} from '../data/constants';
import {kana_list} from '../data/kana_list';
import {KanaCharacter, QuizQuestion} from '../data/types';
import {shuffleArray} from './shuffleArray';

const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const getKanaFromId = (id: string) => kana_list.find((x) => x.id === id)!;

export const populateQuiz = ({
  shuffledKanaIds,
  answerId,
  questions,
  numberOfQuestions,
}: {
  numberOfQuestions: number;
  answerId: string;
  shuffledKanaIds: string[];
  questions: KanaCharacter[];
}) => {
  for (let i = 0; i < numberOfQuestions - 1; i += 1) {
    let randomId = getRandomElement(shuffledKanaIds);
    while (randomId === answerId) {
      randomId = getRandomElement(shuffledKanaIds);
    }
    questions.push(getKanaFromId(randomId));
  }
};

export const createQuizQuestion = (
  quizIndex: number,
  shuffledKanaIds: string[]
): QuizQuestion | undefined => {
  if (shuffledKanaIds.length === 0) {
    return undefined;
  }

  const answerId = shuffledKanaIds[quizIndex];
  const answer = getKanaFromId(answerId);
  const questions: KanaCharacter[] = [answer];

  populateQuiz({
    shuffledKanaIds,
    answerId,
    questions,
    numberOfQuestions: MAX_NUMBER_OF_QUESTIONS,
  });

  return {
    answer,
    questions: shuffleArray(questions),
  };
};
