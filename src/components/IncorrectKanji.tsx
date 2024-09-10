import { toPercentage } from "../utils/toPercentage.ts";
import { useAtom } from "jotai/react";
import { deckAtom } from "../state/deckAtom.ts";
import { Text } from "@chakra-ui/react";
import { SearchResultsRows } from "../features/VocabSearch/components/SearchResultsRows.tsx";

export const IncorrectKanji = () => {
  const [{ idx, incorrect, deck, isRevealed }] = useAtom(deckAtom);
  const soFar = idx + (isRevealed ? 1 : 0);

  const correct = soFar - incorrect.length;
  const correctPercent = toPercentage(correct, soFar);
  const incorrectPercent = toPercentage(incorrect.length, soFar);

  const results = incorrect.map((idx) => ({
    jap: deck[idx].character,
    eng: deck[idx].meaning,
    // TODO remove
    kana: "",
  }));

  return incorrect.length > 0 ? (
    <>
      <Text fontWeight="bold">Summary</Text>
      <div>
        Incorrect: {incorrect.length} ({incorrectPercent})
      </div>
      <div>
        Okay: {correct} ({correctPercent})
      </div>
      <SearchResultsRows results={results} quiz={"no-quiz"} />
    </>
  ) : null;
};
