import React from 'react';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

const ProfileButton = () => {
  return (
    <LinkContainer to='/profile'>
      <Nav.Link
        style={{
          color: 'white',
        }}
      >
        {/* Profile Icon */}
        <PersonCircle size={36} />
      </Nav.Link>
    </LinkContainer>
  );
};

export default ProfileButton;
