import { Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFetchVocab } from "./hooks/useFetchVocab.ts";
import { useDebounce } from "use-debounce";
import { Logo } from "../../components/Logo.tsx";
import { TableSkeleton } from "./components/TableSkeleton.tsx";
import { SearchResultsHeader } from "./components/SearchResultsHeader.tsx";
import { PresetButtons } from "./components/PresetButtons.tsx";
import { SearchResultsRows } from "./components/SearchResultsRows.tsx";
import { VocabForm } from "./components/VocabForm.tsx";
import { NumStr } from "./types.ts";

export const VocabSearch = () => {
  const [text, setText] = useState("level-n5");
  const [min, setMin] = useState<NumStr>("2");
  const [max, setMax] = useState<NumStr>("2");
  const [debouncedText] = useDebounce(text, 350);
  const response = useFetchVocab({
    search: debouncedText,
    minLength: min,
    maxLength: max,
  });

  return (
    <>
      <Container mb="3">
        <Logo />
        <Text as="h1" fontWeight="bold" fontSize="xl" mb="2">
          Vocab
        </Text>
        <VocabForm
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          setText={setText}
          text={text}
        />
        <PresetButtons handleSetText={setText} text={text} />
      </Container>

      <Container maxW="container.lg">
        {response.data ? (
          <>
            <SearchResultsHeader
              results={response.data.results}
              timeMs={response.data.timeMs}
            />
            <SearchResultsRows response={response} />
          </>
        ) : response.isLoading ? (
          <TableSkeleton />
        ) : null}
      </Container>
    </>
  );
};
