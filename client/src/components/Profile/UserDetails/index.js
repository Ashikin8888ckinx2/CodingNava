import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMeasure } from 'react-use';

import '../Profile.css';

import CreateModel from './CreateModal';
import FollowersModel from './FollowersModal';
import FollowingModel from './FollowingModal';
import PostCreateCard from './PostCreateCard';
import BuckitCards from './BuckitCards';
import { GET_BUCKETLISTS } from '../../../utils/queries';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import { Card, Col, Modal, Row } from 'react-bootstrap';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserDetails = (props) => {
  const [ref, { height }] = useMeasure();

  // console.log(height);
  ////////////////////////////////////////////////
  // MODAL STATES
  ////////////////////////////////////////////////
  const [create, setCreate] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);

  const userId = props.userData._id;
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
          <i className='fab fa-bitbucket' onClick={() => setCreate(true)}></i>
          Create
        </div>
      );
    } else {
      return (
        <div onClick={props.follow}>
          {props.isFollowing ? (
            <>
              <i className='far fa-minus-square'></i>
              <span>Unfollow</span>
            </>
          ) : (
            <>
              <i className='far fa-plus-square'></i>
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
          <Card className='shadow mb-2 MasterProfileDetails' ref={ref}>
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
                <i className='fa fa-users' onClick={() => setFollowers(true)}></i>
                {/* <People onClick={() => setFollowers(true)} /> */}
                <span>{props.userData.followers.length || 0}</span>
              </div>
              <div>
                <i className='fa fa-user-plus' onClick={() => setFollowing(true)}></i>
                {/* <PersonPlus onClick={() => setFollowing(true)} /> */}
                <span>{props.userData.following.length || 0}</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>

        {/* /////////////////////////////////////////////////// */}
        {/* USER BUCKETS */}
        {/* /////////////////////////////////////////////////// */}

        <PostCreateCard maxHeight={height} />
      </Row>
      {/* /////////////////////////////////////////////////// */}
      {/* USER BUCKET CARDS */}
      {/* /////////////////////////////////////////////////// */}
      <Row>
        <BuckitCards userData={props} />
      </Row>

      {/* /////////////////////////////////////////////////// */}
      {/* CREATE MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={create} onHide={() => setCreate(false)} backdrop='static' keyboard={false} dialogClassName='modal-90w' className='modal-dialog-scrollable'>
        <CreateModel userId={userId} bucketLists={data.getBucketLists} onHide={() => setCreate(false)} />
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
