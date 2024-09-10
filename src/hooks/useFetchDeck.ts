import { DeckDto } from "../types.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../const/env.ts";
import queryString from "query-string";

export const useFetchDeck = (ids: string[], type: "kanji" | "vocab") => {
  const url =
    type == "kanji"
      ? `${API_BASE_URL}/v2/decks/join?${queryString.stringify({
          ids: ids,
        })}`
      : `${API_BASE_URL}/v2/vocab-deck?query=level-${ids}`;
  return useQuery({
    queryKey: ["deck", ids, type],
    queryFn: async () => axios.get<DeckDto>(url).then((x) => x.data),
    staleTime: Infinity,
  });
};
