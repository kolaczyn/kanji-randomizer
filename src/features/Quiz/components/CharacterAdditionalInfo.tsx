import { Container, Image } from "@chakra-ui/react";
import { kanjiToStrokeImgName } from "../utils/kanjiToStrokeImgName.ts";
import { ChakraLink } from "../../../components/ChakraLink.tsx";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { kanaToStrokeImgName } from "../utils/kanaToStrokeImgName.ts";

type Props = {
  kanji: string;
  isKanji: boolean;
  explanation: string;
};

export const CharacterAdditionalInfo = ({
  kanji,
  isKanji,
  explanation,
}: Props) => {
  const imgUrl = isKanji
    ? kanjiToStrokeImgName(kanji)
    : kanaToStrokeImgName(explanation);

  return (
    <>
      <Container pb="2">
        {isKanji && (
          <ChakraLink
            isExternal
            href={`https://www.wanikani.com/kanji/${kanji}`}
          >
            See WaniKani page
            <ExternalLinkIcon ml="1" />
          </ChakraLink>
        )}
      </Container>
      <Image mx="auto" src={imgUrl} alt={kanji} />
    </>
  );
};
