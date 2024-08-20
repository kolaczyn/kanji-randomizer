import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export const useControls = () => {
  const [{ deck, idx, incorrect }, setState] = useAtom(deckAtom);

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

  const handleToggleIncorrect = () => {
    if (incorrect.includes(idx)) {
      setState((draft) => {
        draft.incorrect = draft.incorrect.filter((i) => i !== idx);
      });
    } else {
      setState((draft) => {
        draft.incorrect = [...draft.incorrect, idx];
      });
    }
  };

  const isFirst = idx === 0;
  const isLast = idx > deck.length - 1;

  return {
    handlePrevious,
    handleNext,
    handleToggleIncorrect,
    isFirst,
    isLast,
  };
};
