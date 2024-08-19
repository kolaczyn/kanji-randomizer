import { IncorrectKanji } from "../../../components/IncorrectKanji.tsx";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";

export const Endgame = () => {
  const [{ incorrect }] = useAtom(deckAtom);
  return (
    <>
      <h2>No more cards</h2>
      {incorrect.length > 0 ? <IncorrectKanji /> : null}
      <Link to="/">
        <Button>Exit</Button>
      </Link>
    </>
  );
};
