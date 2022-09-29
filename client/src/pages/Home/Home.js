import React from 'react';

import { Row, Container } from 'react-bootstrap';

import HomeCards from '../../components/Home/HomeCards';

const Home = () => {
  return (
    <>
      <div className='rounded font-monospace'>
        <Container className='pb-2' fluid>
          <Row>
            <HomeCards key={Date.now()}/>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
