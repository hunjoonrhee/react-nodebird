import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

import axios from 'axios';
import wrapper from '../../store/configureStore';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_POSTS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_REQUEST,
} from '../../actions/index.js';
import AppLayout from '../../components/AppLayout.js';
import PostCard from '../../components/PostCard.js';
import FollowButton from '../../components/FollowButton.js';

function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
        data: id,
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts, id]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            's Posts
          </title>
          <meta name="description" content={`${userInfo.nickname}'s Post`} />
          <meta property="og:title" content={`${userInfo.nickname}'s Post`} />
          <meta property="og:description" content={`${userInfo.nickname}'s Post`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && userInfo.id !== me?.id ? (
        <Card
          style={{ marginBottom: 20 }}
          actions={[
            <div key="twit">
              Twits
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers}
            </div>,
          ]}>
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
      <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default User;
