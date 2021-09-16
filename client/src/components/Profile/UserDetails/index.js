import React, { useState } from 'react';

import '../Profile.css';
import CreateModel from './CreateModel';
import FollowersModel from './FollowersModel';
import FollowingModel from './FollowingModel';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import { PlusSquare, People, PersonPlus, Bucket, DashSquare } from 'react-bootstrap-icons';
import { Card, Col, Stack, Modal, Form } from 'react-bootstrap';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserDetails = (props) => {
  // console.log(`Props (components/profile/userDetails/index): ${props}`);
  console.log('Props:', props);
  // console.log(props.userData);
  // console.log(props.isFollowing);
  ////////////////////////////////////////////////
  // MODAL STATES
  ////////////////////////////////////////////////
  const [create, setCreate] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);

  // FOR POPULATING THE ICONS UNDER THE USER DETAILS CARD
  // IF USER IS LOOKING AT HIS OWN PROFILE = SHOULD SHOW BUCKET ICON
  // IF USER IS LOOKING AT ANOTHER PERSONS PROFILE = IT SHOULD SHOW A FOLLOW / UNFOLLOW BUTTON

  const handleUserDetailIcons = () => {
    if (window.location.pathname === '/profile') {
      return (
        <Stack gap={2} className='align-items-center justify-content-end' onClick={() => setCreate(true)}>
          <>
            <Bucket size={36} />
            Create
          </>
        </Stack>
      );
    } else {
      return (
        <Stack gap={2} className='align-items-center justify-content-end' onClick={props.follow}>
          {/* IF USER IS NOT FOLLOWING, USE THE PLUSSQUARE  */}
          <>
            {props.isFollowing ? (
              <>
                <DashSquare size={36} />
                Unfollow
              </>
            ) : (
              <>
                <PlusSquare size={36} />
                Follow
              </>
            )}
          </>
        </Stack>
      );
    }
  };

  // console.log(`Props (components/profile/userDetails/index): ${props.userData}`);
  ////////////////////////////////////////////////
  return (
    <>
      <Col sm={4} md={4} lg={4}>
        <Card className='shadow mb-2'>
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
                  <Stack gap={2} className='align-items-center justify-content-end' onClick={() => setFollowers(true)}>
                    <People size={36} />
                    {props.userData.followers.length || 0}
                  </Stack>
                </Card.Link>
                <Card.Link href='#' className='text-decoration-none text-dark'>
                  <Stack gap={2} className='align-items-center justify-content-end' onClick={() => setFollowing(true)}>
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
      {/* USER BUCKETS */}
      {/* /////////////////////////////////////////////////// */}
      {/* NEED TO CREATE FUNCTIONALITY TO ITERATE THROUGH THE USER BUCKETS */}
      <Col sm={8} md={8} lg={8}>
        <Card className='shadow mb-2'>
          <Card.Header>
            <h4>Visit all Eight Wonders of the World</h4>
          </Card.Header>
          <Card.Body>
            <Form.Select size='md'>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Complete</option>
            </Form.Select>
          </Card.Body>
        </Card>
      </Col>

      {/* /////////////////////////////////////////////////// */}
      {/* CREATE MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={create} onHide={() => setCreate(false)} backdrop='static' keyboard={false} dialogClassName='modal-90w' className='modal-dialog-scrollable'>
        <CreateModel />
      </Modal>
      {/* /////////////////////////////////////////////////// */}
      {/* FOLLOWERS MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={followers} onHide={() => setFollowers(false)} backdrop='static' keyboard={false} className='modal-dialog-scrollable modal-md'>
        <FollowersModel username={props.userData.username} />
      </Modal>
      {/* /////////////////////////////////////////////////// */}
      {/* FOLLOWING MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={following} onHide={() => setFollowing(false)} backdrop='static' keyboard={false} className='modal-dialog-scrollable modal-md'>
        <FollowingModel username={props.userData.username} />
      </Modal>
    </>
  );
};

export default ProfileUserDetails;
