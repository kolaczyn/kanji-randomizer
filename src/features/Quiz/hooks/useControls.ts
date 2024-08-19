import { useState } from "react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export type UseControlsReturn = {
  handlePrevious: () => void;
  curr: { idx: number; isRevealed: boolean };
  handleNext: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export const useControls = (): UseControlsReturn => {
  const [{ deck }] = useAtom(deckAtom);
  const [curr, setCurr] = useState<{ idx: number; isRevealed: boolean }>({
    idx: 0,
    isRevealed: false,
  });

  const handlePrevious = () => {
    setCurr((prev) => ({
      idx: Math.max(prev.idx - 1, 0),
      isRevealed: true,
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

  const isFirst = curr.idx === 0;
  const isLast = curr.idx > deck.length - 1;

  return {
    handlePrevious,
    curr,
    handleNext,
    isFirst,
    isLast,
  };
};
