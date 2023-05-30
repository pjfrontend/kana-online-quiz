import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {createQuizQuestion} from '../utils/createQuizQuestion';
import {shuffleArray} from '../utils/shuffleArray';
import {kana_list} from './kana_list';
import {KanaType, KanaContextType, QuizQuestion} from './types';

export const createNewShuffledKanaArray = ({
  kana,
  previousKana,
  setShuffledKanaIds,
  setPreviousKana,
}: {
  kana: KanaType;
  previousKana: KanaType | null;
  setShuffledKanaIds: React.Dispatch<React.SetStateAction<string[]>>;
  setPreviousKana: React.Dispatch<React.SetStateAction<KanaType | null>>;
}) => {
  // only create a new shuffled array if kana type has changed
  if (kana === previousKana) {
    return;
  }
  setShuffledKanaIds(
    shuffleArray(kana_list.filter((x) => x.type === kana).map((x) => x.id))
  );
  setPreviousKana(kana);
};

export const incrementQuizQuestionFactory = (
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  return () => {
    setQuizIndex((previousValue) => previousValue + 1);
  };
};

export const incrementCorrectQuestionFactory = (
  setCorrectAnswersCount: React.Dispatch<React.SetStateAction<number>>
) => {
  return () => {
    setCorrectAnswersCount((previousValue) => previousValue + 1);
  };
};

export const resetQuizFactory = ({
  setQuizIndex,
  setCorrectAnswersCount,
}: {
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  setCorrectAnswersCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return () => {
    setQuizIndex(0);
    setCorrectAnswersCount(0);
  };
};

export const KanaContext = createContext<KanaContextType>({} as KanaContextType);

export const KanaProvider: React.FC<any> = ({children}) => {
  const [kana, setKana] = useState<KanaType>('h');
  const [previousKana, setPreviousKana] = useState<KanaType | null>(null);
  const kanaLabel = useMemo(() => (kana === 'k' ? 'Katakana' : 'Hiragana'), [kana]);
  const [shuffledKanaIds, setShuffledKanaIds] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const incrementQuizQuestion = incrementQuizQuestionFactory(setQuizIndex);
  const incrementCorrectQuestion =
    incrementCorrectQuestionFactory(setCorrectAnswersCount);
  const resetQuiz = resetQuizFactory({setQuizIndex, setCorrectAnswersCount});

  const quizQuestion: QuizQuestion | undefined = useMemo(
    () => createQuizQuestion(quizIndex, shuffledKanaIds),
    [quizIndex, shuffledKanaIds]
  );

  const isLastQuizIndex = useMemo(
    () => quizIndex + 1 === shuffledKanaIds.length,
    [quizIndex, shuffledKanaIds]
  );

  useEffect(() => {
    createNewShuffledKanaArray({
      kana,
      previousKana,
      setShuffledKanaIds,
      setPreviousKana,
    });
  }, [kana, previousKana]);

  return (
    <KanaContext.Provider
      value={{
        kana,
        setKana,
        kanaLabel,
        shuffledKanaIds,
        quizIndex,
        quizQuestion,
        incrementQuizQuestion,
        correctAnswersCount,
        resetQuiz,
        isLastQuizIndex,
        incrementCorrectQuestion,
      }}
    >
      {children}
    </KanaContext.Provider>
  );
};

export const useKanaContext = () => useContext(KanaContext);
