import React, { useState } from 'react';

import UserEditSettings from '../UserEditProfileBtn';

import { Card, Container, Row, Col, Image, Button, Modal, Tab } from 'react-bootstrap';

import '../Profile.css';

const ProfileHeader = (props) => {
  const [state, setState] = useState({
    viewingOwnProfile: window.location.pathname === '/profile',
    show: false,
  });

  return (
    <>
      <Container className='pb-2' fluid>
        <Row>
          <Col>
            <Card className='bg-dark text-white rounded'>
              <Card.Img className='UserBannerImage' src={props.userData.banner_picture || 'https://source.unsplash.com/I0fDR8xtApA'} alt='Image of Astronaut ' />
              <Card.ImgOverlay className='BannerContainer'>
                <Container className='p-0' fluid>
                  <Row className='d-flex justify-content-between'>
                    <Col xs={3} sm={3} md={3} lg={3}>
                      <Image className='UserProfileImage' src={props.userData.picture || 'https://source.unsplash.com/XHVpWcr5grQ'} thumbnail rounded />
                    </Col>
                    {/* ---------------------------------------------------------- */}
                    {/* If User Is Viewing His Or Her Profile In Show These Items  */}
                    {state.viewingOwnProfile && (
                      <Col style={{ textAlign: 'right' }}>
                        <Button className='editProfileBtnStyle' onClick={() => setState({ ...state, show: true })}>
                          Edit Profile
                        </Button>
                      </Col>
                    )}
                    {/* ----------------------------------------------------------------- */}
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
      <Modal show={state.show} onHide={() => setState({ ...state, show: false })} backdrop='static' keyboard={false} dialogClassName='modal-90w' aria-labelledby='user-edit-profile-modal'>
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
