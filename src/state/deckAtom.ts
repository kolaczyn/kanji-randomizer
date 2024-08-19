import { atomWithImmer } from "jotai-immer";
import { KanjiList } from "../types.ts";

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
