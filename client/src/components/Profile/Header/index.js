import React from 'react';

import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useViewport } from '../../../utils/hooks';

const ProfileHeader = (props) => {
  const { width } = useViewport();

  ////////////////////////////////////////////////
  //   CSS STYLING
  ////////////////////////////////////////////////

  const handleMouseIn = (e) => {
    e.target.style.background = '#F0E9D2';
    e.target.style.borderColor = '#F0E9D2';
    e.target.style.color = '#181D31';
  };

  const handleMouseOut = (e) => {
    e.target.style.background = '#E6DDC4';
    e.target.style.borderColor = '#E6DDC4';
    e.target.style.color = '#181D31';
  };

  let editProfileBtnStyle = {
    backgroundColor: '#E6DDC4',
    borderColor: '#E6DDC4',
    color: '#181D31',
    fontFamily: 'Bebas Neue',
    letterSpacing: 1.3,
  };

  ////////////////////////////////////////////////

  return (
    <Container className='pb-2' fluid>
      <Row>
        <Col>
          <Card className='bg-dark text-white rounded'>
            <Card.Img src={ props.userData.banner_picture || 'https://source.unsplash.com/I0fDR8xtApA/970x250' } alt='Image of Astronaut ' />
            <Card.ImgOverlay>
              <Container className='p-0' fluid>
                <Row className='justify-content-between'>
                  <Col xs={3} sm={3} md={3} lg={3}>
                    <Image src={ props.userData.picture || 'https://source.unsplash.com/XHVpWcr5grQ'} fluid thumbnail rounded />
                  </Col>

                  {/* IF WINDOW SIZE IS LESS THAN xs=0-768 pixels */}
                  {width < 768 && (
                    <Col xs={3} style={{ textAlign: 'right' }}>
                      <Button variant='primary' size='sm' style={editProfileBtnStyle} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
                        Edit Profile
                      </Button>
                    </Col>
                  )}

                  {/* IF WINDOW SIZE IS GREATER THAN 768px & LESS THAN 1200px */}
                  {width >= 768 && width < 1200 && (
                    <Col xs={3} style={{ textAlign: 'right' }}>
                      <Button variant='primary' size='md' style={editProfileBtnStyle} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
                        Edit Profile
                      </Button>
                    </Col>
                  )}

                  {/* IF WINDOW SIZE IS GREATER THAN 1200px */}
                  {width >= 1200 && (
                    <Col xs={3} style={{ textAlign: 'right' }}>
                      <Button variant='primary' size='lg' style={editProfileBtnStyle} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>
                        Edit Profile
                      </Button>
                    </Col>
                  )}
                </Row>
              </Container>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileHeader;
