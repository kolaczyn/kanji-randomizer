import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { Logo } from "./Logo.tsx";
import { ChakraLink } from "./ChakraLink.tsx";
import { RouterLink } from "./RouterLink.tsx";
import { useFetchHomeTiles } from "../hooks/useFetchHomeTiles.ts";
import { NavTile } from "./NavTile.tsx";

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
      <Grid templateColumns="repeat(2, 1fr)" gap="2">
        {tiles.map((item) => (
          <GridItem key={item.id}>
            <ChakraLink as={RouterLink} to={`/${item.id}`} state={state}>
              <NavTile title={item.title} subtitle={`${item.length} cards`} />
            </ChakraLink>
          </GridItem>
        ))}
      </Grid>
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
