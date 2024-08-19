import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ShowFirst, useSettings } from "../hooks/useSettings.ts";
import { AbandonProgress } from "./AbandonProgress.tsx";

export const Settings = () => {
  const [settings, setSettings] = useSettings();

  const handleShowIncorrectChange = (value: string) => {
    setSettings({
      showIncorrect: value === "true",
      showFirst: settings.showFirst,
    });
  };

  const handleShowFirstChange = (value: ShowFirst) => {
    setSettings({
      showIncorrect: settings.showIncorrect,
      showFirst: value,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>More</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AbandonProgress />
            <Box my="4" />
            <RadioGroup
              value={settings.showIncorrect ? "true" : "false"}
              onChange={handleShowIncorrectChange}
            >
              <Stack>
                <Radio value="false">Hide incorrect</Radio>
                <Radio value="true">Show incorrect</Radio>
              </Stack>
            </RadioGroup>
            <Box my="4" />
            <RadioGroup
              value={settings.showFirst}
              onChange={handleShowFirstChange}
            >
              <Stack>
                <Radio value="kanji">Show kanji</Radio>
                <Radio value="definition">Show explanation</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
