import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export const useControls = () => {
  const [{ deck, idx }, setState] = useAtom(deckAtom);

  const handlePrevious = () => {
    setState((draft) => {
      draft.idx = Math.max(draft.idx - 1, 0);
      draft.isRevealed = true;
    });
  };

  const handleNext = () => {
    setState((draft) => {
      if (draft.isRevealed) {
        draft.idx = Math.min(draft.idx + 1, deck.length);
        draft.isRevealed = false;
      } else {
        draft.isRevealed = true;
      }
    });
  };

  const isFirst = idx === 0;
  const isLast = idx > deck.length - 1;

  return {
    handlePrevious,
    handleNext,
    isFirst,
    isLast,
  };
};
