// Buckit List Entry Modal for BucketList
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BUCKET_LIST } from '../../../utils/mutations';
import { GET_BUCKETLIST } from '../../../utils/queries';

import { Card, Col, Tab, Modal, Form, Button } from 'react-bootstrap';

const PostModal = (props) => {
  const [formState, setFormState] = useState({});

  // Update form state with values from user input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
      createdBy: props.userId,
    });
  };

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    props.addBucketList({
      variables: { listData: formState },
    });

    props.onHide();
  };

  return (
    <Tab.Container defaultActiveKey='Buckit List Entry'>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className='mb-0'>Buckit List Entry</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Content>
          <Tab.Pane eventKey='Buckit List Entry'>
            <Col>
              <Card className='shadow'>
                <Card.Body>
                  <Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group className='mb-3'>
                        <Form.Control type='text' name='name' placeholder='Buckit List Entry' onChange={handleChange} />
                      </Form.Group>
                      <Button variant='primary' type='submit' name='progress' value='To Do' onClick={handleChange}>
                        To Do
                      </Button>{' '}
                      <Button variant='warning' type='submit' name='progress' value='In Progress' onClick={handleChange}>
                        In Progress
                      </Button>{' '}
                      <Button variant='success' type='submit' name='progress' value='Complete' onClick={handleChange}>
                        Complete
                      </Button>{' '}
                    </Form>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </Tab.Container>
  );
};

export default PostModal;
