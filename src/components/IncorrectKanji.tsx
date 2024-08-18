import { KanjiList } from "../types.ts";
import { toPercentage } from "../utils/toPercentage.ts";

type Props = {
  incorrect: number[];
  deck: KanjiList;
  curr: {
    idx: number;
    isRevealed: boolean;
  };
};

export const IncorrectKanji = ({ incorrect, deck, curr }: Props) => {
  const soFar = curr.idx + (curr.isRevealed ? 1 : 0);

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
            {deck[idx][0]} - {deck[idx][1]}
          </li>
        ))}
      </ul>
    </>
  ) : null;
};
