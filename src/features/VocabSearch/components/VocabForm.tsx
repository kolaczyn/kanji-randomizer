import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { NumStr } from "../types.ts";

type Props = {
  text: string;
  setText: (value: string) => void;
  min: NumStr;
  setMin: (value: NumStr) => void;
  max: NumStr;
  setMax: (value: NumStr) => void;
};

export const VocabForm = ({
  min,
  setMin,
  setMax,
  max,
  setText,
  text,
}: Props) => {
  return (
    <>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Kanji to look for in vocabulary dictionary"
      />
      <HStack mt="2">
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
    </>
  );
};
