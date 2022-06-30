import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ADD_ANSWER = gql`
  mutation insertOneAnswer($data: AnswerInsertInput!) {
    insertOneAnswer(data: $data) {
      _id
      content
      questionId
    }
  }
`;

const UPDATE_POST = gql`
  mutation updateOneQandA($query: QandAQueryInput, $set: QandAUpdateInput!) {
    updateOneQandA(query: $query, set: $set) {
      _id
      content {
        comments {
          _id
          content
          questionId
        }
        description
        title
      }
      latest_time_updated
      time_posted
    }
  }
`;

const PostCard = ({ post }) => {
  const { _id, content, time_posted } = post;
  const [addAnswer, { error: newAnswerError }] = useMutation(ADD_ANSWER);
  const [updatePost, { data: updatedPost }] = useMutation(UPDATE_POST);
  const [comment, setComment] = useState('');

  // Sets comment
  const updateComment = ({ target: { value } }) => {
    setComment(value);
  };

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAnswer({
      variables: {
        data: {
          content: comment,
          questionId: _id,
        },
      },
    });
    if (newAnswerError) {
      console.log(`Submission error: ${newAnswerError.message}`);
      return;
    }
    Router.reload();
  };

  return (
    <>
      <Card
        className="questionPost"
        style={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px' }}
      >
        <Card.Body>
          {
            // TODO: Add users to questions/posts
            /* <Card.Text className="questionName">John Do</Card.Text> */
          }
          <Card.Text
            className="timestamp"
            style={{ fontWeight: 'bold', marginBottom: '5px' }}
          >
            {time_posted ? time_posted : ''}
          </Card.Text>
          <Card.Title className="title fs-1 mb-3" style={{ marginTop: '20px' }}>
            {content && content.title ? content.title : ''}
          </Card.Title>
          <Card.Text className="fs-5 mb-5">
            {content && content.description ? content.description : ''}
          </Card.Text>
          <Form onSubmit={handleSubmit} id="answer-form">
            <Form.Control
              onChange={updateComment}
              as="textarea"
              placeholder="Answer this question ..."
              className="postComment fs-5"
              id="text"
              style={{ height: '150px' }}
            />
          </Form>
        </Card.Body>
      </Card>
      <Button
        variant="primary"
        type="submit"
        form="answer-form"
        className="postButton mt-2"
        style={{ float: 'right', marginRight: '20px' }}
      >
        Comment
      </Button>
    </>
  );
};

export default PostCard;
