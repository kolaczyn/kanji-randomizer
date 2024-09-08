import { Container, Image } from "@chakra-ui/react";
import { WaniKaniLink } from "./WaniKaniLink.tsx";

type Props = {
  character: string;
  strokeImg: string | null;
  isKanji: boolean;
};

export const CharacterAdditionalInfo = ({
  character,
  strokeImg,
  isKanji,
}: Props) => {
  return (
    <>
      <Container pb="2">
        {isKanji && <WaniKaniLink character={character} />}
      </Container>
      {strokeImg && <Image mx="auto" src={strokeImg} alt={character} />}
    </>
  );
};
