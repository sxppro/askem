import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Box,
  Text,
  Heading,
  Divider,
  Skeleton,
  SkeletonText,
  useToast,
} from '@chakra-ui/react';
import AnswerForm from './AnswerForm';
import { ADD_ANSWER } from '../utils/graphql';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const PostCard = ({ post, questionLoading, refetchAnswers }) => {
  const { _id, content, time_posted } = !questionLoading ? post : {};
  const [addAnswer, { loading: answerLoading, error: answerError }] =
    useMutation(ADD_ANSWER);
  const [comment, setComment] = useState('');
  const date = new Date(time_posted);
  const toast = useToast();
  const invalidToast = 'invalid-comment-toast';

  // Show toast
  const showToast = ({ title, status, id = undefined }) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        status,
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Sets comment
  const updateComment = ({ target: { value } }) => {
    setComment(value);
  };

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      setComment('');
      showToast({
        title: 'Invalid comment',
        status: 'error',
        id: invalidToast,
      });
      return;
    }
    await addAnswer({
      variables: {
        data: {
          content: comment,
          questionId: _id,
        },
      },
    });
    if (answerError) {
      console.log(`Submission error: ${answerError.message}`);
      showToast({
        title: 'Unable to submit comment',
        status: 'error',
      });
      return;
    }
    // Clear input
    setComment('');
    showToast({
      title: 'Comment submitted',
      status: 'success',
    });
    refetchAnswers();
  };

  return (
    <Box
      className="post-container"
      borderWidth="1px"
      borderRadius="lg"
      p={8}
      my={4}
    >
      {
        // TODO: Add users to questions/posts
        /* <Card.Text className="questionName">John Do</Card.Text> */
      }
      <Skeleton isLoaded={!questionLoading} h="0.875rem">
        <Text className="post-timestamp" fontWeight="bold" fontSize="sm">
          {time_posted && date
            ? `${
                MONTH_NAMES[date.getMonth()]
              } ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`
            : ''}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!questionLoading} mt={6} h="2.25rem">
        <Heading className="post-title" mt={2}>
          {content && content.title ? content.title : ''}
        </Heading>
      </Skeleton>
      <SkeletonText
        isLoaded={!questionLoading}
        noOfLines={2}
        mt={8}
        spacing={4}
      >
        <Text className="post-description" mt={4}>
          {content && content.description ? content.description : ''}
        </Text>
      </SkeletonText>
      <Divider alignItems="center" my={6} />
      <AnswerForm
        handleSubmit={handleSubmit}
        updateComment={updateComment}
        loading={answerLoading}
        comment={comment}
        disabled={questionLoading}
      />
    </Box>
  );
};

export default PostCard;
