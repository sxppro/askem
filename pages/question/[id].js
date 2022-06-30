import { gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import client from '../../utils/graphql';
import CustomNavbar from '../../components/CustomNavbar';
import PostCard from '../../components/PostCard';

const Post = ({ data }) => {
  const post = data && data.qandA ? data.qandA : null;

  return (
    <>
      <CustomNavbar />
      <Container>
        <PostCard post={post} />
      </Container>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await client.query({
    query: gql`
      query qandA($query: QandAQueryInput) {
        qandA(query: $query) {
          _id
          content {
            comments
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
  console.log(data);
  return { props: { data: data || null } };
}

export default Post;
