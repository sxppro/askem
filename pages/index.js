import { gql } from '@apollo/client';
import CustomNavbar from '../components/CustomNavbar';
import CustomListView from '../components/CustomListView';
import SubmitPost from '../components/SubmitPost';
import client from '../utils/graphql';

const Home = ({ data }) => {
  return (
    <>
      <CustomNavbar></CustomNavbar>
      <CustomListView data={data} />
      <SubmitPost />
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
