import { Box, HStack } from "@chakra-ui/react";
import { RubyText } from "./RubyText.tsx";
import { CSSProperties, memo } from "react";

type Props = {
  jap: string;
  kana: string;
  eng: string;
  style: CSSProperties;
};

export const VocabRow = memo(({ jap, eng, kana, style }: Props) => (
  <HStack style={style}>
    <Box>
      <RubyText text={jap} explanation={kana} />
    </Box>
    <Box>{eng}</Box>
  </HStack>
));
