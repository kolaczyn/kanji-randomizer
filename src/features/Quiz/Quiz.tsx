import { useAtom } from "jotai/react";
import { useMemo } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useEventListeners } from "../../hooks/useEventListeners.ts";
import { useSettings } from "../../hooks/useSettings.ts";
import { IncorrectKanji } from "../../components/IncorrectKanji.tsx";
import { QuizControls } from "./components/QuizControls.tsx";
import { QuizCard } from "./components/QuizCard.tsx";
import { CharacterAdditionalInfo } from "./components/CharacterAdditionalInfo.tsx";
import { deckAtom, deckAtomKanjiExplanation } from "../../state/deckAtom.ts";
import { Endgame } from "./components/Endgame.tsx";

export const Quiz = () => {
  const [settings] = useSettings();
  const [state] = useAtom(deckAtom);

  const [kanjiExplanation] = useAtom(deckAtomKanjiExplanation);

  const strokeImg = kanjiExplanation?.strokeImg ?? null;
  const explanation = kanjiExplanation?.meaning ?? null;
  const char = kanjiExplanation?.character ?? null;
  const isKanji = kanjiExplanation?.isKanji ?? false;

  useEventListeners();

  const card = useMemo(() => {
    const showKanji = settings.showFirst === "kanji";
    return {
      question: showKanji ? char : explanation,
      answer: showKanji ? explanation : char,
      isOver: state.idx >= state.deck.length,
    };
  }, [state.idx, state.deck.length, explanation, char, settings.showFirst]);

  const shouldShowAdditionalInfo: boolean =
    !card.isOver &&
    state.isRevealed &&
    // make sure the character exists (we may be out of range)
    !!char;

  return (
    <>
      {/* padding bottom prevent footer from hiding some content */}
      <Box pb="32">
        <Container>
          {card.isOver ? <Endgame /> : <QuizCard card={card} />}
        </Container>
        <Box>
          {shouldShowAdditionalInfo ? (
            <CharacterAdditionalInfo
              character={char!}
              strokeImg={strokeImg}
              isKanji={isKanji}
            />
          ) : null}
        </Box>
        {settings.showIncorrect && (
          <Container mt="4">
            <IncorrectKanji />
          </Container>
        )}
      </Box>
      <Flex
        py="2"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        justifyContent="space-around"
        className="glass"
      >
        <QuizControls />
      </Flex>
    </>
  );
};
