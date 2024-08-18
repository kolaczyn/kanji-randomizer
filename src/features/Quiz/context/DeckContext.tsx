import { createContext, ReactNode, useMemo } from "react";
import { KanjiList, Level, RouterState } from "../../../types.ts";
import { getDeck } from "../../../utils/getDeck.ts";
import { shuffleArray } from "../../../utils/shuffleArray.ts";
import { useLocation, useParams } from "react-router-dom";

export const DeckContext = createContext<KanjiList>(null!);

type Props = {
  children: ReactNode;
};

export const DeckContextProvider = ({ children }: Props) => {
  const { shouldShuffle } = useLocation().state as RouterState;
  const params = useParams();
  const lvl = params.level as Level;

  const deck = useMemo<KanjiList>(() => {
    const sortedDeck = getDeck(lvl)!;
    return shouldShuffle ? shuffleArray(sortedDeck) : sortedDeck;
  }, [lvl, shouldShuffle]);

  return <DeckContext.Provider value={deck}>{children}</DeckContext.Provider>;
};
