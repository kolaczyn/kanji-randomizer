import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/react";
import { deckAtom } from "../state/deckAtom.ts";

export const AbandonProgress = () => {
  const [{ idx }] = useAtom(deckAtom);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleOpenModal = () => {
    const shouldConfirm = idx > 0;
    if (shouldConfirm) {
      onOpen();
    } else {
      navigate("/");
    }
  };

  const handleNavigateAndClose = () => {
    navigate("/");
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={handleOpenModal}>
        Exit (abandon progress)
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Abandon Progress
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleNavigateAndClose} ml={3}>
                Abandon Progress
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
