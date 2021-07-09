import React, { useState } from 'react';
import Auth from '../../../utils/auth';

import '../Profile.css';

import UserEditBucket from '../UserEditBucket';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import { Card, Col, Stack, Tab, Modal, Nav } from 'react-bootstrap';
import { PlusSquare, DashSquare, People, PersonPlus, Bucket } from 'react-bootstrap-icons';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserDetails = (props) => {
  ////////////////////////////////////////////////
  // MODAL STATES
  ////////////////////////////////////////////////

  const [show, setShow] = useState(false);

  // FOR POPULATING THE ICONS UNDER THE USER DETAILS CARD
  // IF USER IS LOOKING AT HIS OWN PROFILE = SHOULD SHOW BUCKET ICON
  // IF USER IS LOOKING AT ANOTHER PERSONS PROFILE = IT SHOULD SHOW A FOLLOW / UNFOLLOW BUTTON
  const handleUserDetailIcons = () => {
    if (window.location.pathname === '/profile') {
      return (
        <Stack gap={2} className='align-items-center justify-content-end' onClick={() => setShow(true)}>
          <>
            <Bucket size={36} />
            Posts
          </>
        </Stack>
      );
    } else {
      return (
        <Stack gap={2} className='align-items-center justify-content-end' onClick={props.follow}>
          {/* IF USER IS NOT FOLLOWING, USE THE PLUSSQUARE  */}
          <>
            <PlusSquare size={36} />
            {props.isFollowing ? "Unfollow" : "Follow"} 
          </>
          {/* <><DashSquare size={36} />Unfollow</> */}
        </Stack>
      );
    }
  };
  return (
    <>
      <Col sm={4} md={4} lg={4}>
        <Card className='shadow'>
          <Card.Body>
            <Card.Title className='text-dark'>{props.userData.username}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>About Me</Card.Subtitle>
            <Card.Text>{props.userData.bio || 'Current bio is empty'}</Card.Text>
            <Card.Footer className=' align-text-top bg-transparent'>
              <Stack direction='horizontal' className='justify-content-around' gap={2}>
                <Card.Link href='#' className='text-decoration-none text-dark'>
                  {/* ////////////////////////////////////////////////// */}
                  {handleUserDetailIcons()}
                  {/* ////////////////////////////////////////////////// */}
                </Card.Link>
                <Card.Link href='#' className='text-decoration-none text-dark'>
                  <Stack gap={2} className='align-items-center justify-content-end'>
                    <People size={36} />
                    {props.userData.followers.length || 0}
                  </Stack>
                </Card.Link>
                <Card.Link href='#' className='text-decoration-none text-dark'>
                  <Stack gap={2} className='align-items-center justify-content-end'>
                    <PersonPlus size={36} />
                    {props.userData.following.length || 0}
                  </Stack>
                </Card.Link>
              </Stack>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
      {/* /////////////////////////////////////////////////// */}
      {/* EDIT PROFILE MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false} dialogClassName='modal-90w' className='modal-dialog-scrollable'>
        <Tab.Container defaultActiveKey='BuckIts'>
          {/* LOGIN/SIGNUP MODAL: HEADER */}
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className='mb-0'>BuckIts</h2>
            </Modal.Title>
          </Modal.Header>
          {/* LOGIN/SIGNUP MODAL: BODY */}
          <Modal.Body>
            <Tab.Content>
              {/* TAB 1: Settings */}
              <Tab.Pane eventKey='BuckIts'>
                <UserEditBucket />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default ProfileUserDetails;
