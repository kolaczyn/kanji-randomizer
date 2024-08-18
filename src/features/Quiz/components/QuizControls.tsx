import { Button, ButtonGroup } from "@chakra-ui/react";
import { Settings } from "../../../components/Settings.tsx";
import { useContext } from "react";
import { DeckContext } from "../context/DeckContext.tsx";
import { UseControlsReturn } from "../hooks/useControls.ts";

export const QuizControls = ({
  curr,
  isFirst,
  isLast,
  handlePrevious,
  handleNext,
}: UseControlsReturn) => {
  const deck = useContext(DeckContext);
  return (
    <ButtonGroup alignItems="center">
      <Button isDisabled={isFirst} onClick={handlePrevious}>
        Previous
      </Button>
      <span>
        {/*Math.min prevents text like "10 of 9" from appearing */}
        {Math.min(curr.idx + 1, deck.length)} of {deck.length}
      </span>
      <Button colorScheme="green" isDisabled={isLast} onClick={handleNext}>
        Next
      </Button>
      <Settings />
    </ButtonGroup>
  );
};
