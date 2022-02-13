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
import { Navbar, Nav, Container, Stack, Row, Col } from 'react-bootstrap';
import { BucketFill } from 'react-bootstrap-icons';
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
              className='rounded my-2 py-0'
              variant='dark'
              style={{
                backgroundImage: `url("https://source.unsplash.com/xOxFEblwM-g")`,
              }}
            >
              <LinkContainer to='/'>
                <Navbar.Brand href='/' className='p-2'>
                  <Stack direction='horizontal' gap={1}>
                    <BucketFill size={36} className='BucketBrand' onMouseOver={() => toggle()} onMouseOut={() => toggle()} />
                    <h1
                      className='mb-0 mt-2'
                      style={{
                        fontFamily: 'Bebas Neue',
                      }}
                    >
                      Buck It
                    </h1>
                  </Stack>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='justify-content-end' style={{ width: '100%' }}>
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
