import { Text } from "@chakra-ui/react";

type Props = {
  text: string;
  explanation: string;
};

export const RubyText = ({ text, explanation }: Props) => (
  <Text fontSize="x-large">
    <ruby>
      {text} <rp>(</rp>
      <rt>{explanation}</rt>
      <rp>)</rp>{" "}
    </ruby>
  </Text>
);
