import { toPercentage } from "../utils/toPercentage.ts";
import { useAtom } from "jotai/react";
import { deckAtom } from "../state/deckAtom.ts";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";

export const IncorrectKanji = () => {
  const [{ idx, incorrect, deck, isRevealed }] = useAtom(deckAtom);
  const soFar = idx + (isRevealed ? 1 : 0);

  const correct = soFar - incorrect.length;
  const correctPercent = toPercentage(correct, soFar);
  const incorrectPercent = toPercentage(incorrect.length, soFar);

  return incorrect.length > 0 ? (
    <>
      <Text fontWeight="bold">Summary</Text>
      <div>
        Incorrect: {incorrect.length} ({incorrectPercent})
      </div>
      <div>
        Okay: {correct} ({correctPercent})
      </div>
      <UnorderedList>
        {incorrect.map((idx) => (
          <ListItem key={idx} listStyleType="none">
            {deck[idx].character} - {deck[idx].meaning}
          </ListItem>
        ))}
      </UnorderedList>
    </>
  ) : null;
};
