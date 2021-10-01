// Create Modal for BucketList
import React from 'react';

import { Card, Col, Tab, Modal, Form, Button, Row } from 'react-bootstrap';

const PostModal = () => {
  return (
    <Tab.Container defaultActiveKey='Create'>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className='mb-0'>Create</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Content>
          <Tab.Pane eventKey='Create'>
            <Col>
              <Card className='shadow'>
                <Card.Body>
                  <Card.Title>
                    <Form>
                      <Form.Group className='mb-3'>
                      <Form.Control type="text" placeholder="Buckit List Entry" />
                      </Form.Group>
                    </Form>
                    <Button variant='primary'>To Do</Button> <Button variant='warning'>In Progress</Button> <Button variant='success'>Complete</Button>{' '}
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
