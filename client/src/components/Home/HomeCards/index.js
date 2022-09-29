import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../../utils/queries';
import { convertDate } from '../../../utils/helpers';

const HomeCards = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return null;
  }

  return (
    <>
      {data.getAllPosts.map((post, i) => (
        <Col className='pb-2' sm={6} md={4} lg={4} xl={3} xxl={3} key={i}>
          <Card className='shadow h-100'>
            {/* CARD HEADER */}
            <Card.Title>
              <div className='d-flex flex-column bd-highlight' style={{ height: 'auto' }}>
                <div className='bd-highlight align-self-end BuckitCardDate'>{convertDate(post.date_created)}</div>
                <LinkContainer to={'/profile/' + post.createdBy.username}>
                  <div className='p-2 bd-highlight align-self-center'>
                    <Image className='BuckitCardProfileImage' src={post.createdBy.picture} style={{ cursor: 'pointer' }} roundedCircle />
                  </div>
                </LinkContainer>
                <div className='p-2 bd-highlight align-self-center'>{post.createdBy.username}</div>
              </div>
            </Card.Title>

            {/* CARD BODY */}
            <Card.Body className='BuckitCardBodyContainer'>
              <Card.Img className='BuckitCardImage rounded' src={post.images[0]} />
              <div className='BuckitCardBodyTitle'>{post.title}</div>
              <div className='BuckitCardBodyDescription'>{post.description}</div>
            </Card.Body>

            <div className='BuckitCardBodyStatus'>
              Status: <span>{post.bucketlist_id ? post.bucketlist_id.progress : "n/a"}</span>
            </div>

            {/* FOOTER */}
            <Card.Footer className='bg-transparent'>
              <div className='BuckitCardFooter'>
                {post.tags.map((tag, i) => (
                  <div key={i}>#{tag}</div>
                ))}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default HomeCards;
