import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';

import '../Profile.css';
import { GET_POSTS } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import { convertDate } from '../../../utils/helpers';

const BuckitCards = (props) => {
  const userData = props.userData.userData;

  // Load in post data
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId: userData._id },
  });

  // Handle errors for post data
  if (loading) return null;
  if (error) return 'error';

  return (
    <>
      {data.getPosts.map((post, i) => (
        <Col className='pb-2' sm={6} md={4} lg={4} xl={3} xxl={3} key={i}>
          <Card className='shadow h-100'>
            {/* CARD HEADER */}
            <Card.Title>
              <div className='d-flex flex-column bd-highlight' style={{ height: 'auto' }}>
                <div className='bd-highlight align-self-end BuckitCardDate'>{convertDate(post.date_created)}</div>
                <div className='p-2 bd-highlight align-self-center'>
                  <Image className='BuckitCardProfileImage' src={userData.picture} roundedCircle />
                </div>
                <div className='p-2 bd-highlight align-self-center'>{userData.username}</div>
              </div>
            </Card.Title>

            {/* CARD BODY */}
            <Card.Body className='BuckitCardBodyContainer'>
              <Card.Img className='BuckitCardImage rounded' src={post.images} />
              <div className='BuckitCardBodyTitle'>{post.title} </div>
              <div className='BuckitCardBodyDescription'>{post.description}</div>
            </Card.Body>
            <div className='BuckitCardBodyStatus'>
              Status: <span>{post.bucketlist_id ? post.bucketlist_id.progress : 'n/a'}</span>
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
export default BuckitCards;
