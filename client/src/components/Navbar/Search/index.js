import React, { useState } from 'react';
import SearchModal from '../SearchModal';
import '../Navbar.css';

import { Form, FormControl, Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
    setTimeout(() => {
      setShowSearch((wasOpened) => !wasOpened);
    }, 100);
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
      {/* SEARCH MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <SearchModal />
      </Modal>
    </>
  );
};

export default SearchBtnForm;
