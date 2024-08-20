import { IncorrectKanji } from "../../../components/IncorrectKanji.tsx";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai/react";
import { deckAtom } from "../../../state/deckAtom.ts";
import { useSettings } from "../../../hooks/useSettings.ts";

export const Endgame = () => {
  const [{ incorrect }] = useAtom(deckAtom);
  const [{ showIncorrect }] = useSettings();
  const shouldShowIncorrect = incorrect.length > 0 && !showIncorrect;
  return (
    <>
      <h2>No more cards</h2>
      {shouldShowIncorrect ? <IncorrectKanji /> : null}
      <Link to="/">
        <Button>Exit</Button>
      </Link>
    </>
  );
};
