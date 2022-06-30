import { useState } from 'react';
import Router from 'next/router';
import Form from 'react-bootstrap/Form';
import { gql, useMutation } from '@apollo/client';

const ADD_POST = gql`
  mutation insertOneQandA($data: QandAInsertInput!) {
    insertOneQandA(data: $data) {
      _id
      content {
        comments
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
            comments: [],
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
    <Form onSubmit={handleSubmit} id="post-form">
      {/* Post title */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={updateTitle}
          size="lg"
          type="text"
          placeholder="What do you want to ask?"
        ></Form.Control>
      </Form.Group>
      {/* Post description */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={updateDesc}
          as="textarea"
          rows={3}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
};

export default PostForm;
