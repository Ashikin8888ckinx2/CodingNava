import React from 'react';
import { Card, Col, Stack, Row, Image } from 'react-bootstrap';

const BuckitCards = (props) => {
  return (
    <>
      <Col className='pb-2' sm={4} md={4} lg={4}>
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
              <Card.Text className='fs-5'>Visit 7 wonders of the world</Card.Text>
            </div>
            <div className='pb-3'>
              <Card.Img className='BuckitCardImage' src='https://source.unsplash.com/jj4iWf9L23w' />
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
              <div>#Egypt</div>
              <div>#Pyramids</div>
            </Stack>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};
export default BuckitCards;
