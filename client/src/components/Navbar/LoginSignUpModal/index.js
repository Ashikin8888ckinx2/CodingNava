import React, { useState } from 'react';
import Login from '../LoginForm';
import Signup from '../SignUpForm';

import '../Navbar.css';

// BOOTSTRAP COMPONENTS
import { Modal, Nav, Tab, Button } from 'react-bootstrap';

const LoginSignUpModal = () => {
  const [show, setShow] = useState(false);
  const [model, setModel] = useState('login');

  return (
    <div>
      <Nav.Link onClick={() => setShow(true)} className='p-2'>
        <Button variant='primary' className='navLogin' onClick={() => setModel('login')}>
          Login
        </Button>{' '}
        <Button variant='warning' className='navSignup' onClick={() => setModel('signup')}>
          Sign Up
        </Button>
      </Nav.Link>

      {/* LOGIN/SIGNUP MODAL */}
      <Modal show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
        <Tab.Container id='left-tabs-example' defaultActiveKey={model}>
          {/* LOGIN/SIGNUP MODAL: HEADER */}
          <Modal.Header closeButton>
            <Modal.Title>
              <Nav variant='pills' className='flex-row gap-2'>
                <Nav.Item>
                  <Nav.Link variant='success' type='submit' eventKey='login'>
                    <span className='p-2'>Login</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link variant='success' type='submit' eventKey='signup'>
                    <span className='p-2'>Sign Up</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          {/* LOGIN/SIGNUP MODAL: BODY */}
          <Modal.Body>
            <Tab.Content>
              {/* TAB 1: LOGIN */}
              <Tab.Pane eventKey='login'>
                <Login />
              </Tab.Pane>
              {/* TAB 2: : LOGIN */}
              <Tab.Pane eventKey='signup'>
                <Signup />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
};

export default LoginSignUpModal;
