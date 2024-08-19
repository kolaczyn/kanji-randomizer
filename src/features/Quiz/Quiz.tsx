import { useAtom } from "jotai/react";
import { useEffect, useMemo, useState } from "react";
import { Button, Container } from "@chakra-ui/react";
import { useEventListeners } from "../../hooks/useEventListeners.ts";
import { Link, useLocation, useParams } from "react-router-dom";
import { Level, RouterState } from "../../types.ts";
import { useSettings } from "../../hooks/useSettings.ts";
import { IncorrectKanji } from "../../components/IncorrectKanji.tsx";
import { useControls } from "./hooks/useControls.ts";
import { QuizControls } from "./components/QuizControls.tsx";
import { QuizCard } from "./components/QuizCard.tsx";
import { CharacterAdditionalInfo } from "./components/CharacterAdditionalInfo.tsx";
import { deckAtom } from "../../state/deckAtom.ts";
import { getDeck } from "../../utils/getDeck.ts";
import { shuffleArray } from "../../utils/shuffleArray.ts";
import { useAppRouteData } from "../../hooks/useAppRouteData.ts";

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
    });

    setIsInit(true);
  }, [lvl, setDeck, shouldShuffle]);

  return isInit ? <Quiz /> : null;
};

export const Quiz = () => {
  const { isKanji } = useAppRouteData();
  const [settings] = useSettings();
  const [state, setState] = useAtom(deckAtom);

  const controls = useControls();
  const { handlePrevious, handleNext, curr } = controls;

  const [kanji, explanation] = useMemo<[string | null, string | null]>(() => {
    const element = state.deck[curr.idx];
    if (element == null) return [null, null];
    const [kanji, explanation] = element;
    return [kanji, explanation];
  }, [curr.idx, state.deck]);

  const handleToggleIncorrect = (idx: number) => {
    if (state.incorrect.includes(idx)) {
      setState((draft) => {
        draft.incorrect = draft.incorrect.filter((i) => i !== idx);
      });
    } else {
      setState((draft) => {
        draft.incorrect = [...draft.incorrect, idx];
      });
    }
  };

  useEventListeners({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onIncorrect: () => handleToggleIncorrect(curr.idx),
  });

  const card = useMemo(() => {
    const showKanji = settings.showFirst === "kanji";
    return {
      question: showKanji ? kanji : explanation,
      answer: showKanji ? explanation : kanji,
      isOver: curr.idx >= state.deck.length,
    };
  }, [curr.idx, state.deck.length, explanation, kanji, settings.showFirst]);

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
            handleIncorrect={handleToggleIncorrect}
            incorrect={state.incorrect}
          />
        ) : (
          <>
            <h2>No more cards</h2>
            {state.incorrect.length > 0 ? (
              <IncorrectKanji
                incorrect={state.incorrect}
                deck={state.deck}
                curr={curr}
              />
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
            <IncorrectKanji
              incorrect={state.incorrect}
              deck={state.deck}
              curr={curr}
            />
          </Container>
        </>
      )}
    </>
  );
};
