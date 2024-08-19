import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
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
import { Logo } from "./Logo.tsx";
import { ChakraLink } from "./ChakraLink.tsx";
import { RouterLink } from "./RouterLink.tsx";

type NavItem = {
  link: `/${string}`;
  data: KanjiList;
  label: string;
};

const navN5: NavItem = {
  link: "/n5",
  data: kanjiN5,
  label: "N5 kanji",
};

const navN4 = {
  link: "/n4",
  data: kanjiN4,
  label: "N4 kanji",
};
const navN3 = {
  link: "/n3",
  data: kanjiN3,
  label: "N3 kanji",
};
const navN2 = {
  link: "/n2",
  data: kanjiN2,
  label: "N2 kanji",
};
const navN1 = {
  link: "/n1",
  data: kanjiN1,
  label: "N1 kanji",
};

const navHiraganaWithDakuten = {
  link: "/hiragana-with-dakuten",
  data: hiraganaWithDakuten,
  label: "Hiragana with dakuten",
};

const navHiraganaWithoutDakuten = {
  link: "/hiragana-without-dakuten",
  data: hiraganaWithoutDakuten,
  label: "Hiragana without dakuten",
};

const navKatakanaWithDakuten = {
  link: "/katakana-with-dakuten",
  data: katakanaWithDakuten,
  label: "Katakana with dakuten",
};

const navKatakanaWithoutDakuten = {
  link: "/katakana-without-dakuten",
  data: katakanaWithoutDakuten,
  label: "Katakana without dakuten",
};

export const StartScreen = () => {
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const state = { shouldShuffle };

  return (
    <Container>
      <Logo />
      <Text fontSize="lg">Kanji</Text>
      <UnorderedList listStyleType="none">
        {[navN5, navN4, navN3, navN2, navN1].map((item, index) => (
          <ListItem key={index}>
            <ChakraLink as={RouterLink} to={item.link} state={state}>
              {item.label} ({item.data.length})
            </ChakraLink>
          </ListItem>
        ))}
      </UnorderedList>
      <Text fontSize="lg">Kana</Text>
      <UnorderedList listStyleType="none">
        {[
          navHiraganaWithDakuten,
          navHiraganaWithoutDakuten,
          navKatakanaWithDakuten,
          navKatakanaWithoutDakuten,
        ].map((item, index) => (
          <ListItem key={index}>
            <ChakraLink as={RouterLink} to={item.link} state={state}>
              {item.label} ({item.data.length})
            </ChakraLink>
          </ListItem>
        ))}
      </UnorderedList>
      <Checkbox
        mt="2"
        isChecked={shouldShuffle}
        onChange={(e) => setShouldShuffle(e.target.checked)}
      >
        Shuffle
      </Checkbox>
    </Container>
  );
};
