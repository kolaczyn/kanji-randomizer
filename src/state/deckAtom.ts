import { atomWithImmer } from "jotai-immer";
import { KanjiList } from "../types.ts";

export type DeckAtomState = {
  deck: KanjiList;
  incorrect: number[];
  isIncorrect: boolean;
};

export const deckAtom = atomWithImmer<DeckAtomState>({
  deck: [],
  incorrect: [],
  isIncorrect: false,
});
