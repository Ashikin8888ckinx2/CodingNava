import React from 'react';

import { Card, Col, Tab, Modal, Row } from 'react-bootstrap';

const FollowersModel = () => {
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
            <Col>
              <Card className='shadow mb-2'>
                <Card.Body>
                  <Row className='align-items-center'>
                    <Col>
                      <Card.Img className='rounded' variant='left' src='https://source.unsplash.com/2rIs8OH5ng0/80x80' style={{ cursor: 'pointer' }} />
                    </Col>
                    <Col>
                      <h3>Jennifer</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </Tab.Container>
  );
};

export default FollowersModel;
