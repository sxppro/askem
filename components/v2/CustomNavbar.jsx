import NextLink from 'next/link';
import { useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import SubmitPost from '../SubmitPost';
import { AuthContext } from '../../utils/contexts';

const Links = [
  { text: 'Home', link: '/' },
  { text: 'Projects', link: '/wip' },
  { text: 'Team', link: '/wip' },
];

const NavLink = ({ link, children }) => (
  <NextLink href={link} passHref>
    <Link
      px={4}
      py={2}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      fontWeight="semibold"
      fontSize={'lg'}
    >
      {children}
    </Link>
  </NextLink>
);

const CustomNavbar = ({ displayAction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const user = useContext(AuthContext);
  const isAnon = user.providerType === 'anon-user';

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow="base">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <NextLink href={'/'} passHref>
              <Link
                _hover={{ textDecoration: 'none' }}
                fontWeight="bold"
                fontSize="2xl"
                px={2}
                py={2}
                bgGradient={useColorModeValue(
                  'linear(to-r, #C471ED, #F64F59)',
                  'linear(to-r, #CF8BF3, #FDB99B)'
                )}
                bgClip="text"
              >
                Ask&apos;em
              </Link>
            </NextLink>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(({ text, link }) => (
              <NavLink key={text} link={link}>
                {text}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <IconButton
            onClick={toggleColorMode}
            icon={isDark ? <SunIcon /> : <MoonIcon />}
            mr={4}
          />
          {!isAnon ? (
            <>
              <SubmitPost />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  boxShadow="base"
                >
                  <Avatar
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile (WIP)</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign Out (WIP)</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/signup" _hover={{ textDecoration: 'none' }}>
                <Button mr={4}>Sign Up</Button>
              </Link>
              <Link href="/login" _hover={{ textDecoration: 'none' }}>
                <Button colorScheme="purple">Login</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(({ text, link }) => (
              <NavLink key={text} link={link}>
                {text}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default CustomNavbar;
