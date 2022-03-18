import React from 'react';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

const ProfileButton = () => {
  return (
    <LinkContainer to='/profile'>
      <Nav.Link className='NavProfileIcon'>
        <PersonCircle />
      </Nav.Link>
    </LinkContainer>
  );
};

export default ProfileButton;
