import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logoutRequestAction } from '../reducers/user';
import { style as UserProfileStyle } from '../styles/UserProfile.style';
import FollowButton from './FollowButton.js';

function UserProfile() {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`} passHref>
            Twit <br /> {me.Posts.length}
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile" passHref>
            Following <br /> {me.Followings.length}
          </Link>
        </div>,
        <div key="followers">
          <Link href="/profile" passHref>
            Followers <br /> {me.Followers.length}
          </Link>
        </div>,
      ]}>
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`} passHref>
            <Avatar>{me.nickname}</Avatar>
          </Link>
        }
        title={me.nickname}
      />
      <Button style={UserProfileStyle.btn} onClick={onLogOut} loading={isLoggingOut}>
        {' '}
        Sign out
      </Button>
    </Card>
  );
}

export default UserProfile;
