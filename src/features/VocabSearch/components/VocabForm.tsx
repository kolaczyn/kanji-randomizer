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
import { QuizType, VocabSearchForm } from "../types.ts";
import { useFormContext } from "react-hook-form";

export const VocabForm = () => {
  const { register, setValue, getValues } = useFormContext<VocabSearchForm>();
  return (
    <>
      <Textarea
        {...register("text")}
        placeholder="Kanji to look for in vocabulary dictionary"
      />
      <VStack mt="2">
        <HStack>
          <FormControl>
            <FormLabel>Min length</FormLabel>
            <Input type="number" {...register("min")} />
          </FormControl>
          <FormControl>
            <FormLabel>Max length</FormLabel>
            <Input
              type="number"
              placeholder="max length"
              {...register("max")}
            />
          </FormControl>
        </HStack>
        <RadioGroup
          value={getValues("quizType")}
          onChange={(x) => setValue("quizType", x as QuizType)}
        >
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
            isChecked={getValues("onlyKanji")}
            onChange={(e) => setValue("onlyKanji", e.target.checked)}
          />
        </FormControl>
      </VStack>
    </>
  );
};
