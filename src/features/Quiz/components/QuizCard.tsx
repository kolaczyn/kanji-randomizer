import { Box, Text } from "@chakra-ui/react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

type Props = {
  card: { question: string | null; answer: string | null };
};

export const QuizCard = ({ card }: Props) => {
  const [{ isRevealed }] = useAtom(deckAtom);

  return (
    <Box>
      <Text fontSize="2xl" textAlign="center">
        {card.question}
      </Text>
      {isRevealed && (
        <>
          <Text fontSize="2xl" textAlign="center">
            {card.answer}
          </Text>
        </>
      )}
    </Box>
  );
};
