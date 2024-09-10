import { Box } from "@chakra-ui/react";
import { VocabRow } from "./VocabRow.tsx";
import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { QuizType } from "../types.ts";
import { StrokeOrderDrawer } from "./StrokeOrderDrawer.tsx";

type Props = {
  results: {
    jap: string;
    eng: string;
    kana: string;
  }[];
  quiz: QuizType;
};

export const SearchResultsRows = ({ results, quiz }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [bottomSheet, setBottomSheet] = useState<string | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: results.length ?? 0,
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
                handleOpenStrokeOrder={setBottomSheet}
                {...results[virtualRow.index]}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <StrokeOrderDrawer
        text={bottomSheet}
        handleClose={() => setBottomSheet(null)}
      />
    </>
  );
};
