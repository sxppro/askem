import Card from 'react-bootstrap/Card';

const Answer = ({ answer }) => {
  return (
    <>
      <Card
        className="answer"
        style={{ maxWidth: '1280px', minWidth: '50%', margin: 'auto' }}
      >
        <Card.Body>
          {/* 
          // TODO: Add timestamps to answers
           */}
          {/* <Card.Text className="answer-timestamp"></Card.Text> */}
          <Card.Text className="answer-content fs-5 mb-5">{answer}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Answer;
