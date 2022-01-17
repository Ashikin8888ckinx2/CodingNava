import React from 'react';

import { Card, Col, Tab, Modal, Row } from 'react-bootstrap';
// import { DashSquare } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery } from '@apollo/client';
import { GET_FOLLOWING } from '../../../utils/queries';

const FollowingModel = (props) => {
  const { loading, data } = useQuery(GET_FOLLOWING, {
    variables: { username: props.username },
  });

  if (loading) {
    return <h1>Loading</h1>;
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
          <Tab.Pane eventKey='Create' className='d-flex flex-wrap'>
            {data.followingList.following.map((user) => (
              <Col key={user.username} xs={6} sm={6} md={6} lg={6}>
                <LinkContainer to={'/profile/' + user.username}>
                  <Card className='shadow mb-2'>
                    <Card.Body className='d-flex flex-wrap justify-content-around'>
                      <Card.Img className='UserFollowImage rounded' variant='left' src={user.picture || 'https://source.unsplash.com/2rIs8OH5ng0'} style={{ cursor: 'pointer' }} />

                      <div class='fs-3'>{user.username}</div>
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
