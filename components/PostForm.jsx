import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

const ADD_POST = gql`
  mutation insertOneQandA($data: QandAInsertInput!) {
    insertOneQandA(data: $data) {
      _id
      content {
        description
        title
      }
      latest_time_updated
      time_posted
    }
  }
`;

const GET_POSTS = gql`
  query qandAS(
    $query: QandAQueryInput
    $limit: Int
    $sortBy: QandASortByInput
  ) {
    qandAS(query: $query, limit: $limit, sortBy: $sortBy) {
      _id
      content {
        description
        title
      }
      time_posted
    }
  }
`;

const PostForm = ({ handleClose }) => {
  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const router = useRouter();
  const toast = useToast();

  const refreshData = () => router.replace(router.asPath);

  const showToast = ({ title, status }) =>
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
    });

  // Retrieves title
  const updateTitle = ({ target: { value } }) => {
    setTitle(value);
  };
  const updateDesc = ({ target: { value } }) => {
    setDesc(value);
  };

  // Handles post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Insert to database
    await addPost({
      variables: {
        data: {
          content: {
            title: title,
            description: desc,
          },
          latest_time_updated: new Date().toISOString(),
          time_posted: new Date().toISOString(),
        },
      },
    });
    if (error) {
      console.log(`Submission error: ${error.message}`);
      showToast({
        title: 'Unable to submit question',
        status: 'error',
      });
      return;
    }
    // Close modal
    handleClose();
    // Clear inputs
    setTitle('');
    setDesc('');
    showToast({
      title: 'Question submitted',
      status: 'success',
    });
    refreshData();
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} id="post-form" spacing={4}>
      {/* Post title */}
      <FormControl isRequired>
        <FormLabel htmlFor="post-title">Title</FormLabel>
        <Input
          value={title}
          onChange={updateTitle}
          id="post-title"
          type="text"
          size="lg"
          placeholder="What do you want to ask?"
        />
      </FormControl>
      {/* Post description */}
      <FormControl>
        <FormLabel htmlFor="post-description" optionalIndicator>
          Description
        </FormLabel>
        <Textarea
          value={desc}
          onChange={updateDesc}
          id="post-description"
          rows={4}
        ></Textarea>
      </FormControl>
    </VStack>
  );
};

export default PostForm;
