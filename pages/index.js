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

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        qandAS {
          _id
          content {
            title
            description
          }
        }
      }
    `,
  });
  return { props: { data } };
}

export default Home;
