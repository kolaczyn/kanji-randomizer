import { kanjiN4, kanjiN5 } from "../const/kanji.ts";
import { shuffleArray } from "../utils/shuffleArray.ts";
import { useMemo, useState } from "react";
import { Button, Container } from "@chakra-ui/react";
import { useEventListeners } from "../hooks/useEventListeners.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSettings } from "../hooks/useSettings.ts";

export const Quiz = () => {
  const params = useParams();
  const lvl = params.level!;
  const navigate = useNavigate();

  const scrambledKanji = useMemo(
    () => shuffleArray(lvl === "N5" ? kanjiN5 : kanjiN4),
    [lvl],
  );

  const [idx, setIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [settings, setSettings] = useSettings();
  const showKanji = settings.showFirst === "kanji";

  const handleOk = () => {
    setIsRevealed((prev) => {
      if (prev) {
        setIdx((prev) => prev + 1);
        return false;
      } else {
        return true;
      }
    });
  };

  const handleReset = () => {
    navigate(0);
  };

  useEventListeners(handleOk);

  const getCard = () => {
    const element = scrambledKanji[idx];
    if (!element) {
      return null;
    }
    const [kanji, explanation] = scrambledKanji[idx];
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : kanji,
    };
  };

  const card = getCard();

  return (
    <Container>
      <h1>Level: {lvl}</h1>
      <Button colorScheme="green" onClick={handleOk}>
        Ok
      </Button>
      <span>
        {/*Math.min prevents text like "10 of 9" from appearing */}
        {Math.min(idx + 1, scrambledKanji.length)} of {scrambledKanji.length}
      </span>
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
          {isRevealed && <div>{card.answer}</div>}
        </div>
      ) : (
        <>
          <div>no more cards</div>
          <Link to="/">
            <Button>Exit</Button>
          </Link>
        </>
      )}
    </Container>
  );
};
