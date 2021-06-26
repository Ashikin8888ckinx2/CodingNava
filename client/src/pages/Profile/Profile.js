import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';
import { FOLLOW_USER } from '../../utils/mutations';

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
  const [followUser, { error, followData }] = useMutation(FOLLOW_USER);
  let { username } = useParams();

  const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
    variables: { username },
  });

  let userData = data?.user || data?.me || {};
  console.log(userData);
  const handleFollowClick = async () => {
    try {
      const { followData } = await followUser({
        variables: { followId: userData._id },
      });

      if (!followData) {
        throw new Error('something went wrong!');
      }

      userData = followData.followedUser;
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
        <ProfileHeader userData={userData} />
        <Container className='pb-2' fluid>
          <Row>
            <>
              <ProfileUserDetails userData={userData} follow={handleFollowClick} />
            </>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
