import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput.js';

function AppLayout({ children }) {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/" passHref>
            Node Bird
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile" passHref>
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search
            style={{ verticalAlign: 'middle' }}
            value={searchInput}
            enterButton
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        {!(me && me.id) && (
          <Menu.Item key="signup">
            <Link href="/signup" passHref>
              Sign up
            </Link>
          </Menu.Item>
        )}
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            /* eslint-disable-next-line react/jsx-no-target-blank */
            target="_blank"
            rel="noopener noreferrer"
          >
            Based on ZeroCho Lecture
          </a>
        </Col>
      </Row>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
