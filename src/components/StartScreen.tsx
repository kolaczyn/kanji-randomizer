import { Link } from "react-router-dom";
import { Button, Container } from "@chakra-ui/react";
import { kanjiN5 } from "../const/kanjiN5.ts";
import { kanjiN4 } from "../const/kanjiN4.ts";
import { kanjiN3 } from "../const/kanjiN3.ts";
import { kanjiN2 } from "../const/kanjiN2.ts";
import { kanjiN1 } from "../const/kanjiN1.ts";
import {
  hiraganaWithDakuten,
  hiraganaWithoutDakuten,
} from "../const/hiragana.ts";
import {
  katakanaWithDakuten,
  katakanaWithoutDakuten,
} from "../const/katakana.ts";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { KanjiList } from "../types.ts";

type NavItem =
  | {
      link: `/${string}`;
      data: KanjiList;
      label: string;
    }
  | {
      divider: true;
    };

const nav: NavItem[] = [
  {
    link: "/n5",
    data: kanjiN5,
    label: "N5 kanji",
  },
  {
    link: "/n4",
    data: kanjiN4,
    label: "N4 kanji",
  },
  {
    link: "/n3",
    data: kanjiN3,
    label: "N3 kanji",
  },
  {
    link: "/n2",
    data: kanjiN2,
    label: "N2 kanji",
  },
  {
    link: "/n1",
    data: kanjiN1,
    label: "N1 kanji",
  },
  {
    divider: true,
  },
  {
    link: "/hiragana-with-dakuten",
    data: hiraganaWithDakuten,
    label: "Hiragana with dakuten",
  },
  {
    link: "/hiragana-without-dakuten",
    data: hiraganaWithoutDakuten,
    label: "Hiragana without dakuten",
  },
  {
    divider: true,
  },
  {
    link: "/katakana-with-dakuten",
    data: katakanaWithDakuten,
    label: "Katakana with dakuten",
  },
  {
    link: "/katakana-without-dakuten",
    data: katakanaWithoutDakuten,
    label: "Katakana without dakuten",
  },
  { divider: true },
];

export const StartScreen = () => {
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const state = { shouldShuffle };
  return (
    <Container>
      <h1>Kanji Test</h1>
      {nav.map((item, index) =>
        "divider" in item ? (
          <hr key={index} />
        ) : (
          <Link to={item.link} state={state} key={index}>
            <Button>
              {item.label} ({item.data.length})
            </Button>
          </Link>
        ),
      )}
      <Checkbox
        isChecked={shouldShuffle}
        onChange={(e) => setShouldShuffle(e.target.checked)}
      >
        Shuffle
      </Checkbox>
    </Container>
  );
};
