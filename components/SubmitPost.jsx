import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PostForm from './PostForm';

const SubmitPost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ float: 'right', margin: 'auto' }}
        className="mt-3"
      >
        New Question
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="post-form">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubmitPost;
