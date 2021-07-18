import React from 'react';

import { Card, Col, Tab, Modal, Form, Button, Row } from 'react-bootstrap';

const CreateModel = () => {
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
                      <Row>
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Control type='text' placeholder='Tags #1' />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Control type='text' placeholder='Tags #2' />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className='mb-3'>
                        <Form.Control as='textarea' placeholder='Description' rows={3} />
                      </Form.Group>

                      {/* PROFILE PHOTO */}
                      <Form.Group className='mb-3'>
                        <Form.Label>Buckit Image</Form.Label>
                        <Form.Control type='file' name='picture' />
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

export default CreateModel;
