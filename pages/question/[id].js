import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { VStack, Container, Heading, Skeleton } from '@chakra-ui/react';
import PostCard from '../../components/PostCard';
import Answer from '../../components/Answer';
import { GET_POST, GET_ANSWERS } from '../../utils/graphql';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: questionData,
    loading: questionLoading,
    error: questionError,
  } = useQuery(GET_POST, {
    variables: {
      query: { _id: id },
    },
  });
  const {
    data: answersData,
    loading: answersLoading,
    error: answersError,
    refetch: answersRefetch,
  } = useQuery(GET_ANSWERS, {
    variables: {
      query: {
        questionId: id,
      },
    },
  });

  // Question data
  const post = questionData && questionData.qandA ? questionData.qandA : null;
  const answers = answersData && answersData.answers;

  return (
    <Container maxW="container.xl">
      <PostCard
        post={post}
        questionLoading={questionLoading}
        refetchAnswers={answersRefetch}
      />
      <Heading size="2xl" p={4}>
        Comments
      </Heading>
      <Skeleton isLoaded={!answersLoading}>
        <VStack alignItems={'flex-start'} align="stretch" spacing={4}>
          {!answersLoading &&
            answers &&
            answers.map(({ _id, content }) => {
              return <Answer key={_id} answer={content} />;
            })}
        </VStack>
      </Skeleton>
    </Container>
  );
};

export default Post;
