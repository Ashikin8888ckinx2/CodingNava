import React from 'react';

//////////////////////////////////////////////////////////
// BOOTSTRAP COMPONENTS
//////////////////////////////////////////////////////////
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const BucketFormsComplete = (props) => {
  return (
    <div>
      {props.handleBucketForm === 'Complete' && (
        <>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='Complete' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control as='textarea' placeholder='Description' rows={3} />
            </Form.Group>
          </Form>
          <Button variant='primary'>To Do</Button> <Button variant='warning'>In Progress</Button> <Button variant='danger'>Delete</Button>{' '}
        </>
      )}
    </div>
  );
};

export default BucketFormsComplete;
