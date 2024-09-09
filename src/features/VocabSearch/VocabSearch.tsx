import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useFetchVocab } from "./hooks/useFetchVocab.ts";
import { useDebounce } from "use-debounce";
import { presetButtons } from "./consts.ts";
import { VocabRow } from "./components/VocabRow.tsx";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Logo } from "../../components/Logo.tsx";

export const VocabSearch = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("level-n5");
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(2);
  const [debouncedText] = useDebounce(text, 350);
  const response = useFetchVocab({
    search: debouncedText,
    minLength: min,
    maxLength: max,
  });

  const rowVirtualizer = useVirtualizer({
    count: response.data?.results.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 68,
    overscan: 5,
  });

  console.log(rowVirtualizer);

  return (
    <>
      <Container mb="3">
        <Logo />
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
              <Button
                colorScheme={text === x.value ? "teal" : undefined}
                key={x.value}
                onClick={() => setText(x.value)}
              >
                {x.label}
              </Button>
            ))}
          </ButtonGroup>
        </HStack>
      </Container>

      <Container maxW="container.lg">
        {response.data ? (
          <>
            <Text as="h2" fontSize="lg" mb="1" align="center">
              <Text as="span" fontWeight="bold">
                Results ({response.data.results.length})
              </Text>
              <Text as="span">
                , found in {Math.round(response.data.timeMs)}ms
              </Text>
            </Text>
            <Box>
              <Box
                ref={parentRef}
                style={{
                  height: `500px`,
                  overflow: "auto",
                }}
              >
                <Box
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                    <VocabRow
                      key={virtualRow.index}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      {...response.data.results[virtualRow.index]}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
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
