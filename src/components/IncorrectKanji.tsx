import { KanjiList } from "../types.ts";

type Props = {
  incorrect: number[];
  deck: KanjiList;
};

export const IncorrectKanji = ({ incorrect, deck }: Props) =>
  incorrect.length > 0 ? (
    <>
      <div>Incorrect Kanji:</div>
      <ul>
        {incorrect.map((idx) => (
          <li key={idx}>
            {deck[idx][0]} - {deck[idx][1]}
          </li>
        ))}
      </ul>
    </>
  ) : null;
