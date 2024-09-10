import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DeckDto } from "../types.ts";
import { API_BASE_URL } from "../const/env.ts";
import queryString from "query-string";
import { VocabQueryDto } from "../features/VocabSearch/hooks/useFetchVocab.ts";

export const useFetchVocabDeck = (
  { onlyKanji, minLen, maxLen, query }: VocabQueryDto,
  enabled: boolean,
) =>
  useQuery({
    queryKey: ["vocab-deck", onlyKanji, minLen, maxLen, query],
    queryFn: async () =>
      axios
        .get<DeckDto>(
          `${API_BASE_URL}/v2/vocab-deck?${queryString.stringify({
            onlyKanji,
            minLen,
            maxLen,
            query,
          } as VocabQueryDto)}`,
        )
        .then((x) => x.data),
    staleTime: Infinity,
    enabled: enabled,
  });
