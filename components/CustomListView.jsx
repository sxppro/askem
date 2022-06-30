import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';

const CustomListView = ({ data }) => {
  return (
    <ListGroup>
      {data.qandAS.map(({ _id, content }) => {
        return (
          <ListGroup.Item
            key={_id}
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <Link href={`/question/${_id}`}>
                <a className="fw-bold">{content.title}</a>
              </Link>
              <div>{content.description}</div>
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CustomListView;
