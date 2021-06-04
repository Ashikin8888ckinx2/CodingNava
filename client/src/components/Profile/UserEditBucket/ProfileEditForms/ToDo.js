import React from 'react';

//////////////////////////////////////////////////////////
// BOOTSTRAP COMPONENTS
//////////////////////////////////////////////////////////
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const BucketFormsToDo = (props) => {
  return (
    <div>
      {props.handleBucketForm === 'To Do' && (
        <>
          <ListGroup as='ol' numbered>
            {/* LIST GROUP #1 */}
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start' style={{ cursor: 'pointer' }}>
              <div className='ms-2 me-auto'>
                <div className='fw-bold text-primary'>Go Skydiving</div>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
              </div>
              <Badge bg='success'>
                Likes: <span>14</span>
              </Badge>
            </ListGroup.Item>
            {/* LIST GROUP #2 */}
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start' style={{ cursor: 'pointer' }}>
              <div className='ms-2 me-auto'>
                <div className='fw-bold text-primary'>Go Scuba Diving</div>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
              </div>
              <Badge bg='success'>
                Likes: <span>14</span>
              </Badge>
            </ListGroup.Item>
            {/* LIST GROUP #3 */}
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start' style={{ cursor: 'pointer' }}>
              <div className='ms-2 me-auto'>
                <div className='fw-bold text-primary'>Attend the Olympic Games</div>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
              </div>
              <Badge bg='success'>
                Likes: <span>14</span>
              </Badge>
            </ListGroup.Item>
            {/* LIST GROUP #4 */}
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start' style={{ cursor: 'pointer' }}>
              <div className='ms-2 me-auto'>
                <div className='fw-bold text-primary'>Fly A Plane</div>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
              </div>
              <Badge bg='success'>
                Likes: <span>14</span>
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default BucketFormsToDo;
