import { Box, Button } from "@chakra-ui/react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

type Props = {
  card: { question: string | null; answer: string | null };
  handleIncorrect: (idx: number) => void;
};

export const QuizCard = ({ card, handleIncorrect }: Props) => {
  const [{ idx, incorrect, isRevealed }] = useAtom(deckAtom);
  return (
    <Box>
      <Box fontSize="2rem">{card.question}</Box>
      {isRevealed && (
        <>
          <div>{card.answer}</div>
          {isRevealed && (
            <Button marginBottom="1rem" onClick={() => handleIncorrect(idx)}>
              Mark as {incorrect.includes(idx) ? "correct" : "incorrect"}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
