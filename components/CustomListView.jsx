import { Button } from 'bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const CustomListView = ({ data }) => {
  return (
    <div style={{ display: 'block', width: 'auto', margin: 30}}>
    <ListGroup>
      {data.qandAS.map(({ content }) => {
        console.log(content.title);
        return <ListGroup.Item variant='dark' style={{height: 100}}>{content.title}</ListGroup.Item>;
        
      })}
    </ListGroup>
    </div>
  );
};

export default CustomListView;
