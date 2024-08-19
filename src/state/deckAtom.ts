import { atomWithImmer } from "jotai-immer";
import { KanjiList } from "../types.ts";
import { atom } from "jotai";

export type DeckAtomState = {
  deck: KanjiList;
  incorrect: number[];
  idx: number;
  isRevealed: boolean;
};

export const deckAtom = atomWithImmer<DeckAtomState>({
  deck: [],
  incorrect: [],
  idx: 0,
  isRevealed: false,
});

type KanjiExplanation = [string | null, string | null];

export const deckAtomKanjiExplanation = atom<KanjiExplanation>((get) => {
  const { deck, idx } = get(deckAtom);

  const element = deck[idx];
  if (element == null) return [null, null];
  const [kanji, explanation] = element;
  return [kanji, explanation];
});
