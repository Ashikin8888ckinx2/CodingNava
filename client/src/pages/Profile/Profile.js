import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
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
import { Container } from 'react-bootstrap';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const Profile = () => {
  const [update, { updateError, data: updateData }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_ME],
  });
  const [followUser, { error, followData }] = useMutation(FOLLOW_USER);
  let { username } = useParams();

  const viewingOwnProfile = !username;

  const { loading, data } = useQuery(viewingOwnProfile ? GET_ME : GET_USER, {
    variables: { username },
  });

  let userData = data?.user || data?.me || null;

  if ((!Auth.loggedIn() && !username) || (!loading && userData == null)) {
    return <Redirect to='/' />;
  }

  // ///////////////////////////////////////////////////////////////////////////////
  // TO CHECK IF CURRENT USER THATS LOGGED IN IS FOLLOWING THE USER THEY ARE VIEWING
  //////////////////////////////////////////////////////////////////////////////////

  const currentUserId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const isFollowing = userData && userData.followers && userData.followers.includes(currentUserId);

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
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return null;
  }

  //////////////////////////////////////////////////////////////
  // CSS STYLING
  //////////////////////////////////////////////////////////////
  let editProfileCardStyle = {
    fontFamily: 'Open Sans',
  };

  return (
    <>
      <div className='rounded font-monospace' style={editProfileCardStyle}>
        <ProfileHeader userData={userData} viewingOwnProfile={viewingOwnProfile} updateProfile={updateProfileSubmit} />
        <Container className='pb-2' fluid>
          <ProfileUserDetails key={userData.username} userData={userData} follow={handleFollowClick} isFollowing={isFollowing} />
        </Container>
      </div>
    </>
  );
};

export default Profile;
