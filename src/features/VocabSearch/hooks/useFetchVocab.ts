import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NumStr, VocabDto } from "../types.ts";
import { API_BASE_URL } from "../../../const/env.ts";
import queryString from "query-string";

export type VocabQueryDto = {
  query: string;
  minLen: NumStr;
  maxLen: NumStr;
  onlyKanji: boolean;
};

export const useFetchVocab = ({
  query,
  minLen,
  maxLen,
  onlyKanji,
}: VocabQueryDto) =>
  useQuery<VocabDto>({
    // TODO add eslint rule to make sure queryKey is always happy
    queryKey: ["vocab", query, minLen, maxLen, onlyKanji],
    queryFn: async () =>
      axios
        .get<VocabDto>(
          `${API_BASE_URL}/v2/vocab/?${queryString.stringify({
            minLen,
            maxLen,
            onlyKanji,
            query,
          } as VocabQueryDto)}`,
        )
        .then((x) => x.data),
    enabled: query.length > 0,
    refetchOnWindowFocus: false,
  });
