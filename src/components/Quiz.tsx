import { shuffleArray } from "../utils/shuffleArray.ts";
import { useMemo, useState } from "react";
import { Button, Container } from "@chakra-ui/react";
import { useEventListeners } from "../hooks/useEventListeners.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSettings } from "../hooks/useSettings.ts";
import { getDeck } from "../utils/getDeck.ts";
import { Level } from "../types.ts";

export const Quiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const lvl = params.level as Level;

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
  const [settings, setSettings] = useSettings();

  const showKanji = settings.showFirst === "kanji";
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
    // setIdx((prev) => Math.min(prev + 1, deck.length));
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

  const handleReset = () => {
    navigate(0);
  };

  useEventListeners({
    onPrevious: handlePrevious,
    onNext: handleNext,
  });

  const getCard = () => {
    const element = deck[curr.idx];
    if (!element) {
      return null;
    }
    const [kanji, explanation] = deck[curr.idx];
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : kanji,
    };
  };

  const card = getCard();

  return (
    <Container>
      <h1>Level: {lvl}</h1>
      <Button isDisabled={isFirst} onClick={handlePrevious}>
        Previous
      </Button>{" "}
      <span>
        {/*Math.min prevents text like "10 of 9" from appearing */}
        {Math.min(curr.idx + 1, deck.length)} of {deck.length}
      </span>{" "}
      <Button colorScheme="green" isDisabled={isLast} onClick={handleNext}>
        Next
      </Button>
      <details>
        <summary>More options</summary>
        <Button onClick={handleReset}>Reset</Button>
        <Link to="/">
          <Button>Exit</Button>
        </Link>
        <Button
          onClick={() =>
            setSettings({
              showFirst: showKanji ? "definition" : "kanji",
            })
          }
        >
          {showKanji ? "show kanji" : "show explanation"}
        </Button>
      </details>
      <br />
      {card ? (
        <div className="quiz">
          <div>{card.question}</div>
          {curr.isRevealed && <div>{card.answer}</div>}
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
