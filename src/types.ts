export type KanjiLevel = "n5" | "n4" | "n3" | "n2" | "n1";

export type KanaLevel =
  | "hiragana-with-dakuten"
  | "hiragana-without-dakuten"
  | "katakana-with-dakuten"
  | "katakana-without-dakuten";

export type Level = KanjiLevel | KanaLevel;

export type CardDto = {
  character: string;
  meaning: string;
  strokeImg: string | null;
};

export type DeckDto = {
  id: string;
  title: string;
  deck: CardDto[];
};

export type HomeTilesDto = {
  tiles: {
    id: string;
    title: string;
    length: number;
  }[];
};
