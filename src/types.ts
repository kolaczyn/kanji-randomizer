export type KanjiLevel = "n5" | "n4" | "n3" | "n2" | "n1";

export type KanaLevel =
  | "hiragana-with-dakuten"
  | "hiragana-without-dakuten"
  | "katakana-with-dakuten"
  | "katakana-without-dakuten";

export type Level = KanjiLevel | KanaLevel;

// It's also used for hiragana and katakana, but whatever :p
export type KanjiList = [string, string][];

export type RouterState = {
  shouldShuffle: boolean;
};

export type HomeScreenStatsDto = {
  n1: number;
  n2: number;
  n3: number;
  n4: number;
  n5: number;
  hiraganaWithDakuten: number;
  hiraganaWithoutDakuten: number;
  katakanaWithDakuten: number;
  katakanaWithoutDakuten: number;
};
