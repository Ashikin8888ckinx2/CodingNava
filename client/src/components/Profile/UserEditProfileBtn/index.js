import React, { useState } from 'react';

// BOOTSTRAP COMPONENTS
import { Form, Button } from 'react-bootstrap';

const UserEditSettings = (props) => {

  const [formState, setFormState] = useState({});

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

    if (formState.password !== formState.confirmPassword) {
      return false;
    }
    delete formState.confirmPassword;

    props.updateProfile(event, formState);
  };

  // UPDATING "formState" BASED ON INPUT CHANGES
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    // 1,048,576 bytes is 1 mb, so multiplied by 10 is a limit of 10mb
    const maxSize = 10 * 1048576;

    if (event.target.files[0] && event.target.files[0].size > maxSize) {
      event.target.value = "";
      return alert("File is too big. Needs to be 10MB or smaller");
    };

    setFormState({
      ...formState,
      [name]: files[0],
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {/* EMAIL */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control type='email' name='email' defaultValue={props.userData.email} onChange={handleChange} />
        </Form.Group>
        {/* PASSWORD */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} />
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
          <Form.Control type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} />
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <p className='mb-2' style={{ display: formState.password !== '' && formState.password !== formState.confirmPassword && formState.confirmPassword !== '' ? 'block' : 'none', color: 'red' }}>
          Passwords don't match
        </p>
        {/* ABOUT ME */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='bio'>About Me</Form.Label>
          <Form.Control as='textarea' name='bio' placeholder='Current bio is empty' defaultValue={props.userData.bio} onChange={handleChange} rows={3} />
        </Form.Group>
        {/* PROFILE PHOTO */}
        <Form.Group className='mb-2'>
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control type='file' name='picture' accept='image/*' onChange={handleFileChange} />
        </Form.Group>

        {/* BANNER PHOTO */}
        <Form.Group className='mb-2'>
          <Form.Label>Profile Banner</Form.Label>
          <Form.Control type='file' name='banner_picture' accept='image/*' onChange={handleFileChange} />
        </Form.Group>
        {/* PRIVACY RADIO */}
        <Form.Check className='mb-2' type='switch' id='custom-switch' name='privacy_mode' defaultChecked={props.userData.privacy_mode} onChange={(e) => setFormState({ ...formState, privacy_mode: e.target.checked })} label='Private' />

        {/* UPDATE BUTTON  */}
        <Button variant='success' type='submit'>
          Update
        </Button>
      </Form>
    </>
  );
};

export default UserEditSettings;
