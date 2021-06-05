import React from 'react';

//////////////////////////////////////////////////////////
// BOOTSTRAP COMPONENTS
//////////////////////////////////////////////////////////
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const BucketFormsInProgress = (props) => {
  return (
    <div>
      {props.handleBucketForm === 'In Progress' && (
        <>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='In Progress' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control as='textarea' placeholder='Description' rows={3} />
            </Form.Group>
          </Form>
          <Button variant='primary'>To Do</Button> <Button variant='success'>Complete</Button> <Button variant='danger'>Delete</Button>{' '}
        </>
      )}
    </div>
  );
};

export default BucketFormsInProgress;
