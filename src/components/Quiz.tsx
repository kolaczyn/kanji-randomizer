import { shuffleArray } from "../utils/shuffleArray.ts";
import { useMemo, useState } from "react";
import { Button, ButtonGroup, Container } from "@chakra-ui/react";
import { useEventListeners } from "../hooks/useEventListeners.ts";
import { Link, useParams } from "react-router-dom";
import { getDeck } from "../utils/getDeck.ts";
import { Level } from "../types.ts";
import { Settings } from "./Settings.tsx";
import { useSettings } from "../hooks/useSettings.tsx";
import { kanjiToStrokeImgName } from "../utils/kanjiToStrokeImgName.ts";

export const Quiz = () => {
  const params = useParams();
  const lvl = params.level as Level;
  const [settings] = useSettings();

  const deck = useMemo(() => shuffleArray(getDeck(lvl)!), [lvl]);
  const [incorrect, setIncorrect] = useState<number[]>([]);

  const handleIncorrect = (idx: number) => {
    if (incorrect.includes(idx)) return;
    setIncorrect((prev) => [...prev, idx]);
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
    <Container>
      <h1>Level: {lvl}</h1>
      <ButtonGroup>
        <Button isDisabled={isFirst} onClick={handlePrevious}>
          Previous
        </Button>{" "}
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
          <div>{card.question}</div>
          {curr.isRevealed && (
            <>
              {kanji && <img src={kanjiToStrokeImgName(kanji)} alt={kanji} />}
              <div>{card.answer}</div>
            </>
          )}
          {curr.isRevealed && (
            <Button
              isDisabled={incorrect.includes(curr.idx)}
              onClick={() => handleIncorrect(curr.idx)}
            >
              Mark as incorrect
            </Button>
          )}
        </div>
      ) : (
        <>
          <h2>No more cards</h2>
          {incorrect.length > 0 ? (
            <>
              <div>Incorrect Kanji:</div>
              <ul>
                {incorrect.map((idx) => (
                  <li key={idx}>
                    {deck[idx][0]} - {deck[idx][1]}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <Link to="/">
            <Button>Exit</Button>
          </Link>
        </>
      )}
    </Container>
  );
};
