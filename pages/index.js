import { gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import CustomNavbar from '../components/CustomNavbar';
import CustomListView from '../components/CustomListView';
import SubmitPost from '../components/SubmitPost';
import client from '../utils/graphql';

const Home = ({ data }) => {
  return (
    <>
      <CustomNavbar></CustomNavbar>
      <Container>
        <CustomListView data={data} />
        <SubmitPost />
      </Container>
    </>
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
