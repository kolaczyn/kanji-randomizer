import { ChakraLink } from "../../../components/ChakraLink.tsx";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type Props = {
  character: string;
};

export const WaniKaniLink = ({ character }: Props) => (
  <ChakraLink isExternal href={`https://www.wanikani.com/kanji/${character}`}>
    See WaniKani page
    <ExternalLinkIcon ml="1" />
  </ChakraLink>
);
