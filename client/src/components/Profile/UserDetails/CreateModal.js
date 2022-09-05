import React, { useState } from 'react';
import { Card, Col, Tab, Modal, Form, Button, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../../utils/mutations';
import { GET_POSTS } from '../../../utils/queries';

const CreateModel = (props) => {

  const [formState, setFormState] = useState({ bucketListId: props.bucketLists[0] ? props.bucketLists[0]._id : null });
  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS],
  });

  if (props.bucketLists.length == 0) {
    return (<Modal.Header closeButton>
              <h1>Must create bucket first</h1>
            </Modal.Header>);
  }

  if (loading) return 'Submitting...';
  if (error) return `${error.message}`;

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

    addPost({
      variables: {
        postData: {
          title: formState.title,
          description: formState.description,
          images: formState.images,
          tags: [formState.tag1, formState.tag2].filter((tag) => {
            return tag != null;
          }),
          createdBy: formState.createdBy,
        },
        bucketListId: formState.bucketListId
      }
    })

    props.onHide();
  }

  // UPDATING "formState" BASED ON INPUT CHANGES
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    // 1,048,576 bytes is 1 mb, so multiplied by 10 is a limit of 10mb
    const maxSize = 10 * 1048576;

    if (event.target.files[0] && event.target.files[0].size > maxSize) {
      event.target.value = "";
      return alert("File is too big. Needs to be 10MB or smaller");
    };

    setFormState({
      ...formState,
      [name]: files,
    });
  };

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
                        <Form.Control type='file' name='images' onChange={handleFileChange} />
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Control type='text' name='tag1' placeholder='Tags #1' onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Control type='text' name='tag2' placeholder='Tags #2' onChange={handleChange} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Select className='pe-4' name='bucketListId' onChange={handleChange}>
                            {props.bucketLists.map((list, index) => (
                              <option value={list._id} key={index}>
                                {list.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Button variant='primary' type='submit'>
                            Submit
                          </Button>
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
