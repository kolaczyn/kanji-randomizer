import { Box, Button } from "@chakra-ui/react";

type Props = {
  card: { question: string | null; answer: string | null };
  curr: { idx: number; isRevealed: boolean };
  handleIncorrect: (idx: number) => void;
  incorrect: number[];
};

export const QuizCard = ({ incorrect, handleIncorrect, card, curr }: Props) => {
  return (
    <Box>
      <Box fontSize="2rem">{card.question}</Box>
      {curr.isRevealed && (
        <>
          <div>{card.answer}</div>
          {curr.isRevealed && (
            <Button
              marginBottom="1rem"
              onClick={() => handleIncorrect(curr.idx)}
            >
              Mark as {incorrect.includes(curr.idx) ? "correct" : "incorrect"}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
