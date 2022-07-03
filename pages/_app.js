import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import CustomNavbar from '../components/v2/CustomNavbar';
import client from '../utils/graphql';

const Homepage = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Head>
          <title>Ask&apos;em</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CustomNavbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default Homepage;
