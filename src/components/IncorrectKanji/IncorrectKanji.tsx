import { toPercentage } from "./toPercentage.ts";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../state/deckAtom.ts";
import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { SearchResultsRows } from "../../features/VocabSearch/components/SearchResultsRows.tsx";
import { useState } from "react";
import { QuizType } from "../../features/VocabSearch/types.ts";

export const IncorrectKanji = () => {
  const [quiz, setQuiz] = useState<QuizType>("no-quiz");
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
      <RadioGroup value={quiz} onChange={(x) => setQuiz(x as QuizType)}>
        <Stack spacing={5} direction="row">
          <Radio value={"no-quiz" as QuizType}>No Quiz</Radio>
          <Radio value={"hide-vocab" as QuizType}>Hide Vocab</Radio>
          <Radio value={"hide-kanji" as QuizType}>Hide Kanji</Radio>
        </Stack>
      </RadioGroup>
      <SearchResultsRows results={results} quiz={quiz} />
    </>
  ) : null;
};
