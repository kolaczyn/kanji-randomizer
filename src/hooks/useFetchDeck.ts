import { KanjiList } from "../types.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../const/env.ts";

export const useFetchDeck = (id: string) => {
  return useQuery({
    queryKey: ["deck", id],
    queryFn: async () => {
      const res = await axios.get<KanjiList>(`${API_BASE_URL}/v2/decks/${id}`);
      return res.data;
    },
    staleTime: Infinity,
  });
};
