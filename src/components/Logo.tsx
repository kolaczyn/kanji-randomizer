import { ChakraLink } from "./ChakraLink.tsx";
import { RouterLink } from "./RouterLink.tsx";

export const Logo = () => (
  <ChakraLink as={RouterLink} to="/" mb="2" fontSize="2xl" fontWeight="bold">
    Kanji Randomizer
  </ChakraLink>
);
