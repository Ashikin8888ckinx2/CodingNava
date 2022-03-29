import React from 'react';

import { Col, Card, Image } from 'react-bootstrap';

const HomeCards = () => {
  return (
    <>
      <Col className='pb-2' sm={4} md={4} lg={4}>
        <Card className='shadow h-100'>
          {/* CARD HEADER */}
          <Card.Title>
            <div className='BuckitCardTitleContainer'>
              <div className='BuckitCardImageUsername'>
                <Image className='BuckitCardProfileImage' src='https://source.unsplash.com/XHVpWcr5grQ/60x60' roundedCircle />
                <p className='BuckitCardUsername '>mmehr1988</p>
              </div>
              <div className='BuckitCardDate'>Nov 14,2021</div>
            </div>
          </Card.Title>
          {/* CARD BODY */}
          <Card.Body className='BuckitCardBodyContainer'>
            <div className='BuckitCardBodyTitle'>I visited the pyramids of Giza!</div>
            <Card.Img className='BuckitCardImage rounded' src='https://source.unsplash.com/CJ4mbwSK3EY' />
            <div className='BuckitCardBodyDescription'>This summer, I visited the pyramids of Giza! They were incredible!</div>
          </Card.Body>

          <div className='BuckitCardBodyStatus'>
            Status: <span>In Progress</span>
          </div>

          {/* HEADER /////////////// ROW #6 */}
          <Card.Footer className='bg-transparent'>
            <div className='BuckitCardFooter'>
              <div>#Travel</div>
              <div>#World</div>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default HomeCards;
