import { useSearchParams } from "react-router-dom";
import { VocabQueryDto } from "../features/VocabSearch/hooks/useFetchVocab.ts";

export const useAppSearchParams = () => {
  const [searchParams] = useSearchParams();
  const shouldShuffle = searchParams.get("shouldShuffle") === "true";
  const decks = searchParams.getAll("decks");
  const vocab = searchParams.get("vocab") === "true";

  const minLen = searchParams.get("minLen");
  const maxLen = searchParams.get("maxLen");
  const query = searchParams.get("query");
  const onlyKanji = searchParams.get("onlyKanji") === "true";

  return {
    stroke: {
      decks,
    },
    vocab: {
      minLen,
      maxLen,
      query,
      onlyKanji,
    } as VocabQueryDto,
    common: {
      vocab,
      shouldShuffle,
    },
  };
};
