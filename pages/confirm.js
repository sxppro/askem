import { Center, VStack, Heading, Spinner } from '@chakra-ui/react';
import { confirmUser } from '../utils/app';

const ConfirmationPage = () => {
  return (
    <Center h={'calc(100vh - 64px)'} onLoad>
      <VStack spacing={8}>
        <Heading size="lg">Confirming ...</Heading>
        <Spinner size="xl" />
      </VStack>
    </Center>
  );
};

export async function getServerSideProps(context) {
  const confirmEmail = async () => {
    const { query } = context;
    const { token, tokenId } = query;
    await confirmUser(token, tokenId);
  };

  try {
    await confirmEmail();
  } catch (err) {
    console.error(err);
  }

  return {
    redirect: {
      destination: '/login',
      permanent: true,
    },
  };
}

export default ConfirmationPage;
