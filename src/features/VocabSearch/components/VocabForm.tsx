import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";

type Props = {
  text: string;
  setText: (value: string) => void;
  min: number;
  setMin: (value: number) => void;
  max: number;
  setMax: (value: number) => void;
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
            onChange={(e) => setMin(e.target.valueAsNumber)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Max length</FormLabel>
          <Input
            type="number"
            placeholder="max length"
            value={max}
            onChange={(e) => setMax(e.target.valueAsNumber)}
          />
        </FormControl>
      </HStack>
    </>
  );
};
