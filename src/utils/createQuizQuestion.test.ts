import {populateQuiz} from './createQuizQuestion';

describe('populateQuiz', () => {
  it('should populate the other questions', () => {
    const shuffledKanaIds = ['h_0', 'h_1'];
    const questions = [];
    populateQuiz({
      answerId: 'h_0',
      shuffledKanaIds,
      numberOfQuestions: shuffledKanaIds.length,
      questions,
    });
    expect(questions).toStrictEqual([
      {column: 1, id: 'h_1', kana: 'い', reading: 'i', row: 0, type: 'h'},
    ]);
  });

  it('should fail', () => {
    const shuffledKanaIds = ['h_0'];
    const questions = [];
    populateQuiz({
      answerId: 'h_0',
      shuffledKanaIds,
      numberOfQuestions: shuffledKanaIds.length,
      questions,
    });
    expect(questions).toStrictEqual([]);
  });
});
