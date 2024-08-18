import { KanjiList, Level } from "../types.ts";
import { kanjiN5 } from "../const/kanjiN5.ts";
import { kanjiN4 } from "../const/kanjiN4.ts";
import { kanjiN1 } from "../const/kanjiN1.ts";
import { kanjiN3 } from "../const/kanjiN3.ts";
import { kanjiN2 } from "../const/kanjiN2.ts";
import {
  hiraganaWithDakuten,
  hiraganaWithoutDakuten,
} from "../const/hiragana.ts";
import {
  katakanaWithDakuten,
  katakanaWithoutDakuten,
} from "../const/katakana.ts";

export const getDeck = (level: Level): KanjiList | null => {
  switch (level) {
    case "n5":
      return kanjiN5;
    case "n4":
      return kanjiN4;
    case "n3":
      return kanjiN3;
    case "n2":
      return kanjiN2;
    case "n1":
      return kanjiN1;
    case "hiragana-with-dakuten":
      return hiraganaWithDakuten;
    case "hiragana-without-dakuten":
      return hiraganaWithoutDakuten;
    case "katakana-with-dakuten":
      return katakanaWithDakuten;
    case "katakana-without-dakuten":
      return katakanaWithoutDakuten;
    default:
      return null;
  }
};
