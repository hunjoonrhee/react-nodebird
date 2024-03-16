import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Menu, Input, Row, Col,
} from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align: "middle";
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Node Bird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? (
            <UserProfile />
          ) : (
            <LoginForm />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            /* eslint-disable-next-line react/jsx-no-target-blank */
            target="_blank"
            rel="norefferer noopener"
          >
            Based on ZeroCho Lecture
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
