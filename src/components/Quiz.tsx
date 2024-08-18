import { shuffleArray } from "../utils/shuffleArray.ts";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useEventListeners } from "../hooks/useEventListeners.ts";
import { Link, useLocation, useParams } from "react-router-dom";
import { getDeck } from "../utils/getDeck.ts";
import { KanjiList, Level, RouterState } from "../types.ts";
import { Settings } from "./Settings.tsx";
import { useSettings } from "../hooks/useSettings.ts";
import { kanjiToStrokeImgName } from "../utils/kanjiToStrokeImgName.ts";
import { IncorrectKanji } from "./IncorrectKanji.tsx";

export const Quiz = () => {
  const params = useParams();
  const { shouldShuffle } = useLocation().state as RouterState;
  const lvl = params.level as Level;
  const isKanji = lvl.startsWith("n");
  const [settings] = useSettings();

  const deck = useMemo<KanjiList>(() => {
    const sortedDeck = getDeck(lvl)!;
    return shouldShuffle ? shuffleArray(sortedDeck) : sortedDeck;
  }, [lvl, shouldShuffle]);
  const [incorrect, setIncorrect] = useState<number[]>([]);

  const handleIncorrect = (idx: number) => {
    if (incorrect.includes(idx)) {
      setIncorrect((prev) => prev.filter((i) => i !== idx));
    } else {
      setIncorrect((prev) => [...prev, idx]);
    }
  };

  const [curr, setCurr] = useState<{ idx: number; isRevealed: boolean }>({
    idx: 0,
    isRevealed: false,
  });

  const isFirst = curr.idx === 0;
  const isLast = curr.idx > deck.length - 1;

  const handlePrevious = () => {
    // setIdx((prev) => Math.max(prev - 1, 0));
    setCurr((prev) => ({
      idx: Math.max(prev.idx - 1, 0),
      isRevealed: false,
    }));
  };

  const handleNext = () => {
    setCurr((prev) =>
      prev.isRevealed
        ? {
            idx: Math.min(prev.idx + 1, deck.length),
            isRevealed: false,
          }
        : {
            idx: prev.idx,
            isRevealed: true,
          },
    );
  };

  useEventListeners({
    onPrevious: handlePrevious,
    onNext: handleNext,
  });

  const [kanji, explanation] = useMemo<[string | null, string | null]>(() => {
    const element = deck[curr.idx];
    if (element == null) return [null, null];
    const [kanji, explanation] = element;
    return [kanji, explanation];
  }, [curr.idx, deck]);

  const getCard = () => {
    const showKanji = settings.showFirst === "kanji";
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : kanji,
      isOver: curr.idx >= deck.length,
    };
  };

  const card = getCard();

  return (
    <>
      <Container>
        <ButtonGroup alignItems="center">
          <Button isDisabled={isFirst} onClick={handlePrevious}>
            Previous
          </Button>
          <span>
            {/*Math.min prevents text like "10 of 9" from appearing */}
            {Math.min(curr.idx + 1, deck.length)} of {deck.length}
          </span>
          <Button colorScheme="green" isDisabled={isLast} onClick={handleNext}>
            Next
          </Button>
          <Settings />
        </ButtonGroup>
        <br />
        {!card.isOver ? (
          <div className="quiz">
            <Box fontSize="2rem">{card.question}</Box>
            {curr.isRevealed && (
              <>
                <div>{card.answer}</div>
                {curr.isRevealed && (
                  <Button
                    marginBottom="1rem"
                    onClick={() => handleIncorrect(curr.idx)}
                  >
                    Mark as{" "}
                    {incorrect.includes(curr.idx) ? "correct" : "incorrect"}
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            <h2>No more cards</h2>
            {incorrect.length > 0 ? (
              <IncorrectKanji incorrect={incorrect} deck={deck} curr={curr} />
            ) : null}
            <Link to="/">
              <Button>Exit</Button>
            </Link>
          </>
        )}
      </Container>
      <div>
        {!card.isOver && curr.isRevealed && kanji && isKanji ? (
          <>
            <Container pb="2">
              <ChakraLink
                isExternal
                href={`https://www.wanikani.com/kanji/${kanji}`}
              >
                See WaniKani page
              </ChakraLink>
            </Container>
            <Image mx="auto" src={kanjiToStrokeImgName(kanji)} alt={kanji} />
          </>
        ) : null}
      </div>

      {settings.showIncorrect && (
        <>
          <hr />
          <Container>
            <IncorrectKanji incorrect={incorrect} deck={deck} curr={curr} />
          </Container>
        </>
      )}
    </>
  );
};
