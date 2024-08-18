export type Level =
  | "n5"
  | "n4"
  | "n3"
  | "n2"
  | "n1"
  | "hiragana-with-dakuten"
  | "hiragana-without-dakuten"
  | "katakana-with-dakuten"
  | "katakana-without-dakuten";

// It's also used for hiragana and katakana, but whatever :p
export type KanjiList = [string, string][];

export type RouterState = {
  shouldShuffle: boolean;
};
