import { Box, HStack } from "@chakra-ui/react";
import { RubyText } from "./RubyText.tsx";
import { memo } from "react";

type Props = {
  jap: string;
  kana: string;
  eng: string;
  virtualRowSize: number;
  virtualRowStart: number;
};

export const VocabRow = memo(
  ({ jap, eng, kana, virtualRowStart, virtualRowSize }: Props) => (
    <HStack
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualRowSize}px`,
        transform: `translateY(${virtualRowStart}px)`,
      }}
    >
      <Box>
        <RubyText text={jap} explanation={kana} />
      </Box>
      <Box>{eng}</Box>
    </HStack>
  ),
);
