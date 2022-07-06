import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from '@chakra-ui/react';

const AnswerForm = ({
  handleSubmit,
  updateComment,
  loading,
  disabled,
  comment,
}) => {
  return (
    <Box borderRadius="lg">
      <Box as="form" onSubmit={handleSubmit} id="answer-form">
        <FormControl>
          <FormLabel htmlFor="post-answer">Post an answer</FormLabel>
          <Textarea
            value={comment}
            onChange={updateComment}
            id="post-answer"
            rows={4}
            placeholder="Answer this question ..."
          ></Textarea>
        </FormControl>
      </Box>
      <Button
        isLoading={loading}
        isDisabled={disabled}
        loadingText="Submitting ..."
        type="submit"
        form="answer-form"
        size="sm"
        colorScheme="cyan"
        pos="right"
        mt={2}
      >
        Comment
      </Button>
    </Box>
  );
};

export default AnswerForm;
