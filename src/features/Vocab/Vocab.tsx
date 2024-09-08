import {
  Container,
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

export const Vocab = () => {
  const [text, setText] = useState("");
  const [debounced] = useDebounce(text, 550);
  const response = useFetchVocab(debounced);
  return (
    <>
      <Container>
        <Text as="h1" fontWeight="bold" fontSize="xl" mb="2">
          Vocab
        </Text>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kanji to look for in vocabulary dictionary"
        />
      </Container>
      <Container maxW="container.lg">
        {response.data ? (
          <>
            <Text
              as="h2"
              fontWeight="bold"
              fontSize="lg"
              mt="3"
              mb="1"
              align="center"
            >
              Results ({response.data.results.length})
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
        ) : null}
      </Container>
    </>
  );
};
