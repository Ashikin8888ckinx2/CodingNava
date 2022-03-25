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
import { Card, Col, Modal, Row } from 'react-bootstrap';

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

  /////////////////////////////////////////////////////////////////////////////////////
  // FOR POPULATING THE ICONS UNDER THE USER DETAILS CARD
  // IF USER IS LOOKING AT HIS OWN PROFILE = SHOULD SHOW BUCKET ICON
  // IF USER IS LOOKING AT ANOTHER PERSONS PROFILE = IT SHOULD SHOW A FOLLOW / UNFOLLOW BUTTON
  /////////////////////////////////////////////////////////////////////////////////////

  const handleUserDetailIcons = () => {
    if (window.location.pathname === '/profile') {
      return (
        <div>
          <Bucket onClick={() => setCreate(true)} />
          Create
        </div>
      );
    } else {
      return (
        <div onClick={props.follow}>
          {props.isFollowing ? (
            <>
              <DashSquare />
              <span>Unfollow</span>
            </>
          ) : (
            <>
              <PlusSquare />
              <span>Follow</span>
            </>
          )}
        </div>
      );
    }
  };

  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  return (
    <>
      <Row>
        <Col sm={4} md={4} lg={4} className='pb-2'>
          <Card className='shadow mb-2 h-100'>
            {/* HEADER */}
            <Card.Header className='UserDetailsCardHeader'>
              <Card.Title className='UserDetailsCardUsername'>{props.userData.username}</Card.Title>
            </Card.Header>
            {/* BODY */}
            <Card.Body>
              <Card.Subtitle className='UserDetailsCardSubTitle'>About Me</Card.Subtitle>
              <Card.Text className='UserDetailsCardBio'>{props.userData.bio || 'Current bio is empty'}</Card.Text>
            </Card.Body>
            {/* FOOTER */}
            <Card.Footer className='UserDetailsFooterContainer'>
              {handleUserDetailIcons()}
              <div>
                <People onClick={() => setFollowers(true)} />
                <span>{props.userData.followers.length || 0}</span>
              </div>
              <div>
                <PersonPlus onClick={() => setFollowing(true)} />
                <span>{props.userData.following.length || 0}</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>

        {/* /////////////////////////////////////////////////// */}
        {/* USER BUCKETS - IF USER IS LOGGED IN SHOW FOR OWN PROFILE, OTHERWISE, DO NOT */}
        {/* /////////////////////////////////////////////////// */}

        {window.location.pathname === '/profile' ? <PostCreateCard /> : ''}

        {/* /////////////////////////////////////////////////// */}
        {/* USER BUCKET CARDS */}
        {/* /////////////////////////////////////////////////// */}
        <BuckitCards userData={props} />
      </Row>

      {/* /////////////////////////////////////////////////// */}
      {/* CREATE MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={create} onHide={() => setCreate(false)} backdrop='static' keyboard={false} dialogClassName='modal-90w' className='modal-dialog-scrollable'>
        <CreateModel bucketLists={data.getBucketLists} />
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
