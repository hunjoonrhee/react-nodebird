import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

function LoginForm() {
  const dispatch = useDispatch();
  const { isLoggingIn, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [(email, password)]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-email"> User email</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password"> Password</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          Sign In
        </Button>
        <Link legacyBehavior href="/signup">
          <a>
            <Button>Sign Up</Button>{' '}
          </a>
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
