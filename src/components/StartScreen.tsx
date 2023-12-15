import { Link } from "react-router-dom";
import { Button, Container } from "@chakra-ui/react";
import { useRandomNum } from "../hooks/useRandomNum.ts";

export const StartScreen = () => {
  const rand = useRandomNum();
  const urlWithRand = (path: string) => `${path}?seed=${rand}`;
  return (
    <Container>
      <h1>Kanji Test</h1>
      <Link to={urlWithRand("/n5")}>
        <Button>JLPT N5 kanji</Button>
      </Link>
      <Link to={urlWithRand("/n4")}>
        <Button>JLPT N4 kanji</Button>
      </Link>
    </Container>
  );
};
