import { Container, Image } from "@chakra-ui/react";
import { ChakraLink } from "../../../components/ChakraLink.tsx";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type Props = {
  character: string;
  strokeImg: string | null;
};

export const CharacterAdditionalInfo = ({ character, strokeImg }: Props) => {
  return (
    <>
      <Container pb="2">
        <ChakraLink
          isExternal
          href={`https://www.wanikani.com/kanji/${character}`}
        >
          See WaniKani page
          <ExternalLinkIcon ml="1" />
        </ChakraLink>
      </Container>
      {strokeImg && <Image mx="auto" src={strokeImg} alt={character} />}
    </>
  );
};
