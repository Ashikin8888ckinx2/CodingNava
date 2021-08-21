import React from 'react';

import { Card, Col, Tab, Modal, Row } from 'react-bootstrap';
import { DashSquare } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery } from '@apollo/client';
import { GET_FOLLOWING } from '../../../utils/queries';


const FollowingModel = (props) => {

  const { loading, data } = useQuery(GET_FOLLOWING, {
    variables: { username: props.username },
  });

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <Tab.Container defaultActiveKey='Create'>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className='mb-0'>Following</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Content>
          <Tab.Pane eventKey='Create'>
            {data.followingList.following.map(user => (
              <Col key={ user.username }>
              <LinkContainer to={'/profile/' + user.username}>
              <Card className='shadow mb-2'>
                <Card.Body>
                  <Row className='align-items-center'>
                    <Col>
                      <Card.Img className='rounded' variant='left' src={ user.picture || 'https://source.unsplash.com/2rIs8OH5ng0/80x80' } style={{ cursor: 'pointer' }} />
                    </Col>
                    <Col>
                      <h3>{ user.username }</h3>
                    </Col>
                    <Col>
                      <div className='d-flex justify-content-end'>
                        <DashSquare size={36} style={{ cursor: 'pointer' }} />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              </LinkContainer>
            </Col>
            ))}
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </Tab.Container>
  );
};

export default FollowingModel;
