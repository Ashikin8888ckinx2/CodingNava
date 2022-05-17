import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';

import { convertDate } from '../../../utils/dateConvert.js';
import '../Profile.css';

import { convertDate } from '../../../utils/dateConvert.js';

import { GET_POSTS } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../../utils/auth';

const BuckitCards = (props) => {
  const userId = Auth.getProfile().data._id;
  const userData = props.userData.userData;

  // Load in post data
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId },
  });

  // Handle errors for post data
  if (loading) return null;
  if (error) return 'error';

  return (
    <>
      {data.getPosts.map((post, index) => (
        <Col className='pb-2' sm={4} md={4} lg={4} key={index}>
          <Card className='shadow h-100'>
            {/* CARD HEADER */}
            <Card.Title>
              <div className='BuckitCardTitleContainer'>
                <div className='BuckitCardImageUsername'>
                  <Image className='BuckitCardProfileImage' src={userData.picture + '/60x60'} roundedCircle />
                  <p className='BuckitCardUsername '>{userData.username}</p>
                </div>
                <div className='BuckitCardDate'>{convertDate(post.date_created * 1)}</div>
              </div>
            </Card.Title>

            {/* CARD BODY */}
            <Card.Body className='BuckitCardBodyContainer'>
              <div className='BuckitCardBodyTitle'>{post.title} </div>
              <Card.Img className='BuckitCardImage rounded' src={post.images} />
              <div className='BuckitCardBodyDescription'>{post.description}</div>
            </Card.Body>

            <div className='BuckitCardBodyStatus'>
              Status: <span>In Progress</span>
            </div>

            {/* HEADER /////////////// ROW #6 */}
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
