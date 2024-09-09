import { Text } from "@chakra-ui/react";

type Props = {
  results: unknown[];
  timeMs: number;
};

export const SearchResultsHeader = ({ results, timeMs }: Props) => (
  <Text as="h2" fontSize="lg" mb="1" align="center">
    <Text as="span" fontWeight="bold">
      Results ({results.length})
    </Text>
    <Text as="span">, found in {Math.round(timeMs)}ms</Text>
  </Text>
);
