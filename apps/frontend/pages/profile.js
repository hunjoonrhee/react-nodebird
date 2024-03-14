import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowerList";

const Profile = () => {
  const followerList = [
    { nickname: "Eunjoo" },
    { nickname: "Insun" },
    { nickname: "Bongsoo" },
    { nickname: "Joonie" },
  ];
  const followingList = [
    { nickname: "Eunjoo" },
    { nickname: "Insun" },
    { nickname: "Bongsoo" },
    { nickname: "Joonie" },
  ];

  return (
    <>
      <Head>
        <title> My Profile | Node Bird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="following list" data={followingList} />
        <FollowList header="follower list" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
