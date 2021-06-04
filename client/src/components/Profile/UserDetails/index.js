import React from 'react';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import { Card, Col, Stack } from 'react-bootstrap';
import { PlusSquare, DashSquare, People, PersonPlus } from 'react-bootstrap-icons';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserDetails = (props) => {
  return (
    <Col sm={4} md={4} lg={4}>
      <Card className='shadow'>
        <Card.Body>
          <Card.Title className='text-dark'>{props.userData.username}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>About Me</Card.Subtitle>
          <Card.Text>{props.userData.bio || 'Current bio is empty'}</Card.Text>
          <Card.Footer className=' align-text-top bg-transparent'>
            <Stack direction='horizontal' className='justify-content-around' gap={2}>
              <Card.Link href='#' className='text-decoration-none text-dark'>
                <Stack gap={2} className='align-items-center justify-content-end' onClick={props.follow}>
                  {/* IF USER IS NOT FOLLOWING, USE THE PLUSSQUARE  */}
                  <>
                    <PlusSquare size={36} />
                    Follow
                  </>

                  {/* <>
                    <DashSquare size={36} />
                    Unfollow
                  </> */}
                </Stack>
              </Card.Link>
              <Card.Link href='#' className='text-decoration-none text-dark'>
                <Stack gap={2} className='align-items-center justify-content-end'>
                  <People size={36} />
                  {props.userData.followers.length}
                </Stack>
              </Card.Link>
              <Card.Link href='#' className='text-decoration-none text-dark'>
                <Stack gap={2} className='align-items-center justify-content-end'>
                  <PersonPlus size={36} />
                  {props.userData.following.length}
                </Stack>
              </Card.Link>
            </Stack>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProfileUserDetails;
