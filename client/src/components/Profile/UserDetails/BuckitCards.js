import React from 'react';
import { Card, Col, Stack, Row, Image } from 'react-bootstrap';

const BuckitCards = (props) => {
  return (
    <Col className='pb-2' sm={4} md={4} lg={4}>
      <Card>
        {/* HEADER /////////////// ROW #1 */}
        <Card.Header>
          <Row>
            <div className='d-flex align-items-center'>
              <Col sm={3} md={3} lg={3} className='pe-2'>
                <Image src='https://source.unsplash.com/XHVpWcr5grQ/50x50' roundedCircle />
              </Col>
              <Col sm={9} md={9} lg={9}>
                <h4 className='mb-0'>mmehr1988</h4>
              </Col>
            </div>
          </Row>
        </Card.Header>
        {/* HEADER /////////////// ROW #1 */}
        <Card.Body>
          <div className='fs-4 pb-3'>
            <Card.Text className='fs-5'>Visit 7 wonders of the world</Card.Text>
          </div>
          <div className='pb-3'>
            <Card.Img className='' src='https://source.unsplash.com/RktLzQoDe9Y' />
          </div>
          <div className='fs-6 pb-3'>
            <Card.Text>This summer I took a trip to Egypt to cross off one of my bucket list items</Card.Text>
          </div>
          <div>
            <Card.Text className='text-primary'>In Progress</Card.Text>
          </div>
        </Card.Body>
        {/* HEADER /////////////// ROW #6 */}
        <Card.Footer>
          <Stack direction='horizontal' gap={3} className='align-items-center justify-content-start'>
            <div>#Egypt</div>
            <div>#Pyramids</div>
          </Stack>
        </Card.Footer>
      </Card>
    </Col>
  );
};
export default BuckitCards;
