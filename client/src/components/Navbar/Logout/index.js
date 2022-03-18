import React from 'react';
import Auth from '../../../utils/auth';

// BOOTSTRAP COMPONENTS
import { Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LogoutButton = () => {
  return (
    <LinkContainer to='/'>
      <Nav.Link onClick={Auth.logout} className='NavLogoutBtn'>
        <Button variant='danger'>Logout</Button>
      </Nav.Link>
    </LinkContainer>
  );
};

export default LogoutButton;
