import React from 'react';

import { Card, Col, Tab, Modal, Row } from 'react-bootstrap';
import { DashSquare } from 'react-bootstrap-icons';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWING } from '../../../utils/queries';


const FollowingModel = () => {
  
  let { username } = useParams();

  const { loading, data } = useQuery(GET_FOLLOWING, {
    variables: { username },
  });
  console.log(data);
  
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
                    <Col>
                      <div className='d-flex justify-content-end'>
                        <DashSquare size={36} style={{ cursor: 'pointer' }} />
                      </div>
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

export default FollowingModel;
