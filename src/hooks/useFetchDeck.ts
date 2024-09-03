import { KanjiList, Level } from "../types.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../const/env.ts";

export const useFetchDeck = (lvl: Level) => {
  const type = lvl.startsWith("n") ? "kanji" : "kana";
  return useQuery({
    queryKey: ["kanji", lvl],
    queryFn: async () => {
      const res = await axios.get<KanjiList>(`${API_BASE_URL}/${type}/${lvl}`);
      return res.data;
    },
    staleTime: Infinity,
  });
};
