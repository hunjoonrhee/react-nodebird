import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import { style as UserProfileStyle } from '../styles/UserProfile.style';

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
          Twit <br /> {me.Posts.length}
        </div>,
        <div key="followings">
          Following <br /> {me.Followings.length}
        </div>,
        <div key="followers">
          Followers <br /> {me.Followers.length}
        </div>,
      ]}>
      <Card.Meta avatar={<Avatar>{me.nickname}</Avatar>} title={me.nickname} />
      <Button style={UserProfileStyle.btn} onClick={onLogOut} loading={isLoggingOut}>
        {' '}
        Sign out
      </Button>
    </Card>
  );
}

export default UserProfile;
