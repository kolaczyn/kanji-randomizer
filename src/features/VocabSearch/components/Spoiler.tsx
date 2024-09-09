import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  hide: boolean;
};

export const Spoiler = ({ children, hide }: Props) => {
  return (
    <Box
      bg={hide ? "gray.900" : "white"}
      _hover={{
        bg: "white",
      }}
    >
      {children}
    </Box>
  );
};
