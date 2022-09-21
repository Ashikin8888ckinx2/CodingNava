import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../../utils/queries';

// BOOTSTRAP COMPONENTS
import { Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileButton = () => {
  const { data } = useQuery(GET_ME);

  return (
    <LinkContainer to='/profile'>
      <Nav.Link className='NavProfileContainer'>
        <div className=' bd-highlight align-self-center'>{data && <Image className='NavProfileImage' src={data.me.picture} roundedCircle />}</div>
      </Nav.Link>
    </LinkContainer>
  );
};

export default ProfileButton;
