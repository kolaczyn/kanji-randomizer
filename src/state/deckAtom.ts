import { atomWithImmer } from "jotai-immer";
import { CardDto } from "../types.ts";
import { atom } from "jotai";

export type DeckAtomState = {
  deck: CardDto[];
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

type KanjiExplanation = {
  character: string;
  meaning: string;
  strokeImg: string | null;
  isKanji: boolean;
} | null;

export const deckAtomKanjiExplanation = atom<KanjiExplanation>((get) => {
  const { deck, idx } = get(deckAtom);

  const element = deck[idx];
  if (element == null) return null;
  return {
    character: element.character,
    meaning: element.meaning,
    strokeImg: element.strokeImg,
    isKanji: element.isKanji,
  };
});
