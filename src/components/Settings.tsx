import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../hooks/useSettings.ts";

export const Settings = () => {
  const [settings, setSettings] = useSettings();
  const navigate = useNavigate();
  const handleReset = () => {
    navigate(0);
  };

  const showKanji = settings.showFirst === "kanji";

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
            <Button
              onClick={() =>
                setSettings({
                  showIncorrect: !settings.showIncorrect,
                  showFirst: settings.showFirst,
                })
              }
            >
              {settings.showIncorrect ? "Hide incorrect" : "Show incorrect"}
            </Button>
            <Button
              onClick={() =>
                setSettings({
                  showIncorrect: settings.showIncorrect,
                  showFirst: showKanji ? "definition" : "kanji",
                })
              }
            >
              {showKanji ? "Show kanji" : "Show explanation"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
