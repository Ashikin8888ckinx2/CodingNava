import React from 'react';
import Auth from '../../utils/auth';
// NAV Links
import LoginSignUp from './LoginSignUpModal';
import Logout from './Logout';

// Bootstrap Navbar
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const MainNavBar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='m-2 rounded'
        variant='dark'
        style={{
          backgroundImage: `url("https://source.unsplash.com/xOxFEblwM-g")`,
        }}
      >
        <Container>
          <Navbar.Brand href='/'>
            <i className='fab fa-bitbucket p-2'></i>
            <span>Buck It</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='justify-content-end' style={{ width: '100%' }}>
              {/* AUTHROIZATION -------------------------------------- */}
              {Auth.loggedIn() ? (
                <div>
                  <Logout />
                </div>
              ) : (
                <LoginSignUp />
              )}
              {/* AUTHROIZATION -------------------------------------- */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavBar;
