import { Container, Image } from "@chakra-ui/react";
import { kanjiToStrokeImgName } from "../utils/kanjiToStrokeImgName.ts";
import { ChakraLink } from "../../../components/ChakraLink.tsx";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type Props = {
  kanji: string;
};

export const CharacterAdditionalInfo = ({ kanji }: Props) => {
  return (
    <>
      <Container pb="2">
        <ChakraLink isExternal href={`https://www.wanikani.com/kanji/${kanji}`}>
          See WaniKani page
          <ExternalLinkIcon ml="1" />
        </ChakraLink>
      </Container>
      <Image mx="auto" src={kanjiToStrokeImgName(kanji)} alt={kanji} />
    </>
  );
};
