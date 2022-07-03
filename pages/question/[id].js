import { gql } from '@apollo/client';
import { VStack, Container, Heading } from '@chakra-ui/react';
import client from '../../utils/graphql';
import PostCard from '../../components/PostCard';
import Answer from '../../components/Answer';

const Post = ({ data, answers }) => {
  const post = data && data.qandA ? data.qandA : null;

  return (
    <VStack>
      <Container maxW="container.xl">
        <PostCard post={post} />
        <Heading size="2xl" p={4}>
          Comments
        </Heading>
        <VStack spacing={4}>
          {answers &&
            answers.map(({ _id, content }) => {
              return <Answer key={_id} answer={content} />;
            })}
        </VStack>
      </Container>
    </VStack>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data: questions } = await client.query({
    query: gql`
      query qandA($query: QandAQueryInput) {
        qandA(query: $query) {
          _id
          content {
            comments {
              _id
              content
            }
            description
            title
          }
          latest_time_updated
          time_posted
        }
      }
    `,
    variables: { query: { _id: id } },
  });
  const { data: answers } = await client.query({
    query: gql`
      query answers(
        $query: AnswerQueryInput
        $limit: Int
        $sortBy: AnswerSortByInput
      ) {
        answers(query: $query, limit: $limit, sortBy: $sortBy) {
          _id
          content
          questionId
        }
      }
    `,
    variables: {
      query: {
        questionId: id,
      },
    },
  });
  return {
    props: {
      data: questions || null,
      answers: answers.answers ? answers.answers : null,
    },
  };
}

export default Post;
