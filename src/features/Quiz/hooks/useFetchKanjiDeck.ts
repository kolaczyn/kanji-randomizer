import { DeckDto } from "../../../types.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../../../const/env.ts";
import queryString from "query-string";

export const useFetchKanjiDeck = (ids: string[], enabled: boolean) =>
  useQuery({
    queryKey: ["deck", ids],
    queryFn: async () =>
      axios
        .get<DeckDto>(
          `${API_BASE_URL}/v2/decks/join?${queryString.stringify({
            ids: ids,
          })}`,
        )
        .then((x) => x.data),
    staleTime: Infinity,
    enabled: enabled && ids.length > 0,
  });
