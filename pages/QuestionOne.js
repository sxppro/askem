import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";

// function newPost(){
//     // return(
//     //     var newComment = document.createElement('div')
//     //     newComment.innerHTML = document.getElementById('text')
//     //     document.body.appendChild(newComment)
//     // )
// }
// function newComment(){
//     var comment = document.getElementById('text')
//     document.getElementById('comment').innerHTML = comment
// }

const QuestionOne = () => {
  return (
    <>
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
            .questionName{
                font-weight: bold;
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
      <Card className="questionPost">
        <Card.Body>
          <Card.Text className="questionName">
            Joe Doe <br></br>?
          </Card.Text>
          <Card.Text className="timestamp"></Card.Text>
          <Card.Title className="title">Title</Card.Title>
          <Card.Text>Description</Card.Text>
            <Form.Control as="textarea" placeholder="Leave a comment here" className="postComment" id="text"/>
        </Card.Body>
      </Card>
      <Button variant="primary" className="postButton">
        Comment
      </Button>
      <p id="comment"></p>
    </>
  );
};

export default QuestionOne;
