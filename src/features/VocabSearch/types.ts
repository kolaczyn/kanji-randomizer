export type VocabDto = {
  results: { jap: string; eng: string; kana: string }[];
  timeMs: number;
};

export type NumStr = `${number}`;

export type QuizType = "no-quiz" | "hide-kanji" | "hide-vocab";

export type VocabSearchForm = {
  quizType: QuizType;
  text: string;
  min: NumStr;
  max: NumStr;
  onlyKanji: boolean;
};
