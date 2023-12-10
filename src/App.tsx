import { kanjiN4, kanjiN5 } from "./kanji.ts";
import { shuffleArray } from "./utils.ts";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useEventListeners } from "./hooks/useEventListeners.ts";

type Level = "N5" | "N4";

export const App = () => {
  const [lvl, setLvl] = useState<Level>("N5");

  return <Quiz setLvl={setLvl} lvl={lvl} key={lvl} />;
};

type QuizProps = {
  setLvl: (next: Level) => void;
  lvl: Level;
};

const Quiz = ({ lvl, setLvl }: QuizProps) => {
  const [scrambledKanji, setScrambledKanji] = useState(() =>
    shuffleArray(lvl === "N5" ? kanjiN5 : kanjiN4),
  );
  const [idx, setIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showKanji, setShowKanji] = useState(false);
  const resetBtnRef = useRef<HTMLButtonElement>(null);

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
    setScrambledKanji(shuffleArray(kanjiN5));
    resetBtnRef.current?.blur();
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
    <div className="container">
      <Button colorScheme="green" onClick={handleOk}>
        Ok
      </Button>
      <span>
        {idx + 1} of {scrambledKanji.length}
      </span>
      <details>
        <summary>More options</summary>
        <Button ref={resetBtnRef} onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={() => setShowKanji((prev) => !prev)}>
          {showKanji ? "show kanji" : "show explanation"}
        </Button>
        <Button onClick={() => setLvl(lvl === "N5" ? "N4" : "N5")}>
          {lvl === "N5" ? "Change to N4" : "Change to N5"}
        </Button>
      </details>
      <br />
      {card ? (
        <>
          <div>{card.question}</div>
          {isRevealed && <div className="kanji">{card.answer}</div>}
        </>
      ) : (
        <span>no more cards</span>
      )}
    </div>
  );
};
