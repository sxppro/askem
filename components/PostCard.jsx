import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { Card, Form, Button } from 'react-bootstrap';
import Loading from './Loading';

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

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const PostCard = ({ post }) => {
  const { _id, content, time_posted } = post;
  const [addAnswer, { loading, error: newAnswerError }] =
    useMutation(ADD_ANSWER);
  const [comment, setComment] = useState('');
  const date = new Date(time_posted);

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
            {time_posted && date
              ? `${
                  MONTH_NAMES[date.getMonth()]
                } ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`
              : ''}
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
        disabled={loading}
        variant="primary"
        type="submit"
        form="answer-form"
        className="postButton mt-2"
        style={{ float: 'right', marginRight: '20px' }}
      >
        {loading ? <Loading /> : ''}
        {loading ? ' Submitting ...' : 'Comment'}
      </Button>
    </>
  );
};

export default PostCard;
