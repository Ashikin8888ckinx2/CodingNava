// loads css onto homepage
import './Profile.css';
import ProfileHeader from '../../components/Profile/Header';
import ProfileCard from '../../components/Profile/Card';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../../utils/queries';

const Profile = () => {
  let { username } = useParams();
  const { loading, data } = useQuery(GET_USER, {
    variables: { username }
  });
  const userData = data?.user || {};

  if(loading) {
    return (<h1>loading</h1>)
  }

  return (
    <>
      <div className='rounded '>
        <ProfileHeader userData={ userData } />
        <ProfileCard userData={ userData } />
      </div>
    </>
  );
};

export default Profile;
