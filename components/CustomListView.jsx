import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';

const CustomListView = ({ data }) => {
  return (
    <div style={{ display: 'block', width: 'auto', margin: 30 }}>
      <ListGroup>
        {data.qandAS.map(({ _id, content }) => {
          return (
            <ListGroup.Item
              key={_id}
              className="d-flex justify-content-between align-items-start"
              variant="dark"
              style={{ height: 100 }}
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
    </div>
  );
};

export default CustomListView;
