import React, { useState } from 'react';

import { Form, FormControl, Button } from 'react-bootstrap';

import { Search } from 'react-bootstrap-icons';

const SearchBtnForm = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggle = () => {
    setShowSearch((wasOpened) => !wasOpened);
  };

  const handleSearchComponent = () => {
    return (
      <div>
        <Form className='d-flex py-2'>
          <FormControl type='search' placeholder='Search' className='me-2' aria-label='Search' />
          <Button className='btn-success'>Search</Button>
        </Form>
      </div>
    );
  };

  return (
    <>
      {showSearch ? handleSearchComponent() : null}
      <Search size={33} className='m-2' onClick={toggle} style={{ cursor: 'pointer' }} />
    </>
  );
};

export default SearchBtnForm;
