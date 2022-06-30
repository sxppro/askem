import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PostCard = ({ post }) => {
  return (
    <>
      <Card className="questionPost">
        <Card.Body>
          {
            // TODO: Add users to questions/posts
            /* <Card.Text className="questionName">John Do</Card.Text> */
          }
          <Card.Text className="timestamp">
            {post && post.time_posted ? post.time_posted : ''}
          </Card.Text>
          <Card.Title className="title fs-1 mb-3">
            {post && post.content && post.content.title
              ? post.content.title
              : ''}
          </Card.Title>
          <Card.Text className="fs-5 mb-5">
            {post && post.content && post.content.description
              ? post.content.description
              : ''}
          </Card.Text>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            className="postComment fs-5"
            id="text"
          />
        </Card.Body>
      </Card>
      <Button variant="primary" className="postButton">
        Comment
      </Button>
      <style type="text/css">
        {`
            .head{
                border: 2px;
                border-style: solid;
                text-align: center;
                margin: 10px 10px 10px 10px;
            }
            .postButton{
                float: right;
                margin-right: 20px;
                margin-top: 5px;
                
            }
            .questionPost{
                margin-top: 40px;
                margin-left: 20px;
                margin-right: 20px;
            }
            .title{
                margin-top: 20px;
            }
            .timestamp{
              font-weight: bold;
                margin-bottom: 5px;
            }
            .label{
                height: 100px;
            }
            .postComment{
                height: 150px;
            }
            
        `}
      </style>
    </>
  );
};

export default PostCard;
