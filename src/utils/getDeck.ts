import { KanjiList, Level } from "../types.ts";
import { kanjiN4, kanjiN5 } from "../const/kanji.ts";

export const getDeck = (level: Level): KanjiList | null => {
  const lvl = level.toLowerCase();
  if (lvl === "n5") return kanjiN5;
  if (lvl === "n4") return kanjiN4;
  return null;
};
