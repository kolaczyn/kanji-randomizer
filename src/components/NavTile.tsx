import { Box, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  subtitle: string;
};

export const NavTile = ({ title, subtitle }: Props) => (
  <Box
    transition="background-color 0.3s ease"
    bg="gray.100"
    p="2"
    borderRadius="12"
    _hover={{ bg: "gray.200" }}
  >
    <Text fontWeight="bold">{title}</Text>
    <Text>{subtitle}</Text>
  </Box>
);
