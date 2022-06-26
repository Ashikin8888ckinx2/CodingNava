import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../../../utils/queries';
import { convertDate } from '../../../utils/dateConvert';

const HomeCards = () => {

  const { loading, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return null;
  }
  
  return (
    <>
      {data.getAllPosts.map((post, i) => (
        <Col className='pb-2' sm={4} md={4} lg={4} key={i}>

          <Card className='shadow h-100'>
            {/* CARD HEADER */}
            <Card.Title>
              <div className='BuckitCardTitleContainer'>
                <LinkContainer to={'/profile/' + post.createdBy.username}>
                  <div className='BuckitCardImageUsername'>
                    <Image className='BuckitCardProfileImage' src={post.createdBy.picture} width="60px" roundedCircle />
                    <p className='BuckitCardUsername '>{post.createdBy.username}</p>
                  </div>
                </LinkContainer>
                <div className='BuckitCardDate'>{convertDate(post.date_created)}</div>
              </div>
            </Card.Title>
            {/* CARD BODY */}
            <Card.Body className='BuckitCardBodyContainer'>
              <div className='BuckitCardBodyTitle'>{post.title}</div>
              <Card.Img className='BuckitCardImage rounded' src={post.images[0]} />
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
      ))
      }
    </>
  );
};

export default HomeCards;
