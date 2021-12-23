import React from 'react';

import { Card, Col, Tab, Modal, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS } from '../../../utils/queries';

const FollowersModel = (props) => {
  const { loading, data } = useQuery(GET_FOLLOWERS, {
    variables: { username: props.username },
  });

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Tab.Container defaultActiveKey='Create'>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className='mb-0'>Followers</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Content>
          <Tab.Pane eventKey='Create'>
            {data.followersList.followers.map((user) => (
              <Col key={user.username}>
                <LinkContainer to={'/profile/' + user.username}>
                  <Card className='shadow mb-2'>
                    <Card.Body>
                      <Row className='align-items-center'>
                        <Col>
                          <Card.Img className='rounded' variant='left' src={user.picture || 'https://source.unsplash.com/2rIs8OH5ng0/80x80'} style={{ cursor: 'pointer' }} />
                        </Col>
                        <Col>
                          <h3>{user.username}</h3>
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

export default FollowersModel;
