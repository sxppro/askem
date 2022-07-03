import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../utils/graphql';

const Homepage = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Head>
          <title>Ask&apos;em</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default Homepage;
