import { Box, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  subtitle: string;
  isSelected?: boolean;
  onClick: () => void;
};

// TODO this should be a box, but I don't want to restyle this whole thing
export const NavTile = ({
  title,
  subtitle,
  isSelected = false,
  onClick,
}: Props) => (
  <Box
    onClick={onClick}
    transition="background-color 0.3s ease"
    bg={isSelected ? "green.100" : "gray.100"}
    p="2"
    borderRadius="12"
    cursor="pointer"
    _hover={{ bg: isSelected ? "green.100" : "gray.100" }}
  >
    <Text fontWeight="bold">{title}</Text>
    <Text>{subtitle}</Text>
  </Box>
);
