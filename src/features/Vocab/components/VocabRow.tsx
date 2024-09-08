import { Td, Tr } from "@chakra-ui/react";
import { RubyText } from "./RubyText.tsx";
import { memo } from "react";

type Props = {
  jap: string;
  kana: string;
  eng: string;
};

export const VocabRow = memo(({ jap, eng, kana }: Props) => (
  <Tr>
    <Td>
      <RubyText text={jap} explanation={kana} />
    </Td>
    <Td>{eng}</Td>
  </Tr>
));
