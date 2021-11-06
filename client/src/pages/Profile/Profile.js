import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';
import { FOLLOW_USER, UPDATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
//////////////////////////////////////////////////////////
// PROFILE COMPONENTS
//////////////////////////////////////////////////////////

import ProfileHeader from '../../components/Profile/Header';
import ProfileUserDetails from '../../components/Profile/UserDetails';

//////////////////////////////////////////////////////////
// BOOTSTRAP COMPONENTS
//////////////////////////////////////////////////////////
import { Container, Row } from 'react-bootstrap';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const Profile = () => {
  const [update, { updateError, data: updateData }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_ME],
  });
  const [followUser, { error, followData }] = useMutation(FOLLOW_USER);
  let { username } = useParams();

  // console.log(username);

  const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
    variables: { username },
  });

  let userData = data?.user || data?.me || {};
  console.log('userData (pages/profile/profile): ', userData);
  // ///////////////////////////////////////////////////////////////////////////////
  // TO CHECK IF CURRENT USER THATS LOGGED IN IS FOLLOWING THE USER THEY ARE VIEWING
  //////////////////////////////////////////////////////////////////////////////////

  const currentUserId = Auth.getProfile().data._id;
  const isFollowing = userData.followers && userData.followers.includes(currentUserId);

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // click function for following user
  ///////////////////////////////////////////////////////////////
  const handleFollowClick = async () => {
    try {
      const { data: followData } = await followUser({
        variables: { followId: userData._id, isFollowing },
      });

      if (!followData) {
        throw new Error('something went wrong!');
      }

      userData = followData.followedUser;
    } catch (err) {
      console.error(err);
    }
  };

  // ON FORM SUBMIT
  const updateProfileSubmit = async (event, formData) => {
    event.preventDefault();
    // [1] Check whether user is logged in by checking to see if there is a JWT token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // // [2] If there is not valid token, then exit the process
    if (!token) {
      return false;
    }
    try {
      // [1] useMutation[UPDATE_USER] to update user details
      const { data: updateData } = await update({
        variables: {
          userData: {
            ...formData,
          },
        },
      });

      userData = updateData.updateUser;
      // console.log(userData);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h1>loading</h1>;
  }

  //////////////////////////////////////////////////////////////
  // CSS STYLING
  //////////////////////////////////////////////////////////////
  let editProfileCardStyle = {
    fontFamily: 'Rubik',
  };

  
  return (
    <>
      <div className='rounded' style={editProfileCardStyle}>
        <ProfileHeader userData={userData} updateProfile={updateProfileSubmit} />
        <Container className='pb-2' fluid>
          <Row>
            <>
              <ProfileUserDetails userData={userData} follow={handleFollowClick} isFollowing={isFollowing} />
            </>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
