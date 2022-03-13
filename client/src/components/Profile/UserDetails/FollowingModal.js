import React from 'react';

import { Card, Col, Tab, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery } from '@apollo/client';
import { GET_FOLLOWING } from '../../../utils/queries';

import '../Profile.css';

const FollowingModel = (props) => {
  const { loading, data } = useQuery(GET_FOLLOWING, {
    variables: { username: props.username },
  });

  if (loading) {
    return null;
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
              <Col key={user.username} xs={4} sm={4} md={4} lg={4}>
                <LinkContainer to={'/profile/' + user.username}>
                  <Card className='shadow m-1'>
                    <Card.Body className='d-flex flex-wrap justify-content-around p-2'>
                      <Card.Img className='UserFollowImage rounded' variant='left' src={user.picture || 'https://source.unsplash.com/2rIs8OH5ng0'} style={{ cursor: 'pointer' }} />

                      <div className='UserFollowUsername pt-1'>{user.username}</div>
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
