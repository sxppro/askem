import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@chakra-ui/react';
import CustomListView from '../components/v2/CustomListView';
import { GET_POSTS } from '../utils/graphql';
import { AuthContext } from '../utils/contexts';

const Home = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  const auth = useContext(AuthContext);
  const posts = data?.qandAS;

  return (
    <Container
      mt={4}
      maxW="container.xl"
      borderRadius="lg"
      borderColor="gray.200"
    >
      <CustomListView posts={posts} postsLoading={loading} />
    </Container>
  );
};

export default Home;
