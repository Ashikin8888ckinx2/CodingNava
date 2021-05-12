// loads css onto homepage
import './Profile.css';
import ProfileHeader from '../../components/Profile/Header';
import ProfileCard from '../../components/Profile/Card';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';
import { FOLLOW_USER } from '../../utils/mutations';

const Profile = () => {

  const [followUser, { error, followData }] = useMutation(FOLLOW_USER);
  let { username } = useParams();

  const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
    variables: { username }
  });

  let userData = data?.user || data?.me || {};

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
    
  }

  if (loading) {
    return (<h1>loading</h1>)
  }

  return (
    <>
      <div className='rounded '>
        <ProfileHeader userData={userData} />
        <ProfileCard userData={userData} follow={handleFollowClick} />
      </div>
    </>
  );
};

export default Profile;
