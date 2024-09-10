import { Container, Grid, GridItem } from "@chakra-ui/react";
import { Logo } from "../../components/Logo.tsx";
import { HomeNavTile } from "./components/HomeNavTile.tsx";

const navTiles = [
  {
    title: "Start Quiz",
    to: "/deck-start",
  },
  {
    title: "Vocab Search",
    to: "/vocab-search",
  },
  {
    title: "Kanji",
    to: "/kanji",
  },
];

export const HomePage = () => {
  return (
    <Container>
      <Logo />
      <Grid mt="2" gridTemplateColumns="repeat(2, 1fr)" gap="2">
        {navTiles.map((x) => (
          <GridItem key={x.to}>
            <HomeNavTile title={x.title} to={x.to} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};
