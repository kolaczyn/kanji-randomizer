import { useAtom } from "jotai/react";
import { useEffect, useMemo, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useEventListeners } from "../../hooks/useEventListeners.ts";
import { useParams } from "react-router-dom";
import { Level } from "../../types.ts";
import { useSettings } from "../../hooks/useSettings.ts";
import { IncorrectKanji } from "../../components/IncorrectKanji.tsx";
import { useControls } from "./hooks/useControls.ts";
import { QuizControls } from "./components/QuizControls.tsx";
import { QuizCard } from "./components/QuizCard.tsx";
import { CharacterAdditionalInfo } from "./components/CharacterAdditionalInfo.tsx";
import { deckAtom, deckAtomKanjiExplanation } from "../../state/deckAtom.ts";
import { shuffleArray } from "../../utils/shuffleArray.ts";
import { Endgame } from "./components/Endgame.tsx";
import { useFetchDeck } from "../../hooks/useFetchDeck.ts";
import { useAppSearchParams } from "../../hooks/useAppSearchParams.ts";

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

export const Quiz = () => {
  const [settings] = useSettings();
  const [state] = useAtom(deckAtom);

  const { handlePrevious, handleNext, handleToggleIncorrect } = useControls();

  const [kanjiExplanation] = useAtom(deckAtomKanjiExplanation);

  const strokeImg = kanjiExplanation?.strokeImg ?? null;
  const explanation = kanjiExplanation?.meaning ?? null;
  const kanji = kanjiExplanation?.character ?? null;

  useEventListeners({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onIncorrect: handleToggleIncorrect,
  });

  const card = useMemo(() => {
    const showKanji = settings.showFirst === "kanji";
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : kanji,
      isOver: state.idx >= state.deck.length,
    };
  }, [state.idx, state.deck.length, explanation, kanji, settings.showFirst]);

  const shouldShowAdditionalInfo: boolean =
    !card.isOver &&
    state.isRevealed &&
    // make sure the character exists (we may be out of range)
    !!kanji;

  return (
    <>
      <Container>
        <QuizControls />
        {card.isOver ? <Endgame /> : <QuizCard card={card} />}
      </Container>
      <Box>
        {shouldShowAdditionalInfo ? (
          <CharacterAdditionalInfo character={kanji!} strokeImg={strokeImg} />
        ) : null}
      </Box>
      {settings.showIncorrect && (
        <Container mt="4">
          <IncorrectKanji />
        </Container>
      )}
    </>
  );
};
