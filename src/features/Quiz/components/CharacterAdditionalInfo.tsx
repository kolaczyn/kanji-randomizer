import { Container, Image } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { kanjiToStrokeImgName } from "../utils/kanjiToStrokeImgName.ts";

type Props = {
  kanji: string;
};

export const CharacterAdditionalInfo = ({ kanji }: Props) => {
  return (
    <>
      <Container pb="2">
        <ChakraLink isExternal href={`https://www.wanikani.com/kanji/${kanji}`}>
          See WaniKani page
        </ChakraLink>
      </Container>
      <Image mx="auto" src={kanjiToStrokeImgName(kanji)} alt={kanji} />
    </>
  );
};
