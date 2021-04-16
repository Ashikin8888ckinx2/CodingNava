import React, { useState } from 'react';

import { Card, Container, Row, Col, Stack, Nav, Fade } from 'react-bootstrap';

import { Journals, People, PersonPlus } from 'react-bootstrap-icons';

import fakeData from './fakeData';

let editProfileCardStyle = {
  fontFamily: 'Rubik',
};

const ProfileCard = (props) => {
  const [navData, setNavData] = useState('');

  //////////////////////////////////////////////////////////////
  // CSS STYLING
  //////////////////////////////////////////////////////////////
  const handleMouseIn = (e) => {
    e.target.style.background = '#FFD369';
    e.target.style.borderColor = '#FFD369';
    e.target.style.fontSize = '110%';
  };

  const handleMouseOut = (e) => {
    e.target.style.background = 'transparent';
    e.target.style.borderColor = 'transparent';
    e.target.style.fontSize = '100%';
  };
console.log(props.userData);
  return (
    <Container className='pb-2' style={editProfileCardStyle} fluid>
      <Row>
        <Col sm={4} md={4} lg={4}>
          <Card className='shadow h-100'>
            <Card.Body>
              <Card.Title className='text-dark'>{ props.userData.username }</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>About Me</Card.Subtitle>
              <Card.Text>{ props.userData.bio }</Card.Text>
              <Card.Footer className=' align-text-top bg-transparent'>
                <Stack direction='horizontal' className='justify-content-around' gap={2}>
                  <Card.Link href='#' className='text-decoration-none text-dark'>
                    <Stack gap={2} className='align-items-center justify-content-end'>
                      <Journals size={36} />
                      Buckets
                    </Stack>
                  </Card.Link>
                  <Card.Link href='#' className='text-decoration-none text-dark'>
                    <Stack gap={2} className='align-items-center justify-content-end'>
                      <People size={36} />
                      { props.userData.followers.length }
                    </Stack>
                  </Card.Link>
                  <Card.Link href='#' className='text-decoration-none text-dark'>
                    <Stack gap={2} className='align-items-center justify-content-end'>
                      <PersonPlus size={36} />
                      { props.userData.following.length }
                    </Stack>
                  </Card.Link>
                </Stack>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={8} md={8} lg={8}>
          <Card className='shadow h-100'>
            <Card.Body>
              <Card.Title>
                <Nav fill variant='tabs'>
                  <Nav.Item>
                    <Nav.Link href='#' className='text-dark px-0' onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} onClick={(e) => setNavData(e.target.text)}>
                      Create
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='link-1' className='text-dark px-0' onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} onClick={(e) => setNavData(e.target.text)}>
                      To Do
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='link-2' className='text-dark px-0' onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} onClick={(e) => setNavData(e.target.text)}>
                      In Progress
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='link-2' className='text-dark px-0' onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} onClick={(e) => setNavData(e.target.text)}>
                      Complete
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Title>
              {/* FADES */}

              <div id='profile-nav-body'>{navData}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileCard;
