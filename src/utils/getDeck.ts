import { KanjiList, Level } from "../types.ts";
import { kanjiN5 } from "../const/kanjiN5.ts";
import { kanjiN4 } from "../const/kanjiN4.ts";
import { kanjiN1 } from "../const/kanjiN1.ts";
import { kanjiN3 } from "../const/kanjiN3.ts";
import { kanjiN2 } from "../const/kanjiN2.ts";

export const getDeck = (level: Level): KanjiList | null => {
  const lvl = level.toLowerCase();
  switch (lvl) {
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
    default:
      return null;
  }
};
