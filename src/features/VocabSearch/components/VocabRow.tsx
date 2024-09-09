import { Button, HStack } from "@chakra-ui/react";
import { RubyText } from "./RubyText.tsx";
import { memo } from "react";
import { QuizType } from "../types.ts";
import { Spoiler } from "./Spoiler.tsx";

type Props = {
  jap: string;
  kana: string;
  eng: string;
  virtualRowSize: number;
  virtualRowStart: number;
  quiz: QuizType;
  handleOpenStrokeOrder: (text: string) => void;
};

export const VocabRow = memo(
  ({
    jap,
    eng,
    kana,
    virtualRowStart,
    virtualRowSize,
    quiz,
    handleOpenStrokeOrder,
  }: Props) => (
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
      <Spoiler hide={quiz === "hide-kanji"}>
        <RubyText text={jap} explanation={kana} />
      </Spoiler>
      <Spoiler hide={quiz === "hide-vocab"}>{eng}</Spoiler>
      <Button onClick={() => handleOpenStrokeOrder(jap)}>Stroke order</Button>
    </HStack>
  ),
);
