import { API_BASE_URL } from "../../../const/env.ts";
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Image,
  VStack,
  Text,
  DrawerHeader,
} from "@chakra-ui/react";

type Props = {
  text: string | null;
  handleClose: () => void;
};

export const StrokeOrderDrawer = ({ text, handleClose }: Props) => {
  return (
    <Drawer isOpen={!!text} placement="right" onClose={handleClose} size="xl">
      <DrawerOverlay />
      <DrawerContent p="5">
        <DrawerCloseButton />
        <DrawerHeader>Stroke order for {text}</DrawerHeader>
        <VStack align="flex-start" overflow="scroll">
          {text?.split("").map((x, idx) => (
            <Box key={idx}>
              <Text fontSize="xl">{x}</Text>
              <Image
                key={idx}
                src={`${API_BASE_URL}/imgs/stroke/${x}`}
                height="100"
              />
            </Box>
          ))}
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};
