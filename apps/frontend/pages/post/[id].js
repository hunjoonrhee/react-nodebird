// post/[id].js
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import wrapper from '../../store/configureStore.js';
import { LOAD_MY_INFO_REQUEST, LOAD_POST_REQUEST, LOAD_POSTS_REQUEST } from '../../actions/index.js';
import AppLayout from '../../components/AppLayout.js';
import PostCard from '../../components/PostCard.js';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}s Post</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}'s Post`} />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'}
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>

      <PostCard post={singlePost} />
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
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default Post;
