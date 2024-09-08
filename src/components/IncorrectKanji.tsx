import { toPercentage } from "../utils/toPercentage.ts";
import { useAtom } from "jotai/react";
import { deckAtom } from "../state/deckAtom.ts";

export const IncorrectKanji = () => {
  const [{ idx, incorrect, deck, isRevealed }] = useAtom(deckAtom);
  const soFar = idx + (isRevealed ? 1 : 0);

  const correct = soFar - incorrect.length;
  const correctPercent = toPercentage(correct, soFar);
  const incorrectPercent = toPercentage(incorrect.length, soFar);

  return incorrect.length > 0 ? (
    <>
      <div>Incorrect Kanji</div>
      <div>
        Incorrect: {incorrect.length} ({incorrectPercent})
      </div>
      <div>
        Okay: {correct} ({correctPercent})
      </div>
      <ul>
        {incorrect.map((idx) => (
          <li key={idx}>
            {deck[idx].character} - {deck[idx].meaning}
          </li>
        ))}
      </ul>
    </>
  ) : null;
};
