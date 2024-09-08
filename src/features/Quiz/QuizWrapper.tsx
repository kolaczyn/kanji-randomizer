import { useEffect, useState } from "react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../state/deckAtom.ts";
import { useAppSearchParams } from "../../hooks/useAppSearchParams.ts";
import { useParams } from "react-router-dom";
import { Level } from "../../types.ts";
import { useFetchDeck } from "../../hooks/useFetchDeck.ts";
import { shuffleArray } from "../../utils/shuffleArray.ts";
import { Quiz } from "./Quiz.tsx";

export const QuizWrapper = () => {
  const [isInit, setIsInit] = useState(false);
  const [, setDeck] = useAtom(deckAtom);

  const { decks, shouldShuffle } = useAppSearchParams();
  const params = useParams();
  const lvl = params.level as Level;
  const deckResponse = useFetchDeck(decks);

  // This should work for now, but in the future I should do something like this:
  // https://jotai.org/docs/guides/initialize-atom-on-render
  useEffect(() => {
    if (deckResponse.status !== "success") return;
    const sortedDeck = deckResponse.data.deck;
    const finalDeck = shouldShuffle ? shuffleArray(sortedDeck) : sortedDeck;

    setDeck((draft) => {
      draft.deck = finalDeck;
      draft.incorrect = [];
      draft.idx = 0;
      draft.isRevealed = false;
    });

    setIsInit(true);
  }, [deckResponse.data, deckResponse.status, lvl, setDeck, shouldShuffle]);

  return isInit ? <Quiz /> : null;
};
