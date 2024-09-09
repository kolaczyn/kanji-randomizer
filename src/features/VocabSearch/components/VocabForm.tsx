import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { NumStr, QuizType } from "../types.ts";

type Props = {
  text: string;
  setText: (value: string) => void;
  min: NumStr;
  setMin: (value: NumStr) => void;
  max: NumStr;
  setMax: (value: NumStr) => void;
  quiz: QuizType;
  setQuiz: (value: QuizType) => void;
  onlyKanji: boolean;
  setOnlyKanji: (value: boolean) => void;
};

// TODO use react-hook-form
export const VocabForm = ({
  min,
  setMin,
  setMax,
  max,
  text,
  setText,
  setQuiz,
  quiz,
  onlyKanji,
  setOnlyKanji,
}: Props) => {
  return (
    <>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Kanji to look for in vocabulary dictionary"
      />
      <VStack mt="2">
        <HStack>
          <FormControl>
            <FormLabel>Min length</FormLabel>
            <Input
              type="number"
              value={min}
              onChange={(e) => {
                setMin(e.target.value as NumStr);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Max length</FormLabel>
            <Input
              type="number"
              placeholder="max length"
              value={max}
              onChange={(e) => {
                setMax(e.target.value as NumStr);
              }}
            />
          </FormControl>
        </HStack>
        <RadioGroup value={quiz} onChange={(x) => setQuiz(x as QuizType)}>
          <Stack spacing={5} direction="row">
            <Radio value={"no-quiz" as QuizType}>No Quiz</Radio>
            <Radio value={"hide-vocab" as QuizType}>Hide Vocab</Radio>
            <Radio value={"hide-kanji" as QuizType}>Hide Kanji</Radio>
          </Stack>
        </RadioGroup>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="only-kanji-switch" mb="0">
            Only Kanji
          </FormLabel>
          <Switch
            id="only-kanji-switch"
            isChecked={onlyKanji}
            onChange={(e) => setOnlyKanji(e.target.checked)}
          />
        </FormControl>
      </VStack>
    </>
  );
};
