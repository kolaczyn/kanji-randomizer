import { useEffect } from "react";

type Args = {
  onPrevious: () => void;
  onNext: () => void;
  onIncorrect: () => void;
};

export const useEventListeners = ({
  onNext,
  onPrevious,
  onIncorrect,
}: Args) => {
  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
      if (e.key.toLowerCase() === "x") onIncorrect();
    };
    document.addEventListener("keydown", eventListener);
    return () => document.removeEventListener("keydown", eventListener);
  }, [onNext, onPrevious]);
};
