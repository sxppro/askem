import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import client from '../utils/graphql';
import theme from '../utils/theme';
import { getUser } from '../utils/app';
import { AuthContext } from '../utils/contexts';
import dynamic from 'next/dynamic';

const CustomNavbar = dynamic(() => import('../components/v2/CustomNavbar'), {
  ssr: false,
});

const Homepage = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Ask&apos;em</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AuthContext.Provider value={getUser()}>
          <CustomNavbar />
          <Component {...pageProps} />
        </AuthContext.Provider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default Homepage;
