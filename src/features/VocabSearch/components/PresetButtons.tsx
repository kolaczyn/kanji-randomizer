import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import { presetButtons } from "../consts.ts";

type Props = {
  text: string;
  handleSetText: (id: string) => void;
};

export const PresetButtons = ({ handleSetText, text }: Props) => (
  <HStack mt="2">
    <Text>Presets:</Text>
    <ButtonGroup>
      {presetButtons.map((x) => (
        <Button
          colorScheme={text === x.value ? "teal" : undefined}
          key={x.value}
          onClick={() => handleSetText(x.value)}
        >
          {x.label}
        </Button>
      ))}
    </ButtonGroup>
  </HStack>
);
