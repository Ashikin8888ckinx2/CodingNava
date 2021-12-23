import React from 'react';
import Auth from '../../utils/auth';
// NAV Links
import LoginSignUp from './LoginSignUpModal';
import Logout from './Logout';
import Profile from './Profile';
import Search from './Search';

// Bootstrap Navbar
import { Navbar, Nav, Container, Stack, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { BucketFill } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

const MainNavBar = () => {
  return (
    <>
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
                    <BucketFill size={36} />
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
