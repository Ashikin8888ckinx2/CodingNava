import React, { useState } from 'react';

import '../Profile.css';
import CreateModel from './CreateModel';
import FollowersModel from './FollowersModel';
import FollowingModel from './FollowingModel';
import PostModal from './PostModal';
import BuckitCards from './BuckitCards';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import { PlusSquare, PlusLg, People, PersonPlus, Bucket, DashSquare } from 'react-bootstrap-icons';
import { Card, Col, Stack, Modal, Form, Row } from 'react-bootstrap';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserDetails = (props) => {
  console.log('Props:', props);
  // console.log(props.userData);
  // console.log(props.isFollowing);
  ////////////////////////////////////////////////
  // MODAL STATES
  ////////////////////////////////////////////////
  const [create, setCreate] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);
  const [post, setPost] = useState(false);

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
  ////////////////////////////////////////////////
  return (
    <>
      <Row className='pb-2'>
        <Col sm={4} md={4} lg={4}>
          <Card className='shadow mb-2 h-100'>
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
          <Card className='shadow mb-2 h-100'>
            <Card.Header>
              <Stack direction='horizontal' gap={3} className='align-items-center justify-content-between'>
                <div className='fs-4'>Buckit List</div>
                <div>
                  {/* Create function to create bucket list */}
                  <PlusLg size={36} style={{ cursor: 'pointer' }} onClick={() => setPost(true)} />
                </div>
              </Stack>
            </Card.Header>
            <Card.Body>
              {/* Incorporate mapping functionality to render bucket lists on user click create */}
              <Row className='align-items-center justify-content-between pb-2'>
                <Col sm={4} md={4} lg={4}>
                  <Form.Select size='md'>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Complete</option>
                  </Form.Select>
                </Col>
                <Col sm={8} md={8} lg={8}>
                  {/* We need the title's text rather than a form */}
                  <Form.Control type='text' placeholder='Visit 8 Wonders of the World' disabled className='bg-transparent' />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* /////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}
      {/* NEED TO PASS THE PROPS INTO THIS FOR WHEN USER CREATE BUCKIT  */}
      {/* //////////////////////////////////////////////////////////////// */}
      <Row>
        <BuckitCards />
      </Row>
      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}

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
      {/* /////////////////////////////////////////////////// */}
      {/* POST MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={post} onHide={() => setPost(false)} backdrop='static' keyboard={false} className='modal-dialog-scrollable modal-md'>
        <PostModal />
      </Modal>
    </>
  );
};

export default ProfileUserDetails;
