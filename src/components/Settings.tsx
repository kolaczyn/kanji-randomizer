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
import { Link, useNavigate } from "react-router-dom";
import { ShowFirst, useSettings } from "../hooks/useSettings.ts";

export const Settings = () => {
  const [settings, setSettings] = useSettings();
  const navigate = useNavigate();
  const handleReset = () => {
    navigate(0);
  };

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
            <Button onClick={handleReset}>Reset</Button>
            <Link to="/">
              <Button colorScheme="red">Exit (abandon progress)</Button>
            </Link>
            <Box my="2">
              <hr />
            </Box>
            <RadioGroup
              value={settings.showIncorrect ? "true" : "false"}
              onChange={handleShowIncorrectChange}
            >
              <Stack>
                <Radio value="false">Hide incorrect</Radio>
                <Radio value="true">Show incorrect</Radio>
              </Stack>
            </RadioGroup>
            <hr />
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
