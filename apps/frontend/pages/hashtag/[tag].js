// hashtag/[tag].js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { LOAD_HASHTAG_POSTS_REQUEST, LOAD_MY_INFO_REQUEST, LOAD_POSTS_REQUEST } from '../../actions/index.js';

function Hashtag() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
        data: tag,
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts, tag]);

  return (
    <AppLayout>
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
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.params.tag,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Hashtag;
