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
        boxShadow="base"
        mr={4}
      >
        Question
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a New Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PostForm handleClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={4}>
              Close
            </Button>
            <Button type="submit" form="post-form" colorScheme="purple">
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
