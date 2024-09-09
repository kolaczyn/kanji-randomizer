import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VocabDto } from "../types.ts";
import { API_BASE_URL } from "../../../const/env.ts";
import queryString from "query-string";

type UseFetchVocabArgs = {
  search: string;
  minLength: string;
  maxLength: string;
  onlyKanji: boolean;
};

export const useFetchVocab = ({
  minLength,
  maxLength,
  search,
  onlyKanji,
}: UseFetchVocabArgs) =>
  useQuery<VocabDto>({
    // TODO add eslint rule to make sure queryKey is always happy
    queryKey: ["vocab", search, minLength, maxLength, onlyKanji],
    queryFn: async () =>
      axios
        .get<VocabDto>(
          `${API_BASE_URL}/v2/vocab/${search}?${queryString.stringify({
            minLength,
            maxLength,
            onlyKanji,
          })}`,
        )
        .then((x) => x.data),
    enabled: search.length > 0,
    refetchOnWindowFocus: false,
  });
