// loads css onto homepage
import './Profile.css';
import ProfileHeader from '../../components/Profile/Header';
import ProfileCard from '../../components/Profile/Card';

const Profile = () => {
  return (
    <>
      <div className='rounded '>
        <ProfileHeader />
        <ProfileCard />
      </div>
    </>
  );
};

export default Profile;
