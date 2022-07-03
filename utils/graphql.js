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

export default client;
