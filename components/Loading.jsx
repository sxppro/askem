import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Spinner
      animation="grow"
      as="span"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );
};

export default Loading;
