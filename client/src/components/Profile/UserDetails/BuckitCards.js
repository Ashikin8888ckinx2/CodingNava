import React from 'react';
import { Card, Col, Stack, Row, Image } from 'react-bootstrap';

import { GET_POSTS } from '../../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';

const BuckitCards = (props) => {

  const userId = Auth.getProfile().data._id;
  console.log(userId);
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId },
  });

  console.log('BuckitCards data: ', data);

  if (loading) return null;
  if (error) return 'error';

  // TODO: create more fields in the post data

  return (
    <>
      {data.getPosts.map((post, index) => (
        <Col className='pb-2' sm={4} md={4} lg={4} key={index}>
          <Card className='shadow'>
            {/* CARD HEADER */}
            <Card.Title>
              <Row className='p-2'>
                <div className='d-flex align-items-center' gap={2}>
                  <Image src='https://source.unsplash.com/XHVpWcr5grQ/60x60' roundedCircle />
                  <h5 className='mb-0'>mmehr1988</h5>
                </div>
              </Row>
            </Card.Title>

            {/* CARD BODY */}
            <Card.Body className='py-0'>
              <div className='fs-4 pb-3'>
                <Card.Text className='fs-5'>{post.description}</Card.Text>
              </div>
              <div className='pb-3'>
                <Card.Img className='' src='https://source.unsplash.com/RktLzQoDe9Y/200x100' />
              </div>
              <div className='fs-6 pb-3'>
                <Card.Text>This summer I took a trip to Egypt to cross off one of my bucket list items</Card.Text>
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
                <div>#{post.tags[0]}</div>
                <div>#{post.tags[1]}</div>
              </Stack>
            </Card.Footer>
          </Card>
        </Col>

      ))}
    </>
  );
};
export default BuckitCards;
