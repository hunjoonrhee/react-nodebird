import React, { useCallback, useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { Checkbox, Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import {style as signupStyle} from "../styles/signup.style"

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password])

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false)
  }, [])

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [passwordCheck, password, term])

  return (
    <AppLayout>
      <Head>
        <title> Sign up | Node Bird</title>
      </Head>
      <Form onFinish={onSubmit}> 
        <div>
          <label htmlFor="user-id"> User name</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
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
          {passwordError && <div style = {signupStyle.ErrorDiv}> Password does not match </div>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>Agree to Terms and Conditions</Checkbox>
          {termError && <div style = {signupStyle.ErrorDiv}> You must accept the terms and conditions </div> }
        </div>
        <div style={signupStyle.signUpbtn}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
