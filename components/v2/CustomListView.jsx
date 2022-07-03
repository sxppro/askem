import NextLink from 'next/link';
import {
  VStack,
  StackDivider,
  Box,
  Link,
  Text,
  Heading,
} from '@chakra-ui/react';

const ListItem = ({ _id, content: { title, description } }) => {
  return (
    <Box key={_id}>
      <NextLink passHref href={`/question/${_id}`}>
        <Link
          style={{ textDecoration: 'none' }}
          _hover={{
            color: 'purple.200',
          }}
        >
          <Heading size="md" py={2}>
            {title ? title : ''}
          </Heading>
        </Link>
      </NextLink>
      <Text>{description ? description : ''}</Text>
    </Box>
  );
};

const CustomListView = ({ data }) => {
  return (
    <VStack
      divider={<StackDivider color="gray.200" />}
      spacing={4}
      mt={4}
      mb={4}
      align="stretch"
    >
      {data.qandAS.map(({ _id, content }) => {
        return <ListItem key={_id} _id={_id} content={content} />;
      })}
    </VStack>
  );
};

export default CustomListView;
