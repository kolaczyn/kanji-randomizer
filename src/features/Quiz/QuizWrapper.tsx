import { useEffect, useState } from "react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../state/deckAtom.ts";
import { useAppSearchParams } from "./hooks/useAppSearchParams.ts";
import { useParams } from "react-router-dom";
import { Level } from "../../types.ts";
import { useFetchKanjiDeck } from "./hooks/useFetchKanjiDeck.ts";
import { shuffleArray } from "./utils/shuffleArray.ts";
import { Quiz } from "./Quiz.tsx";
import { useFetchVocabDeck } from "./hooks/useFetchVocabDeck.ts";

export const QuizWrapper = () => {
  const [isInit, setIsInit] = useState(false);
  const [, setDeck] = useAtom(deckAtom);

  const { stroke, vocab, common } = useAppSearchParams();
  const params = useParams();
  const lvl = params.level as Level;

  const kanjiDeckResponse = useFetchKanjiDeck(stroke.decks, !common.vocab);
  const vocabDeckResponse = useFetchVocabDeck(vocab, common.vocab);
  const response = common.vocab ? vocabDeckResponse : kanjiDeckResponse;

  // This should work for now, but in the future I should do something like this:
  // https://jotai.org/docs/guides/initialize-atom-on-render
  useEffect(() => {
    if (response.status !== "success") return;
    const sortedDeck = response.data.deck;
    const finalDeck = common.shouldShuffle
      ? shuffleArray(sortedDeck)
      : sortedDeck;

    setDeck((draft) => {
      draft.deck = finalDeck;
      draft.incorrect = [];
      draft.idx = 0;
      draft.isRevealed = false;
    });

    setIsInit(true);
  }, [response.data, response.status, lvl, setDeck, common.shouldShuffle]);

  return isInit ? <Quiz /> : null;
};
