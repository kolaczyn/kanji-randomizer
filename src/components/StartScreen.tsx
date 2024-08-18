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

export const StartScreen = () => {
  return (
    <Container>
      <h1>Kanji Test</h1>
      <Link to="/n5">
        <Button>N5 kanji ({kanjiN5.length})</Button>
      </Link>
      <Link to="/n4">
        <Button>N4 kanji ({kanjiN4.length})</Button>
      </Link>
      <Link to="/n3">
        <Button>N3 kanji ({kanjiN3.length})</Button>
      </Link>
      <Link to="/n2">
        <Button>N2 kanji ({kanjiN2.length})</Button>
      </Link>
      <Link to="/n1">
        <Button>N1 kanji ({kanjiN1.length})</Button>
      </Link>
      <hr />
      <Link to="/hiragana-with-dakuten">
        <Button>Hiragana with dakuten ({hiraganaWithDakuten.length})</Button>
      </Link>
      <Link to="/hiragana-without-dakuten">
        <Button>
          Hiragana without dakuten ({hiraganaWithoutDakuten.length})
        </Button>
      </Link>
      <hr />
      <Link to="/katakana-with-dakuten">
        <Button>Katakana with dakuten ({katakanaWithDakuten.length})</Button>
      </Link>
      <Link to="/katakana-without-dakuten">
        <Button>
          Katakana without dakuten ({katakanaWithoutDakuten.length})
        </Button>
      </Link>
    </Container>
  );
};
