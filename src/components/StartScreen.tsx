import { Button, Container, Grid, GridItem, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { Logo } from "./Logo.tsx";
import { useFetchHomeTiles } from "../hooks/useFetchHomeTiles.ts";
import { NavTile } from "./NavTile.tsx";
import { useToggleList } from "../hooks/useToggleList.ts";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

export const StartScreen = () => {
  const navigate = useNavigate();
  const [selectedDecks, selectedDecksToggle] = useToggleList<string>([]);
  const [shouldShuffle, setShouldShuffle] = useState(false);
  const result = useFetchHomeTiles();

  const isButtonDisabled = selectedDecks.length === 0;
  const buttonLabel = isButtonDisabled ? "Select a deck" : "Start";

  const handleStart = () => {
    const search = queryString.stringify({
      decks: selectedDecks,
      shouldShuffle: shouldShuffle,
    });
    navigate({
      pathname: "/deck",
      search,
    });
  };

  if (result.isLoading) return <h1>Loading</h1>;
  if (result.isError) return <h1>Error</h1>;

  const { tiles } = result.data!;

  return (
    <Container>
      <VStack>
        <Logo />
        <Grid templateColumns="repeat(2, 1fr)" gap="2">
          {tiles.map((item) => (
            <GridItem key={item.id}>
              <NavTile
                onClick={() => {
                  selectedDecksToggle(item.id);
                }}
                isSelected={selectedDecks.includes(item.id)}
                title={item.title}
                subtitle={`${item.length} cards`}
              />
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
        <Button
          w="full"
          colorScheme="teal"
          isDisabled={isButtonDisabled}
          onClick={handleStart}
        >
          {buttonLabel}
        </Button>
      </VStack>
    </Container>
  );
};
