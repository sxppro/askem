import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import client from '../utils/graphql';

const Homepage = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </ApolloProvider>
  );
};

export default Homepage;
