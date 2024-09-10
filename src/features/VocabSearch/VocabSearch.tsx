import { Container, Text } from "@chakra-ui/react";
import { useFetchVocab } from "./hooks/useFetchVocab.ts";
import { useDebounce } from "use-debounce";
import { Logo } from "../../components/Logo.tsx";
import { TableSkeleton } from "./components/TableSkeleton.tsx";
import { SearchResultsHeader } from "./components/SearchResultsHeader.tsx";
import { PresetButtons } from "./components/PresetButtons.tsx";
import { SearchResultsRows } from "./components/SearchResultsRows.tsx";
import { VocabForm } from "./components/VocabForm.tsx";
import { VocabSearchForm } from "./types.ts";
import { FormProvider, useForm } from "react-hook-form";

export const VocabSearch = () => {
  const vocabSearchForm = useForm<VocabSearchForm>({
    defaultValues: {
      text: "level-n5",
      quizType: "no-quiz",
      min: "2",
      max: "2",
    },
  });
  const { quizType, min, max, onlyKanji, text } = vocabSearchForm.watch();
  const [debouncedText] = useDebounce(text, 350);
  const response = useFetchVocab({
    search: debouncedText,
    minLength: min,
    maxLength: max,
    onlyKanji,
  });

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
