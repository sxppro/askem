import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
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

const ADD_ANSWER = gql`
  mutation insertOneAnswer($data: AnswerInsertInput!) {
    insertOneAnswer(data: $data) {
      _id
      content
      questionId
    }
  }
`;

const UPDATE_POST = gql`
  mutation updateOneQandA($query: QandAQueryInput, $set: QandAUpdateInput!) {
    updateOneQandA(query: $query, set: $set) {
      _id
      content {
        comments {
          _id
          content
          questionId
        }
        description
        title
      }
      latest_time_updated
      time_posted
    }
  }
`;

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

const PostCard = ({ post, questionLoading }) => {
  const { _id, content, time_posted } = !questionLoading ? post : {};
  const [addAnswer, { loading: answerLoading, error: answerError }] =
    useMutation(ADD_ANSWER);
  const [comment, setComment] = useState('');
  const date = new Date(time_posted);
  const router = useRouter();
  const toast = useToast();

  const refreshData = () => router.replace(router.asPath);

  // Show toast
  const showToast = ({ title, status }) =>
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    });

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
    refreshData();
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
