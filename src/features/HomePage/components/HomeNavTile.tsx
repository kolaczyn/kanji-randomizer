import { Box, Text } from "@chakra-ui/react";
import { RouterLink } from "../../../components/RouterLink.tsx";

type Props = {
  title: string;
  subtitle?: string;
  to: string;
};

export const HomeNavTile = ({ title, subtitle, to }: Props) => (
  <RouterLink to={to}>
    <Box
      transition="background-color 0.3s ease"
      bg="gray.100"
      p="2"
      borderRadius="12"
      cursor="pointer"
      _hover={{ bg: "green.100" }}
    >
      <Text fontWeight="bold">{title}</Text>
      {subtitle && <Text>{subtitle}</Text>}
    </Box>
  </RouterLink>
);
