import React, { useState } from 'react';
import { Card, Col, Tab, Modal, Form, Button, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../../utils/mutations';

const CreateModel = (props) => {
  console.log(props);
  const [formState, setFormState] = useState({});
  const [addPost, { data, loading, error }] = useMutation(ADD_POST);

  if (loading) return 'Submitting...';
  if (error) return `${error.message}`;

  // Update form state with values from user input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    addPost({
      variables: {
        postData: formState
      }
    })
  }

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
                    <Form onSubmit={handleFormSubmit}>
                      <Row>
                        <Form.Group className='mb-3'>
                          <Form.Control type='text' placeholder='Title' />
                        </Form.Group>
                      </Row>
                      <Form.Group className='mb-3'>
                        <Form.Control as='textarea' placeholder='Description' rows={3} />
                      </Form.Group>

                      {/* PROFILE PHOTO */}
                      <Form.Group className='mb-3'>
                        <Form.Label>Buckit Image</Form.Label>
                        <Form.Control type='file' name='picture' />
                      </Form.Group>
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
                      <Row>
                        <Col>
                          <Form.Select className='pe-4' >
                            {props.bucketLists.map((list, index) =>(
                            <option value={list.name} key={index}>{list.name}</option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Button variant='primary' type='submit'>Submit</Button>
                        </Col>
                      </Row>
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

export default CreateModel;
