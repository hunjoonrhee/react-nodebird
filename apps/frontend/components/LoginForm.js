import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(
    (e) => {
      console.log(id, password);
      setIsLoggedIn(true);
    },
    [(id, password)]
  );

  return (
    <LoginFormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id"> User name</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password"> Password</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          Sign In
        </Button>
        <Link href={"/signup"}>
          <a>
            <Button>Sign Up</Button>{" "}
          </a>
        </Link>
      </ButtonWrapper>
    </LoginFormWrapper>
  );
};



export default LoginForm;
