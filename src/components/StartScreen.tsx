import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { HomeScreenStatsDto } from "../types.ts";
import { Logo } from "./Logo.tsx";
import { ChakraLink } from "./ChakraLink.tsx";
import { RouterLink } from "./RouterLink.tsx";
import { useFetchHomeScreenStats } from "../hooks/useFetchHomeScreenStats.ts";

type NavItem = {
  link: `/${string}`;
  length: number;
  label: string;
};

const getNavItems = (x: HomeScreenStatsDto) => {
  const navN5: NavItem = {
    link: "/n5",
    length: x.n5,
    label: "N5 kanji",
  };

  const navN4 = {
    link: "/n4",
    length: x.n4,
    label: "N4 kanji",
  };
  const navN3 = {
    link: "/n3",
    length: x.n3,
    label: "N3 kanji",
  };
  const navN2 = {
    link: "/n2",
    length: x.n2,
    label: "N2 kanji",
  };
  const navN1 = {
    link: "/n1",
    length: x.n1,
    label: "N1 kanji",
  };

  const navHiraganaWithDakuten = {
    link: "/hiragana-with-dakuten",
    length: x.hiraganaWithDakuten,
    label: "Hiragana with dakuten",
  };

  const navHiraganaWithoutDakuten = {
    link: "/hiragana-without-dakuten",
    length: x.hiraganaWithoutDakuten,
    label: "Hiragana without dakuten",
  };

  const navKatakanaWithDakuten = {
    link: "/katakana-with-dakuten",
    length: x.katakanaWithDakuten,
    label: "Katakana with dakuten",
  };

  const navKatakanaWithoutDakuten = {
    link: "/katakana-without-dakuten",
    length: x.katakanaWithoutDakuten,
    label: "Katakana without dakuten",
  };

  return {
    kanji: [navN5, navN4, navN3, navN2, navN1],
    kana: [
      navHiraganaWithDakuten,
      navHiraganaWithoutDakuten,
      navKatakanaWithDakuten,
      navKatakanaWithoutDakuten,
    ],
  };
};
export const StartScreen = () => {
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const state = { shouldShuffle };
  const result = useFetchHomeScreenStats();

  if (result.isLoading) return <h1>Loading</h1>;
  if (result.isError) return <h1>Error</h1>;
  const { kana, kanji } = getNavItems(result.data!);

  return (
    <Container>
      <Logo />
      <Text fontSize="lg">Kanji</Text>
      <UnorderedList listStyleType="none">
        {kanji.map((item, index) => (
          <ListItem key={index}>
            <ChakraLink as={RouterLink} to={item.link} state={state}>
              {item.label} ({item.length})
            </ChakraLink>
          </ListItem>
        ))}
      </UnorderedList>
      <Text fontSize="lg">Kana</Text>
      <UnorderedList listStyleType="none">
        {kana.map((item, index) => (
          <ListItem key={index}>
            <ChakraLink as={RouterLink} to={item.link} state={state}>
              {item.label} ({item.length})
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
