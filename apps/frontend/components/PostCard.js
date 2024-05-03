import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, List, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '@ant-design/compatible';
import Link from 'next/link';
import moment from 'moment';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_POST_REQUEST } from '../actions';
import FollowButton from './FollowButton';

moment.locale('de');

function PostCard({ post }) {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = me?.id;

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('login is necessary!');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('login is necessary!');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('login is necessary!');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('login is necessary!');
    }
    return dispatch({
      type: RETWEET_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers?.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>Edit</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button>Report</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname} has retweeted. ` : null}
        extra={id && post.User.id !== id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <div style={{ float: 'right' }}> {moment(post.createdAt).startOf('day').fromNow()}</div>
            <Card.Meta
              avatar={(
                <Link href={`/user/${post.Retweet.User.id}`} passHref>
                  <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                </Link>
              )}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}> {moment(post.createdAt).startOf('day').fromNow()}</div>
            <Card.Meta
              avatar={(
                <Link href={`/user/${post.User.id}`} passHref>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </Link>
              )}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${post.User.id}`} passHref>
                      <Avatar>{item.User.nickname[0]}</Avatar>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
