import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VocabDto } from "../types.ts";
import { API_BASE_URL } from "../../../const/env.ts";

export const useFetchVocab = (kanji: string) =>
  useQuery<VocabDto>({
    queryKey: ["vocab", kanji],
    queryFn: async () =>
      axios
        .get<VocabDto>(`${API_BASE_URL}/v2/vocab/${kanji}`)
        .then((x) => x.data),
    enabled: kanji.length > 0,
  });
