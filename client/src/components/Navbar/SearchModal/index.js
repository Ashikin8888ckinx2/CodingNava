import React from 'react';
import '../Navbar.css';

import { Modal, Tab, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useQuery } from '@apollo/client';
import { SEARCH_USERS } from '../../../utils/queries';

const SearchModel = (props) => {

  const { loading, error, data } = useQuery(SEARCH_USERS, {
    variables: { searchUser: props.username }
  });

  if (loading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Modal.Header className='py-2' closeButton>
        <Modal.Title className='SearchModalTitle'>Search Result</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
        {' '}
        <Tab.Content>
          <Tab.Pane eventKey='Create' className='d-flex flex-wrap'>
            {data.searchUsers.map((user) => (
              <Col key={user.username} xs={3} sm={3} md={3} lg={3}>
                <LinkContainer to={'/profile/' + user.username} onClick={props.onHide}>
                  <Card className='shadow m-1'>
                    <Card.Body className='d-flex flex-wrap justify-content-around p-2'>
                      <Card.Img className='UserSearchImage rounded' variant='left' src={user.picture} style={{ cursor: 'pointer' }} />
                      <div className='UserSearchUsername pt-1'>{user.username}</div>
                    </Card.Body>
                  </Card>
                </LinkContainer>
              </Col>
            ))}
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </>
  );
};

export default SearchModel;
