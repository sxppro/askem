import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { getAccessToken } from './app';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    fetch: async (uri, options) => {
      const accessToken = await getAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const ADD_POST = gql`
  mutation insertOneQandA($data: QandAInsertInput!) {
    insertOneQandA(data: $data) {
      _id
      content {
        description
        title
      }
      latest_time_updated
      time_posted
    }
  }
`;

const GET_POST = gql`
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
`;

const GET_POSTS = gql`
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

const ADD_ANSWER = gql`
  mutation insertOneAnswer($data: AnswerInsertInput!) {
    insertOneAnswer(data: $data) {
      _id
      content
      questionId
    }
  }
`;

const GET_ANSWERS = gql`
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
`;

export { GET_POSTS, GET_POST, GET_ANSWERS, ADD_ANSWER, ADD_POST, UPDATE_POST };
export default client;
