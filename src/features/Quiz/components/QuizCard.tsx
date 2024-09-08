import { Box, Button, HStack } from "@chakra-ui/react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";
import { useControls } from "../hooks/useControls.ts";

type Props = {
  card: { question: string | null; answer: string | null };
};

export const QuizCard = ({ card }: Props) => {
  const [{ isRevealed }] = useAtom(deckAtom);
  const { correctAndNext, incorrectAndNext } = useControls();
  return (
    <Box>
      <Box fontSize="2rem">{card.question}</Box>
      {isRevealed && (
        <>
          <div>{card.answer}</div>
          {isRevealed && (
            <HStack spacing="2">
              <Button marginBottom="1rem" onClick={correctAndNext}>
                Ok (1)
              </Button>
              <Button marginBottom="1rem" onClick={incorrectAndNext}>
                Wrong (2)
              </Button>
            </HStack>
          )}
        </>
      )}
    </Box>
  );
};
