import { Box, Button } from "@chakra-ui/react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";
import { useControls } from "../hooks/useControls.ts";

type Props = {
  card: { question: string | null; answer: string | null };
};

export const QuizCard = ({ card }: Props) => {
  const [{ idx, incorrect, isRevealed }] = useAtom(deckAtom);
  const { handleToggleIncorrect } = useControls();
  return (
    <Box>
      <Box fontSize="2rem">{card.question}</Box>
      {isRevealed && (
        <>
          <div>{card.answer}</div>
          {isRevealed && (
            <Button marginBottom="1rem" onClick={handleToggleIncorrect}>
              Mark as {incorrect.includes(idx) ? "correct" : "incorrect"}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
