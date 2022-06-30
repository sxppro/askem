import CustomNavbar from '../components/CustomNavbar';
import CustomListView from '../components/CustomListView';
import client from '../utils/graphql';
import { gql } from '@apollo/client';

const Home = ({ data }) => {
  return (
    <>
      <CustomNavbar />
      <CustomListView data={data} />
      {/* {data.map((question) => {
        console.log(question.content.title);
      })} */}
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
  console.log({ props: { data } });
  return { props: { data } };
}

export default Home;
