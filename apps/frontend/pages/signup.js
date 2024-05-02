import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Checkbox, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { style as signupStyle } from '../styles/signup.style';
import { LOAD_MY_INFO_REQUEST, LOAD_POSTS_REQUEST, SIGN_UP_REQUEST } from '../actions';
import wrapper from '../store/configureStore.js';

function Signup() {
  const { isSigningUp, isSignedUp, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (isSignedUp) {
      Router.replace('/');
    }
  }, [isSignedUp]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  const dispatch = useDispatch();

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [passwordCheck, password, term]);

  return (
    <AppLayout>
      <Head>
        <title> Sign up | Node Bird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id"> User name</label>
          <br />
          <Input name="user-id" type="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor="user-nickname"> Nickname</label>
          <br />
          <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
        </div>
        <div>
          <label htmlFor="user-password"> Password</label>
          <br />
          <Input name="user-password" value={password} type="password" onChange={onChangePassword} required />
        </div>
        <div>
          <label htmlFor="user-password-check">Check Password</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <div style={signupStyle.ErrorDiv}> Password does not match </div>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            Agree to Terms and Conditions
          </Checkbox>
          {termError && <div style={signupStyle.ErrorDiv}> You must accept the terms and conditions </div>}
        </div>
        <div style={signupStyle.signUpbtn}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            Sign Up
          </Button>
        </div>
      </Form>
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
    type: LOAD_POSTS_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Signup;
