import React, { useState } from 'react';
import SearchModal from '../SearchModal';
import '../Navbar.css';

import { Form, FormControl, Button, Modal } from 'react-bootstrap';

import { Search } from 'react-bootstrap-icons';

const SearchBtnForm = () => {
  const [showSearch, setShowSearch] = useState(false);

  /////////////////////////////////////////////////////////
  // FOR SEARCH MODAL
  /////////////////////////////////////////////////////////
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  /////////////////////////////////////////////////////////
  // FOR SEARCH ICON TOGGLE
  /////////////////////////////////////////////////////////
  const toggle = () => {
    setShowSearch((wasOpened) => !wasOpened);
  };

  const handleSearchComponent = () => {
    return (
      <div>
        <Form className='d-flex py-2 navSearchForm'>
          <FormControl type='search' placeholder='Search' className='me-2' aria-label='Search' />
          <Button className='btn-success' onClick={() => handleShow([true, 'xxl-down'])}>
            Search
          </Button>
        </Form>
      </div>
    );
  };

  return (
    <>
      {showSearch ? handleSearchComponent() : null}
      <Search size={34} className='navSearchIcon' onClick={toggle} style={{ cursor: 'pointer' }} />

      {/* /////////////////////////////////////////////////// */}
      {/* FOLLOWING MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>CREATE USER SEARCH CARDS</Modal.Body>
      </Modal>
    </>
  );
};

export default SearchBtnForm;
