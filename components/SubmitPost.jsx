import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import PostForm from './PostForm';

const SubmitPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        size="sm"
        colorScheme="purple"
        mr={4}
      >
        Question
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a New Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Testing</ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" form="post-form">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// TODO: Add blurry background
// background-color: rgba(16, 17, 17, 0.2);
// backdrop-filter: blur(8px);

export default SubmitPost;
