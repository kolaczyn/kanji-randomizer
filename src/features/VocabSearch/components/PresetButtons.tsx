import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import { presetButtons } from "../consts.ts";

const textToLvl = (text: string) => {
  const currentLevel = text.replace("level-n", "");
  const asNum = parseInt(currentLevel, 10);
  const asNumNormalized = isNaN(asNum) ? 0 : asNum;
  return asNumNormalized;
};

type Props = {
  text: string;
  handleSetText: (id: string) => void;
};

export const PresetButtons = ({ handleSetText, text }: Props) => {
  const selectedLvl = textToLvl(text);
  return (
    <HStack mt="2">
      <Text>Presets: {selectedLvl}</Text>
      <ButtonGroup spacing="0">
        {presetButtons.map((x) => (
          <Button
            rounded="none"
            colorScheme={selectedLvl <= x.id ? "teal" : undefined}
            key={x.id}
            onClick={() => handleSetText(x.value)}
          >
            {x.label}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
