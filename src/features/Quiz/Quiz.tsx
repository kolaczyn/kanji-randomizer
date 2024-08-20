import { useAtom } from "jotai/react";
import { useEffect, useMemo, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useEventListeners } from "../../hooks/useEventListeners.ts";
import { useLocation, useParams } from "react-router-dom";
import { Level, RouterState } from "../../types.ts";
import { useSettings } from "../../hooks/useSettings.ts";
import { IncorrectKanji } from "../../components/IncorrectKanji.tsx";
import { useControls } from "./hooks/useControls.ts";
import { QuizControls } from "./components/QuizControls.tsx";
import { QuizCard } from "./components/QuizCard.tsx";
import { CharacterAdditionalInfo } from "./components/CharacterAdditionalInfo.tsx";
import { deckAtom, deckAtomKanjiExplanation } from "../../state/deckAtom.ts";
import { getDeck } from "../../utils/getDeck.ts";
import { shuffleArray } from "../../utils/shuffleArray.ts";
import { useAppRouteData } from "../../hooks/useAppRouteData.ts";
import { Endgame } from "./components/Endgame.tsx";

export const QuizWrapper = () => {
  const [isInit, setIsInit] = useState(false);
  const [, setDeck] = useAtom(deckAtom);

  const { shouldShuffle } = useLocation().state as RouterState;
  const params = useParams();
  const lvl = params.level as Level;

  // This should work for now, but in the future I should do something like this:
  // https://jotai.org/docs/guides/initialize-atom-on-render
  useEffect(() => {
    const sortedDeck = getDeck(lvl)!;
    const finalDeck = shouldShuffle ? shuffleArray(sortedDeck) : sortedDeck;

    setDeck((draft) => {
      draft.deck = finalDeck;
      draft.incorrect = [];
      draft.idx = 0;
      draft.isRevealed = false;
    });

    setIsInit(true);
  }, [lvl, setDeck, shouldShuffle]);

  return isInit ? <Quiz /> : null;
};

export const Quiz = () => {
  const { isKanji } = useAppRouteData();
  const [settings] = useSettings();
  const [state] = useAtom(deckAtom);

  const { handlePrevious, handleNext, handleToggleIncorrect } = useControls();

  const [[kanji, explanation]] = useAtom(deckAtomKanjiExplanation);

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
    !!kanji &&
    // there is no stroke order for hiragana and katakana
    isKanji;

  return (
    <>
      <Container>
        <QuizControls />
        {card.isOver ? <Endgame /> : <QuizCard card={card} />}
      </Container>
      <Box>
        {shouldShowAdditionalInfo ? (
          <CharacterAdditionalInfo kanji={kanji!} />
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
