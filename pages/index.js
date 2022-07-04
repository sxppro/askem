import { gql } from '@apollo/client';
import { Container } from '@chakra-ui/react';
import CustomListView from '../components/v2/CustomListView';
import client from '../utils/graphql';

const Home = ({ data }) => {
  return (
    <Container
      mt={4}
      maxW="container.xl"
      borderRadius="lg"
      borderColor="gray.200"
    >
      <CustomListView data={data} />
    </Container>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query qandAS(
        $query: QandAQueryInput
        $limit: Int
        $sortBy: QandASortByInput
      ) {
        qandAS(query: $query, limit: $limit, sortBy: $sortBy) {
          _id
          content {
            description
            title
          }
          time_posted
        }
      }
    `,
  });
  return { props: { data } };
}

export default Home;
