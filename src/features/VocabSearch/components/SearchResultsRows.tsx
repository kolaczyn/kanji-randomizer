import { Box } from "@chakra-ui/react";
import { VocabRow } from "./VocabRow.tsx";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DefinedQueryObserverResult } from "@tanstack/react-query";
import { QuizType, VocabDto } from "../types.ts";

type Props = {
  response: DefinedQueryObserverResult<VocabDto>;
  quiz: QuizType;
};

export const SearchResultsRows = ({ response, quiz }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: response.data?.results.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 68,
    overscan: 5,
  });

  return (
    <>
      <Box>
        <Box
          ref={parentRef}
          style={{
            height: "500px",
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
                virtualRowSize={virtualRow.size}
                virtualRowStart={virtualRow.start}
                quiz={quiz}
                {...response.data.results[virtualRow.index]}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
