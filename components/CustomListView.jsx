import ListGroup from 'react-bootstrap/ListGroup';

const CustomListView = ({ data }) => {
  return (
    <ListGroup className="questions-list">
      {data.qandAS.map(({ content }) => {
        console.log(content.title);
        return <ListGroup.Item>{content.title}</ListGroup.Item>;
      })}
    </ListGroup>
  );
};

export default CustomListView;
