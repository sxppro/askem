import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Center, VStack, Heading, Spinner, useToast } from '@chakra-ui/react';
import { confirmUser } from '../utils/app';

const ConfirmationPage = ({ isValidated }) => {
  const [fade, setFade] = useState({ fade: 'fade-in' });
  const router = useRouter();
  const toast = useToast();

  isValidated
    ? !toast.isActive('confirm')
      ? toast({
          title: 'Account confirmed',
          description: 'Redirecting to login in 5 seconds',
          duration: 9000,
          status: 'success',
          id: 'confirm',
        })
      : ''
    : !toast.isActive('unconfirm')
    ? toast({
        title: 'Error',
        description: 'Confirmation unsuccessful',
        duration: null,
        status: 'error',
        id: 'unconfirm',
      })
    : '';

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fade.fade === 'fade-in'
        ? setFade({ fade: 'fade-out' })
        : setFade({ fade: 'fade-in' });
    }, 750);

    return () => clearInterval(fadeTimeout);
  }, [fade]);

  useEffect(() => {
    if (isValidated) {
      setTimeout(() => {
        router.push('/login');
      }, 5000);
    }
  });

  return (
    <Center h={'calc(100vh - 64px)'} onLoad>
      <VStack spacing={8}>
        <Heading
          size="lg"
          transition={'opacity 1.5s ease'}
          opacity={fade.fade === 'fade-out' ? 0.3 : 1}
        >
          {isValidated ? 'Redirecting' : 'Confirming'}
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
