import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowerList';

function Profile() {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
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
}

export default Profile;
