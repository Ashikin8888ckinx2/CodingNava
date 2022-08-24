import React, { useState } from 'react';
import Auth from '../../utils/auth';

import './Navbar.css';
// NAV Links
import LoginSignUp from './LoginSignUpModal';
import Logout from './Logout';
import Profile from './Profile';
import Search from './Search';
import RainDrop from '../../utils/animation';

// Bootstrap Navbar
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MainNavBar = () => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow((show) => !show);
  };

  return (
    <>
      <RainDrop showAnimation={show} />
      <Container fluid>
        <Row>
          <Col>
            <Navbar
              collapseOnSelect
              // Only collapse for small screens
              expand='sm'
              className='NavBarMainContainer rounded'
              variant='dark'
            >
              <LinkContainer to='/'>
                <Navbar.Brand href='/' className='NavBrandContainer'>
                  <div>
                    <i className='fab fa-bitbucket' onMouseOver={() => toggle()} onMouseOut={() => toggle()}></i>
                  </div>

                  <span className='brandText'>Buck It</span>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='justify-content-end pe-1' style={{ width: '100%' }}>
                  {/* AUTHROIZATION -------------------------------------- */}
                  <Search />
                  {Auth.loggedIn() ? (
                    <React.Fragment>
                      <Profile />
                      <Logout />
                    </React.Fragment>
                  ) : (
                    <LoginSignUp />
                  )}
                  {/* AUTHROIZATION -------------------------------------- */}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainNavBar;
