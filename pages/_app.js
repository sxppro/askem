import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';
import client from '../utils/graphql';

const Homepage = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <SSRProvider>
        <Head>
          <title>Ask&apos;em</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SSRProvider>
    </ApolloProvider>
  );
};

export default Homepage;
