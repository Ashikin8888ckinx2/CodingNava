// Create Modal for BucketList
import React, { useState } from 'react';

import PostModal from './PostModal';
import '../Profile.css';
import { GET_BUCKETLISTS } from '../../../utils/queries';
import { ADD_BUCKET_LIST } from '../../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';

import { Card, Col, Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap';

const PostCreateCard = (props) => {
  const [state, setState] = useState({
    viewingOwnProfile: window.location.pathname === '/profile',
    post: false,
  });

  const userId = Auth.getProfile().data._id;
  const { loading, error, data } = useQuery(GET_BUCKETLISTS, {
    variables: { id: userId },
  });

  const [addBucketList, { data: bucketData, loading: bucketLoading, error: bucketError }] = useMutation(ADD_BUCKET_LIST, {
    refetchQueries: [GET_BUCKETLISTS],
  });

  const handleDelete = (event) => {
    const value = event.target;
    console.log(value);
  };

  if (loading) return null;
  if (error) return 'error';

  return (
    <>
      <Col sm={8} md={8} lg={8} className='pb-2'>
        <Card className='container shadow pb-3' style={{ height: props.maxHeight }}>
          <Card.Header className='BuckitListHeaderContainer'>
            <div className='fs-4'>Buckit List</div>

            {/* ---------------------------------------------------------- */}
            {/* If User Is Viewing His Or Her Profile In Show These Items  */}
            {state.viewingOwnProfile && (
              <Button onClick={() => setState({ ...state, post: true })} className='buckitListBtnStyle'>
                <span className='BuckitListPlus'>+</span>
              </Button>
            )}
            {/* ----------------------------------------------------------------- */}
          </Card.Header>
          <Card.Body className='BuckitListMasterBody'>
            {data.getBucketLists.map((item, index) => (
              <Card className='mb-2' key={index}>
                <Card.Body className='BuckitListBodyContainer rounded'>
                  <Card.Header className='BuckitListBodyHeader'>
                    <Card.Text>{item.progress}</Card.Text>

                    {/* ---------------------------------------------------------- */}
                    {/* If User Is Viewing His Or Her Profile In Show These Items  */}
                    {state.viewingOwnProfile && (
                      <div className='BuckitListBodyIcons'>
                        <OverlayTrigger
                          trigger='click'
                          key='left'
                          placement='left'
                          overlay={
                            <Popover id='popover-positioned-left'>
                              <Popover.Header as='h3'>Popover left</Popover.Header>
                              <Popover.Body>
                                <strong>Holy guacamole!</strong> Check this info.
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <i className='fas fa-wrench'></i>
                        </OverlayTrigger>
                        <i className='far fa-trash-alt'></i>
                      </div>
                    )}
                    {/* ----------------------------------------------------------------- */}
                  </Card.Header>

                  <div className='BuckitListBodyText'>
                    <Card.Text>{item.name}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </Col>

      {/* /////////////////////////////////////////////////// */}
      {/* POST MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={state.post} onHide={() => setState({ ...state, post: false })} backdrop='static' keyboard={false} className='modal-dialog-scrollable modal-md'>
        <PostModal userId={userId} addBucketList={addBucketList} onHide={() => setState({ ...state, post: false })} />
      </Modal>
    </>
  );
};

export default PostCreateCard;
