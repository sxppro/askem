import NextLink from 'next/link';
import {
  VStack,
  StackDivider,
  Box,
  Link,
  Text,
  Heading,
  useColorModeValue,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

const NUMBER_OF_SKELETONS = 8;

const ListItem = ({ _id, content: { title, description } }) => {
  return (
    <Box key={_id} py={1}>
      <NextLink passHref href={`/question/${_id}`}>
        <Link
          style={{ textDecoration: 'none' }}
          _hover={{
            color: useColorModeValue('purple.600', 'purple.200'),
          }}
        >
          <Heading size="md" pb={description ? 2 : 0}>
            {title ? title : ''}
          </Heading>
        </Link>
      </NextLink>
      <Text>{description ? description : ''}</Text>
    </Box>
  );
};

const CustomListView = ({ posts, postsLoading }) => {
  return (
    <>
      {postsLoading ? (
        <VStack
          divider={<StackDivider color="gray.200" />}
          spacing={6}
          mt={6}
          mb={4}
          align="normal"
        >
          {Array.from({ length: NUMBER_OF_SKELETONS }, (_, i) => (
            <SkeletonText spacing={3}></SkeletonText>
          ))}
        </VStack>
      ) : (
        ''
      )}
      <Skeleton isLoaded={!postsLoading}>
        <VStack
          divider={<StackDivider color="gray.200" />}
          spacing={4}
          mt={4}
          mb={4}
          align="stretch"
        >
          {!postsLoading &&
            posts.map(({ _id, content }) => {
              return <ListItem key={_id} _id={_id} content={content} />;
            })}
        </VStack>
      </Skeleton>
    </>
  );
};

export default CustomListView;
