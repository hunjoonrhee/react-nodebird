import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST, CHANGE_NICKNAME_REQUEST } from '../actions/index.js';
import useInput from '../hooks/useInput.js';

function NicknameEditForm({}) {
  const dispatch = useDispatch();
  const { me, changingNicknameLoading, changingNicknameDone, changingNicknameError } = useSelector(
    (state) => state.user,
  );
  const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname || '');

  useEffect(() => {
    if (changingNicknameDone) {
      setNickname(me?.nickname);
    }
  }, [changingNicknameDone]);

  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    [],
  );

  const onSubmitChangeNickname = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="Nickname"
        enterButton="Edit"
        loading={changingNicknameLoading}
        onSearch={onSubmitChangeNickname}
      />
    </Form>
  );
}

export default NicknameEditForm;
