import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export const useControls = () => {
  const [{ deck, idx, isRevealed }, setState] = useAtom(deckAtom);

  const handlePrevious = () => {
    setState((draft) => {
      draft.idx = Math.max(draft.idx - 1, 0);
      draft.isRevealed = true;
    });
  };

  const handleNext = () => {
    setState((draft) => {
      if (!draft.isRevealed) {
        draft.isRevealed = true;
        return;
      }
      if (draft.idx === deck.length - 1) {
        return;
      }
      draft.idx = Math.min(draft.idx + 1, deck.length);
      draft.isRevealed = false;
    });
  };

  const markCorrect = () => {
    setState((draft) => {
      draft.incorrect = draft.incorrect.filter((i) => i !== idx);
    });
  };

  const markIncorrect = () => {
    setState((draft) => {
      draft.incorrect = [...draft.incorrect, idx];
    });
  };

  const correctAndNext = () => {
    if (!isRevealed) return;
    markCorrect();
    handleNext();
  };
  const incorrectAndNext = () => {
    if (!isRevealed) return;
    markIncorrect();
    handleNext();
  };

  const isFirst = idx === 0;
  const isLast = idx > deck.length - 1;

  return {
    handlePrevious,
    handleNext,
    isFirst,
    isLast,
    correctAndNext,
    incorrectAndNext,
  };
};
