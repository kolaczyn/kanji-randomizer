import { useContext, useMemo, useState } from "react";
import { Button, Container } from "@chakra-ui/react";
import { useEventListeners } from "../../hooks/useEventListeners.ts";
import { Link, useParams } from "react-router-dom";
import { Level } from "../../types.ts";
import { useSettings } from "../../hooks/useSettings.ts";
import { IncorrectKanji } from "../../components/IncorrectKanji.tsx";
import { useControls } from "./hooks/useControls.ts";
import { DeckContext } from "./context/DeckContext.tsx";
import { QuizControls } from "./components/QuizControls.tsx";
import { QuizCard } from "./components/QuizCard.tsx";
import { CharacterAdditionalInfo } from "./components/CharacterAdditionalInfo.tsx";

export const Quiz = () => {
  const params = useParams();
  const lvl = params.level as Level;
  const deck = useContext(DeckContext);
  const isKanji = lvl.startsWith("n");
  const [settings] = useSettings();

  const [incorrect, setIncorrect] = useState<number[]>([]);

  const handleIncorrect = (idx: number) => {
    if (incorrect.includes(idx)) {
      setIncorrect((prev) => prev.filter((i) => i !== idx));
    } else {
      setIncorrect((prev) => [...prev, idx]);
    }
  };

  const controls = useControls();
  const { handlePrevious, handleNext, curr } = controls;

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

  const card = useMemo(() => {
    const showKanji = settings.showFirst === "kanji";
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : kanji,
      isOver: curr.idx >= deck.length,
    };
  }, [curr.idx, deck.length, explanation, kanji, settings.showFirst]);

  const shouldShowAdditionalInfo: boolean =
    !card.isOver && curr.isRevealed && !!kanji && isKanji;

  return (
    <>
      <Container>
        <QuizControls {...controls} />
        <br />
        {!card.isOver ? (
          <QuizCard
            card={card}
            curr={curr}
            handleIncorrect={handleIncorrect}
            incorrect={incorrect}
          />
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
        {shouldShowAdditionalInfo ? (
          <CharacterAdditionalInfo kanji={kanji!} />
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
