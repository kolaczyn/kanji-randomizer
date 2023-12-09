import { kanjiN5 } from "./kanji.ts";
import { shuffleArray } from "./utils.ts";
import { useEffect, useRef, useState } from "react";

export const App = () => {
  const [scrambledKanji, setScambledKanji] = useState(() =>
    shuffleArray(kanjiN5),
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
    setScambledKanji(shuffleArray(kanjiN5));
    resetBtnRef.current?.blur();
  };

  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleOk();
      }
    };
    document.addEventListener("keydown", eventListener);
    return () => document.removeEventListener("keydown", eventListener);
  }, []);

  const getCard = () => {
    const element = scrambledKanji[idx];
    if (!element) {
      return null;
    }
    const [kanji, explanation] = scrambledKanji[idx];
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : showKanji,
    };
  };

  const card = getCard();

  return (
    <div>
      <h1>Kanji</h1>
      <button onClick={handleOk}>Ok</button>
      <span>
        {idx + 1} of {scrambledKanji.length}
      </span>
      <details>
        <summary>More options</summary>
        <button ref={resetBtnRef} onClick={handleReset}>
          Reset
        </button>
        <button onClick={() => setShowKanji((prev) => !prev)}>
          {showKanji ? "show kanji" : "show explanation"}
        </button>
      </details>
      <br />
      {card ? (
        <>
          <span>{card.question}</span>
          {isRevealed && <span>{card.answer}</span>}
        </>
      ) : (
        <span>no more cards</span>
      )}
    </div>
  );
};
