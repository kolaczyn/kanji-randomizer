import {
  Container,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFetchVocab } from "./hooks/useFetchVocab.ts";
import { useDebounce } from "use-debounce";

export const Vocab = () => {
  const [text, setText] = useState("");
  const [debounced] = useDebounce(text, 550);
  const response = useFetchVocab(debounced);
  return (
    <Container>
      <Text as="h1" fontWeight="bold" fontSize="xl" mb="2">
        Vocab
      </Text>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Kanji to look for in vocabulary dictionary"
      />
      {response.data ? (
        <>
          <Text as="h2" fontWeight="bold" fontSize="lg" mt="3" mb="1">
            Results ({response.data.results.length})
          </Text>
          <UnorderedList listStylePosition="inside">
            {response.data.results.map((x, idx) => (
              <ListItem key={idx}>
                {x.jap} ({x.kana}): {x.eng}
              </ListItem>
            ))}
          </UnorderedList>
        </>
      ) : null}
    </Container>
  );
};
