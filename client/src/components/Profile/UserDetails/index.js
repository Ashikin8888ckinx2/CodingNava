import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import '../Profile.css';

import CreateModel from './CreateModal';
import FollowersModel from './FollowersModal';
import FollowingModel from './FollowingModal';
import PostCreateCard from './PostCreateCard';
import BuckitCards from './BuckitCards';
import { GET_BUCKETLISTS } from '../../../utils/queries';
import Auth from '../../../utils/auth';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import { PlusSquare, People, PersonPlus, Bucket, DashSquare } from 'react-bootstrap-icons';
import { Card, Col, Stack, Modal, Row } from 'react-bootstrap';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserDetails = (props) => {
  ////////////////////////////////////////////////
  // MODAL STATES
  ////////////////////////////////////////////////
  const [create, setCreate] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);

  const userId = Auth.getProfile().data._id;
  const { loading, error, data } = useQuery(GET_BUCKETLISTS, {
    variables: { id: userId },
  });

  if (loading) return null;
  if (error) return 'error';

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
      <Row>
        <Col sm={4} md={4} lg={4} className='pb-2'>
          <Card className='shadow mb-2 h-100'>
            <Card.Body>
              <Card.Title className='text-dark fs-4'>{props.userData.username}</Card.Title>
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

        {window.location.pathname === '/profile' ? <PostCreateCard /> : ''}

      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}
      {/* NEED TO PASS THE PROPS INTO THIS FOR WHEN USER CREATE BUCKIT */}
      {/* //////////////////////////////////////////////////////////////// */}
        <BuckitCards userData={props} />
      </Row>

      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////////////// */}

      {/* /////////////////////////////////////////////////// */}
      {/* CREATE MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={create} onHide={() => setCreate(false)} backdrop='static' keyboard={false} dialogClassName='modal-90w' className='modal-dialog-scrollable'>
        <CreateModel bucketLists={data.getBucketLists}/>
      </Modal>
      {/* /////////////////////////////////////////////////// */}
      {/* FOLLOWERS MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={followers} onHide={() => setFollowers(false)} backdrop='static' keyboard={false} className='modal-dialog-scrollable' size='xl'>
        <FollowersModel username={props.userData.username} />
      </Modal>
      {/* /////////////////////////////////////////////////// */}
      {/* FOLLOWING MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={following} onHide={() => setFollowing(false)} backdrop='static' keyboard={false} className='modal-dialog-scrollable' size='xl'>
        <FollowingModel username={props.userData.username} />
      </Modal>
    </>
  );
};

export default ProfileUserDetails;
