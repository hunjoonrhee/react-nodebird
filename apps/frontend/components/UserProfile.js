import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          Twit
          {' '}
          <br />
          {' '}
          {me.Posts.length}
        </div>,
        <div key="followings">
          Following
          {' '}
          <br />
          {' '}
          {me.Followings.length}
        </div>,
        <div key="followers">
          Followers
          {' '}
          <br />
          {' '}
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname}</Avatar>} title={me.nickname} />
      <ButtonWrapper onClick={onLogOut} loading={isLoggingOut}> Sign out</ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
