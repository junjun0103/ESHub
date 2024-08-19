import type React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import Layout from '../components/common/Layout';
import EscortProfileContent from '../components/profile/escortProfile/EscortProfileContent';
import CustomerProfileContent from '../components/profile/customerProfile/CustomerProfileContent';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        {user.userType === 'escort' ? <EscortProfileContent /> : <CustomerProfileContent />}
      </div>
    </Layout>
  );
};

export default Profile;