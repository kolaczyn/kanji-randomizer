import { useEffect } from "react";
import { useControls } from "./useControls.ts";

export const useEventListeners = () => {
  const { handlePrevious, handleNext, correctAndNext, incorrectAndNext } =
    useControls();
  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          return handlePrevious();
        case "ArrowRight":
          return handleNext();
        case "1":
          return correctAndNext();
        case "2":
          return incorrectAndNext();
      }
    };
    document.addEventListener("keydown", eventListener);
    return () => document.removeEventListener("keydown", eventListener);
  }, [correctAndNext, handleNext, handlePrevious, incorrectAndNext]);
};
