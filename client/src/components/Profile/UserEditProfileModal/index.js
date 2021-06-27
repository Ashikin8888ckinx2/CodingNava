import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

// BOOTSTRAP COMPONENTS
import { Form, Button } from 'react-bootstrap';

const UserEditSettings = (props) => {
  const [update, { error, data }] = useMutation(UPDATE_USER);

  const [formState, setFormState] = useState({
    email: props.userData.email,
    bio: props.userData.bio,
    picture: props.userData.picture,
    banner_picture: props.userData.banner_picture,
    privacy_mode: false,
  });

  // UPDATING "formState" BASED ON INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // ON FORM SUBMIT
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // [1] Check whether user is logged in by checking to see if there is a JWT token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // // [2] If there is not valid token, then exit the process
    if (!token) {
      return false;
    }

    try {
      // [1] useMutation[UPDATE_USER] to update user details
      const { data } = await update({
        variables: {
          userData: {
            ...formState,
          },
        },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {/* EMAIL */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control type='email' name='email' defaultValue={props.userData.email} onChange={handleChange} required />
        </Form.Group>
        {/* PASSWORD */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder="Password" onChange={handleChange} required />
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='password'>Confirm Password</Form.Label>
          <Form.Control type='password' name='password' placeholder="Confirm Password" onChange={handleChange} required />
        </Form.Group>
        {/* ABOUT ME */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='bio'>About Me</Form.Label>
          <Form.Control as='textarea' name='bio' placeholder='Current bio is empty' defaultValue={props.userData.bio} onChange={handleChange} rows={3} />
        </Form.Group>
        {/* PROFILE PHOTO */}
        <Form.Group className='mb-2'>
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control type='file' name='picture' onChange={handleChange} />
        </Form.Group>

        {/* BANNER PHOTO */}
        <Form.Group className='mb-2'>
          <Form.Label>Profile Banner</Form.Label>
          <Form.Control type='file' name='banner_picture' onChange={handleChange} />
        </Form.Group>
        {/* PRIVACY RADIO */}
        <Form.Check className='mb-2' type='switch' id='custom-switch' name='privacy_mode' onChange={(e) => setFormState({ ...formState, privacy_mode: e.target.checked })} label='Private' />

        {/* UPDATE BUTTON  */}
        <Button variant='success' type='submit'>
          Update
        </Button>
      </Form>
    </>
  );
};

export default UserEditSettings;
