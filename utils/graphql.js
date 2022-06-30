import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
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
    uri: 'https://ap-southeast-2.aws.realm.mongodb.com/api/client/v2.0/app/qa-mwchg/graphql',
    fetch: async (uri, options) => {
      const accessToken = await getAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
