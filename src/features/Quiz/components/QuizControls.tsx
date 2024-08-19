import { Button, ButtonGroup } from "@chakra-ui/react";
import { Settings } from "../../../components/Settings.tsx";
import { useControls } from "../hooks/useControls.ts";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export const QuizControls = () => {
  const [{ deck, idx }] = useAtom(deckAtom);
  const { handlePrevious, handleNext, isFirst, isLast } = useControls();
  return (
    <ButtonGroup alignItems="center">
      <Button isDisabled={isFirst} onClick={handlePrevious}>
        Previous
      </Button>
      <span>
        {/*Math.min prevents text like "10 of 9" from appearing */}
        {Math.min(idx + 1, deck.length)} of {deck.length}
      </span>
      <Button colorScheme="green" isDisabled={isLast} onClick={handleNext}>
        Next
      </Button>
      <Settings />
    </ButtonGroup>
  );
};
