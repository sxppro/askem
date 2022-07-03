import { useState } from 'react';
import Router from 'next/router';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
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
    // Close modal
    handleClose();
    Router.reload();
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} id="post-form" spacing={4}>
      {/* Post title */}
      <FormControl>
        <FormLabel htmlFor="post-title">Title</FormLabel>
        <Input
          onChange={updateTitle}
          id="post-title"
          type="text"
          size="lg"
          placeholder="What do you want to ask?"
        />
      </FormControl>
      {/* Post description */}
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea onChange={updateDesc} rows={4}></Textarea>
      </FormControl>
    </VStack>
  );
};

export default PostForm;
