import React from 'react';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileButton = () => {
  return (
    <LinkContainer to='/profile'>
      <Nav.Link className='NavProfileIcon'>
        <i className='fas fa-user'></i>
      </Nav.Link>
    </LinkContainer>
  );
};

export default ProfileButton;
