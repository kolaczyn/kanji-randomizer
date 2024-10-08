import { Button, Container, Text } from "@chakra-ui/react";
import { useFetchVocab, VocabQueryDto } from "./hooks/useFetchVocab.ts";
import { useDebounce } from "use-debounce";
import { Logo } from "../../components/Logo.tsx";
import { TableSkeleton } from "./components/TableSkeleton.tsx";
import { SearchResultsHeader } from "./components/SearchResultsHeader.tsx";
import { PresetButtons } from "./components/PresetButtons.tsx";
import { SearchResultsRows } from "./components/SearchResultsRows.tsx";
import { VocabForm } from "./components/VocabForm.tsx";
import { VocabSearchForm } from "./types.ts";
import { FormProvider, useForm } from "react-hook-form";
import { RouterLink } from "../../components/RouterLink.tsx";
import { useMemo } from "react";
import queryString from "query-string";

export const VocabSearch = () => {
  const vocabSearchForm = useForm<VocabSearchForm>({
    defaultValues: {
      onlyKanji: true,
      query: "level-n5",
      quizType: "no-quiz",
      min: "2",
      max: "2",
    },
  });
  const { quizType, min, max, onlyKanji, query } = vocabSearchForm.watch();
  const [debouncedQuery] = useDebounce(query, 350);
  const response = useFetchVocab({
    query: debouncedQuery,
    minLen: min,
    maxLen: max,
    onlyKanji,
  });

  const isButtonDisabled = (response.data?.results.length ?? 0) === 0;

  const btnLink = useMemo(() => {
    const form = vocabSearchForm.getValues();
    return `/deck?${queryString.stringify({
      vocab: true,
      minLen: form.min,
      maxLen: form.max,
      query: debouncedQuery,
      onlyKanji: form.onlyKanji,
    } as VocabQueryDto)}`;
  }, [debouncedQuery, vocabSearchForm]);

  return (
    <>
      <Container mb="3">
        <Logo />
        <Text as="h1" fontWeight="bold" fontSize="xl" mb="2">
          Vocab
        </Text>
        <FormProvider {...vocabSearchForm}>
          <VocabForm />
          <PresetButtons />
        </FormProvider>
      </Container>

      <Container>
        <Button
          to={btnLink}
          colorScheme="teal"
          isDisabled={isButtonDisabled}
          as={RouterLink}
        >
          Vocab Quiz
        </Button>
      </Container>

      <Container maxW="container.lg">
        {response.data ? (
          <>
            <SearchResultsHeader
              results={response.data.results}
              timeMs={response.data.timeMs}
            />
            <SearchResultsRows
              results={response.data.results}
              quiz={quizType}
            />
          </>
        ) : response.isLoading ? (
          <TableSkeleton />
        ) : null}
      </Container>
    </>
  );
};
