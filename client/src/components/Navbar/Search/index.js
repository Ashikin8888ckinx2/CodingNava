import React, { useState } from 'react';
import SearchModal from '../SearchModal';
import '../Navbar.css';

import { Form, FormControl, Button, Modal } from 'react-bootstrap';

const SearchBtnForm = () => {
  const [showSearch, setShowSearch] = useState(false);

  /////////////////////////////////////////////////////////
  // FOR SEARCH MODAL
  /////////////////////////////////////////////////////////
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
  });

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
        <Form className='d-flex py-2 navSearchForm' onSubmit={(e) => { e.preventDefault(); handleShow([true, 'xxl-down']); }}>
          <FormControl name='username' type='text' placeholder='Search' className='me-2' aria-label='Search' onChange={handleChange} />
          <Button className='btn-success' type='submit'>
            Search
          </Button>
        </Form>
      </div>
    );
  };

  return (
    <>
      {showSearch ? handleSearchComponent() : null}

      <span className='NavSearchEmoji' onClick={toggle}>
        🔎
      </span>

      {/* /////////////////////////////////////////////////// */}
      {/* SEARCH MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <SearchModal username={formState.username} onHide={() => setShow(false)} />
      </Modal>
    </>
  );
};

export default SearchBtnForm;
