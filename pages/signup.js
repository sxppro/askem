import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Link,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from '../components/auth/OAuthButtonGroup';
import { PasswordField } from '../components/auth/PasswordField';
import { createNewUser } from '../utils/app';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const showToast = ({ title, status, id = undefined }) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        status,
        isClosable: true,
      });
    }
  };

  const updateName = ({ target: { value } }) => {
    setName(value.trim());
  };
  const updateEmail = ({ target: { value } }) => {
    setEmail(value.trim());
  };
  const updatePassword = ({ target: { value } }) => {
    setPassword(value.trim());
  };

  const validateInputs = () => {
    if (name.length === 0) {
      showToast({
        title: 'Name is required',
        status: 'error',
        id: 'invalid-name',
      });
      return false;
    }
    if (email.length === 0 || !email.includes('@')) {
      showToast({
        title: 'Email is required',
        status: 'error',
        id: 'invalid-email',
      });
      return false;
    }
    if (password.length < 6) {
      showToast({
        title: 'Password is too short',
        status: 'error',
        id: 'invalid-password',
      });
      return false;
    }
    return true;
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    validateInputs();
    await createNewUser(email, password);
  };

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
              Sign up
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <NextLink href="/login" passHref>
                <Link
                  color={useColorModeValue('blue.500', 'blue.200')}
                  fontWeight="bold"
                  _hover={{ textDecoration: 'none' }}
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
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  onChange={updateName}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  onChange={updateEmail}
                  required
                />
              </FormControl>
              <PasswordField
                id="new-password"
                fieldName="Password"
                autoComplete="new-password"
                updateState={updatePassword}
              />
            </Stack>
            <Stack spacing="6">
              <Button colorScheme="purple">Create an account</Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupPage;
