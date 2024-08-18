import { useContext, useState } from "react";
import { DeckContext } from "../context/DeckContext.tsx";

export const useControls = () => {
  const deck = useContext(DeckContext);
  const [curr, setCurr] = useState<{ idx: number; isRevealed: boolean }>({
    idx: 0,
    isRevealed: false,
  });

  const handlePrevious = () => {
    setCurr((prev) => ({
      idx: Math.max(prev.idx - 1, 0),
      isRevealed: false,
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
