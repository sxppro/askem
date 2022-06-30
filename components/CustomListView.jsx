import ListGroup from 'react-bootstrap/ListGroup';

const CustomListView = ({ data }) => {
  return (
    <div style={{ display: 'block', width: 'auto', margin: 30 }}>
      <ListGroup>
        {data.qandAS.map(({ _id, content }) => {
          return (
            <ListGroup.Item key={_id} variant="dark" style={{ height: 100 }}>
              {content.title}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default CustomListView;
