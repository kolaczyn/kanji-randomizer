import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import { presetButtons } from "../consts.ts";
import { useFormContext } from "react-hook-form";
import { VocabSearchForm } from "../types.ts";

const textToLvl = (text: string) => {
  const currentLevel = text.replace("level-n", "");
  const asNum = parseInt(currentLevel, 10);
  const asNumNormalized = isNaN(asNum) ? 0 : asNum;
  return asNumNormalized;
};

export const PresetButtons = () => {
  const { setValue, getValues } = useFormContext<VocabSearchForm>();
  const selectedLvl = textToLvl(getValues("text"));
  return (
    <HStack mt="2">
      <Text>Presets: {selectedLvl}</Text>
      <ButtonGroup spacing="0">
        {presetButtons.map((x) => (
          <Button
            rounded="none"
            colorScheme={selectedLvl <= x.id ? "teal" : undefined}
            key={x.id}
            onClick={() => setValue("text", x.value)}
          >
            {x.label}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
