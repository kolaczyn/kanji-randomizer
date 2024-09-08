import { useSearchParams } from "react-router-dom";

export const useAppSearchParams = () => {
  const [searchParams] = useSearchParams();
  const shouldShuffle = searchParams.get("shouldShuffle") === "true";
  const decks = searchParams.getAll("decks");

  return {
    shouldShuffle,
    decks,
  };
};
