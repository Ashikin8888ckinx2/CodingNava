import React, { useState } from 'react';

import UserEditSettings from '../UserEditProfileModal';

import { Card, Container, Row, Col, Image, Button, Modal, Nav, Tab } from 'react-bootstrap';
import { useViewport } from '../../../utils/hooks';

import '../Profile.css';

const ProfileHeader = (props) => {
  const { width } = useViewport();

  ////////////////////////////////////////////////
  // MODAL STATES
  ////////////////////////////////////////////////

  const [show, setShow] = useState(false);

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
  //   EDIT PROFILE BTN
  ////////////////////////////////////////////////

  const editProfileBtn = (size) => {
    if (window.location.pathname === '/profile') {
      return (
        <Col xs={3} style={{ textAlign: 'right' }}>
          <Button variant='primary' size={size} style={editProfileBtnStyle} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} onClick={() => setShow(true)}>
            Edit Profile
          </Button>
        </Col>
      );
    }
  };

  ////////////////////////////////////////////////

  return (
    <>
      <Container className='pb-2' fluid>
        <Row>
          <Col>
            <Card className='bg-dark text-white rounded'>
              <Card.Img src={props.userData.banner_picture || 'https://source.unsplash.com/I0fDR8xtApA/970x250'} alt='Image of Astronaut ' />
              <Card.ImgOverlay>
                <Container className='p-0' fluid>
                  <Row className='justify-content-between'>
                    <Col xs={3}>
                      <Image src={props.userData.picture || 'https://source.unsplash.com/XHVpWcr5grQ/252x252'} fluid thumbnail rounded />
                    </Col>
                    {/* IF WINDOW SIZE IS LESS THAN xs=0-768 pixels */}
                    {width < 768 && editProfileBtn('sm')}

                    {/* IF WINDOW SIZE IS GREATER THAN 768px & LESS THAN 1200px */}
                    {width >= 768 && width < 1200 && editProfileBtn('md')}

                    {/* IF WINDOW SIZE IS GREATER THAN 1200px */}
                    {width >= 1200 && editProfileBtn('lg')}
                  </Row>
                </Container>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* /////////////////////////////////////////////////// */}
      {/* EDIT PROFILE MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false} dialogClassName='modal-90w' aria-labelledby='user-edit-profile-modal'>
        <Tab.Container defaultActiveKey='Settings'>
          {/* LOGIN/SIGNUP MODAL: HEADER */}
          <Modal.Header closeButton>
            <Modal.Title id='user-edit-profile-modal'>
              <h2 className='mb-0'>Settings</h2>
            </Modal.Title>
          </Modal.Header>
          {/* LOGIN/SIGNUP MODAL: BODY */}
          <Modal.Body>
            <Tab.Content>
              {/* TAB 1: Settings */}
              <Tab.Pane eventKey='Settings'>{/* <Login /> */}</Tab.Pane>
              <UserEditSettings userData={props.userData} updateProfile={props.updateProfile} />
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default ProfileHeader;
