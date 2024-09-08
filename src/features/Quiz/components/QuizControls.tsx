import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { Settings } from "../../../components/Settings.tsx";
import { useControls } from "../hooks/useControls.ts";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export const QuizControls = () => {
  const [{ deck, idx, isRevealed }] = useAtom(deckAtom);
  const {
    handlePrevious,
    handleNext,
    isFirst,
    isLast,
    correctAndNext,
    incorrectAndNext,
  } = useControls();

  return (
    <VStack>
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
      </ButtonGroup>
      <ButtonGroup>
        <Button isDisabled={!isRevealed} onClick={correctAndNext}>
          Ok (1)
        </Button>
        <Button isDisabled={!isRevealed} onClick={incorrectAndNext}>
          Wrong (2)
        </Button>
        <Settings />
      </ButtonGroup>
    </VStack>
  );
};
