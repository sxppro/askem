import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Container,
  Stack,
  Heading,
  HStack,
  Text,
  Link,
  Box,
  Button,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { PasswordField } from '../components/auth/PasswordField';
import { resetPassword } from '../utils/app';

const PasswordResetPage = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = ({ title, status, id = undefined }) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        status,
        duration: null,
        isClosable: true,
      });
    }
  };

  const updateCurrentPassword = ({ target: { value } }) => {
    setCurrentPassword(value.trim());
  };
  const updateNewPassword = ({ target: { value } }) => {
    setNewPassword(value.trim());
  };
  const updateConfirmPassword = ({ target: { value } }) => {
    setConfirmPassword(value.trim());
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (currentPassword === newPassword) {
      showToast({
        title: 'New password cannot match your current password',
        status: 'error',
        id: 'password-match',
      });
      return;
    }
    // Validate length of new password
    if (newPassword.length < 6) {
      showToast({
        title: 'Password is too short',
        status: 'error',
        id: 'password-length',
      });
      return;
    }
    // Match new and confirm password
    if (newPassword !== confirmPassword) {
      showToast({
        title: 'Confirm password should match new password',
        status: 'error',
        id: 'password-not-match',
      });
      return;
    }

    // Send to App Services
    if (isReady) {
      try {
        const { token, tokenId } = query;
        await resetPassword(token, tokenId, newPassword);
      } catch (err) {
        console.error(err);
      } finally {
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    const { token, tokenId } = query;

    if (isReady) {
      if (!token || !tokenId) {
        router.push('/login');
      }
    }
  }, [isReady, query, router]);

  return (
    <Container
      maxW="lg"
      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                md: 'lg',
              })}
            >
              Reset password
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Want to log in?</Text>
              <NextLink href="/login" passHref>
                <Link
                  color={useColorModeValue('blue.500', 'blue.200')}
                  fontWeight="bold"
                  _hover={{ textDecoration: 'none' }}
                  _active={{ color: useColorModeValue('blue.600', 'blue.300') }}
                >
                  Log in
                </Link>
              </NextLink>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={useBreakpointValue({
            base: 'transparent',
            sm: useColorModeValue('gray.50', 'gray.700'),
          })}
          boxShadow={{
            base: 'none',
            sm: 'lg',
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack as="form" onSubmit={handleResetPassword} spacing="6">
            <Stack spacing="5">
              <PasswordField
                id="current-password"
                fieldName="Current password"
                autoComplete="current-password"
                updateState={updateCurrentPassword}
              />
              <PasswordField
                id="new-password"
                fieldName="New password"
                helperText="At least 6 characters please :)"
                autoComplete="new-password"
                updateState={updateNewPassword}
              />
              <PasswordField
                id="confirm-password"
                fieldName="Confirm password"
                autoComplete="new-password"
                updateState={updateConfirmPassword}
              />
            </Stack>
            <Stack spacing="6">
              <Button type="submit" colorScheme="purple">
                Reset password
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default PasswordResetPage;
