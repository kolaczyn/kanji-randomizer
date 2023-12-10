import { useEffect } from "react";

export const useEventListeners = (handleOk: () => void) => {
  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleOk();
      }
    };
    document.addEventListener("keydown", eventListener);
    return () => document.removeEventListener("keydown", eventListener);
  }, []);
};
