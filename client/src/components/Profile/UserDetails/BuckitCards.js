import React from 'react';
import { Card, Col, Stack, Row, Image } from 'react-bootstrap';
import moment from 'moment';
import '../Profile.css';

import { GET_POSTS } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../../utils/auth';

const BuckitCards = (props) => {
  const userId = Auth.getProfile().data._id;
  const userData = props.userData.userData;
  
  // Load in post data
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId },
  });
  // Handle errors for post data
  if (loading) return null;
  if (error) return 'error';

  return (
    <>
      {data.getPosts.map((post, index) => (
        <Col className='pb-2' sm={4} md={4} lg={4} key={index}>
          <Card className='shadow h-100'>
            {/* CARD HEADER */}
            <Card.Title>
              <Row className='p-2'>
                <div className='d-flex align-items-center' gap={2}>
                  <Image src={userData.picture + '/60x60'} roundedCircle />
                  <h5 className='mb-0'>{userData.username}</h5>
                </div>
                <p>Created {
                  moment(Date(data.getPosts.description))
                    .format('ll')
                }</p>
              </Row>
            </Card.Title>

            {/* CARD BODY */}
            <Card.Body className='py-0'>
              <div className='fs-4 pb-3'>
                <Card.Text className='fs-5'>{post.title}</Card.Text>
              </div>
              <div className='pb-3'>
                <Card.Img className='BuckitCardImage rounded' src={post.images} />
              </div>
              <div className='fs-6 pb-3'>
                <Card.Text>{post.description}</Card.Text>
              </div>
              <div>
                <Card.Text>
                  Status: <span className='text-primary'>In Progress</span>
                </Card.Text>
              </div>
            </Card.Body>
            {/* HEADER /////////////// ROW #6 */}
            <Card.Footer className='bg-transparent m-2 p-2'>
              <Stack direction='horizontal' gap={3} className='align-items-center justify-content-start'>
                {post.tags.map((tag, i) => (
                  <div key={i}>#{tag}</div>
                ))}
              </Stack>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
};
export default BuckitCards;
