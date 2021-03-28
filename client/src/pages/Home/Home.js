// loads css onto homepage
import './Home.css';

import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div>Home Page</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
