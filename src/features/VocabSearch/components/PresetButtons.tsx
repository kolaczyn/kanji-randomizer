import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import { presetButtons } from "../consts.ts";
import { useFormContext } from "react-hook-form";
import { VocabSearchForm } from "../types.ts";
import { textToLvl } from "../utils/textToLvl.ts";

export const PresetButtons = () => {
  const { setValue, getValues } = useFormContext<VocabSearchForm>();
  const selectedLvl = textToLvl(getValues("query"));
  return (
    <HStack mt="2">
      <Text>Presets:</Text>
      <ButtonGroup spacing="0">
        {presetButtons.map((x) => (
          <Button
            rounded="none"
            colorScheme={selectedLvl <= x.id ? "teal" : undefined}
            key={x.id}
            onClick={() => setValue("query", x.value)}
          >
            {x.label}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
