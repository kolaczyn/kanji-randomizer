import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../hooks/useSettings.tsx";

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ButtonGroup>
              <Button onClick={handleReset}>Reset</Button>
              <Link to="/">
                <Button>Exit</Button>
              </Link>
              <Button
                onClick={() =>
                  setSettings({
                    showFirst: showKanji ? "definition" : "kanji",
                  })
                }
              >
                {showKanji ? "Show kanji" : "Show explanation"}
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
