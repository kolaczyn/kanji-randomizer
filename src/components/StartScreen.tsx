import { Link } from "react-router-dom";
import { Button, Container } from "@chakra-ui/react";

export const StartScreen = () => {
  return (
    <Container>
      <h1>Kanji Test</h1>
      <Link to="/n5">
        <Button>JLPT N5 kanji</Button>
      </Link>
      <Link to="/n4">
        <Button>JLPT N4 kanji</Button>
      </Link>
    </Container>
  );
};
