import { useEffect } from "react";

type Args = {
  onPrevious: () => void;
  onNext: () => void;
};

export const useEventListeners = ({ onNext, onPrevious }: Args) => {
  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrevious();
      }
      if (e.key === "ArrowRight") {
        onNext();
      }
    };
    document.addEventListener("keydown", eventListener);
    return () => document.removeEventListener("keydown", eventListener);
  }, [onNext, onPrevious]);
};
