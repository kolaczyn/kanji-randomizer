import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { Logo } from "./Logo.tsx";
import { ChakraLink } from "./ChakraLink.tsx";
import { RouterLink } from "./RouterLink.tsx";
import { useFetchHomeTiles } from "../hooks/useFetchHomeTiles.ts";

export const StartScreen = () => {
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const state = { shouldShuffle };
  const result = useFetchHomeTiles();

  if (result.isLoading) return <h1>Loading</h1>;
  if (result.isError) return <h1>Error</h1>;

  const { tiles } = result.data!;

  return (
    <Container>
      <Logo />
      <UnorderedList listStyleType="none">
        {tiles.map((item, index) => (
          <ListItem key={index}>
            <ChakraLink as={RouterLink} to={`/${item.id}`} state={state}>
              {item.title} ({item.length})
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
