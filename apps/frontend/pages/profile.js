import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowerList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title> My Profile | Node Bird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following" data={me.Followings} />
        <FollowList header="Follower" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
