import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFetchVocab } from "./hooks/useFetchVocab.ts";
import { useDebounce } from "use-debounce";
import { RubyText } from "./components/RubyText.tsx";
import { presetButtons } from "./consts.ts";

export const Vocab = () => {
  const [text, setText] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(255);
  const [debouncedText] = useDebounce(text, 350);
  const response = useFetchVocab({
    search: debouncedText,
    minLength: min,
    maxLength: max,
  });

  const handlePreset = (id: string) => {
    const fullId = `level-n${id}`;
    setText(fullId);
  };

  return (
    <>
      <Container mb="3">
        <Text as="h1" fontWeight="bold" fontSize="xl" mb="2">
          Vocab
        </Text>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kanji to look for in vocabulary dictionary"
        />
        <HStack mt="2">
          <FormControl>
            <FormLabel>Min length</FormLabel>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Max length</FormLabel>
            <Input
              type="number"
              placeholder="max length"
              value={max}
              onChange={(e) => setMax(e.target.valueAsNumber)}
            />
          </FormControl>
        </HStack>
        <HStack mt="2">
          <Text>Presets:</Text>
          <ButtonGroup>
            {presetButtons.map((x) => (
              <Button key={x.value} onClick={() => handlePreset(x.value)}>
                {x.label}
              </Button>
            ))}
          </ButtonGroup>
        </HStack>
      </Container>

      <Container maxW="container.lg">
        {response.data ? (
          <>
            <Text as="h2" fontWeight="bold" fontSize="lg" mb="1" align="center">
              Results ({response.data.results.length}), took{" "}
              {Math.round(response.data.timeMs)}ms
            </Text>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Japanese</Th>
                    <Th>English</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {response.data.results.map((x, idx) => (
                    <Tr key={idx}>
                      <Td>
                        <RubyText text={x.jap} explanation={x.kana} />
                      </Td>
                      <Td>{x.eng}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : response.isLoading ? (
          <Stack>
            <Skeleton height="40px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : null}
      </Container>
    </>
  );
};
