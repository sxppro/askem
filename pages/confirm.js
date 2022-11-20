import { useState, useEffect } from 'react';
import { Center, VStack, Heading, Spinner } from '@chakra-ui/react';
import { confirmUser } from '../utils/app';

const ConfirmationPage = () => {
  const [fade, setFade] = useState({ fade: 'fade-in' });

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fade.fade === 'fade-in'
        ? setFade({ fade: 'fade-out' })
        : setFade({ fade: 'fade-in' });
    }, 750);

    return () => clearInterval(fadeTimeout);
  }, [fade]);

  return (
    <Center h={'calc(100vh - 64px)'} onLoad>
      <VStack spacing={8}>
        <Heading
          size="lg"
          transition={'opacity 1.5s ease'}
          opacity={fade.fade === 'fade-out' ? 0.3 : 1}
        >
          Confirming
        </Heading>
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
  let isValidated = false;

  try {
    await confirmEmail();
    isValidated = true;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      isValidated,
    },
  };
}

export default ConfirmationPage;
