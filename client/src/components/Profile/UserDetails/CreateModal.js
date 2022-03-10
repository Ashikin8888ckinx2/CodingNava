import React, { useState } from 'react';
import { Card, Col, Tab, Modal, Form, Button, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../../utils/mutations';

const CreateModel = (props) => {
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
      createdBy: props.bucketLists[0].createdBy
    });

    console.log(formState);
  }

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    addPost({
      variables: {
        postData: {
          title: formState.title,
          description: formState.description,
          images: formState.images,
          tags: formState.tags,
          createdBy: formState.createdBy
        },
        listName: formState.listName
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
                          <Form.Control type='text' name='title' placeholder='Title' onChange={handleChange} />
                        </Form.Group>
                      </Row>
                      <Form.Group className='mb-3'>
                        <Form.Control as='textarea' name='description' placeholder='Description' rows={3} onChange={handleChange} />
                      </Form.Group>

                      {/* PROFILE PHOTO */}
                      <Form.Group className='mb-3'>
                        <Form.Label>Buckit Image</Form.Label>
                        <Form.Control type='file' name='images' onChange={handleChange} />
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Control type='text' name='tags' placeholder='Tags #1' onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Control type='text' name='tags' placeholder='Tags #2' onChange={handleChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Select className='pe-4' name='listName' onChange={handleChange} >
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
