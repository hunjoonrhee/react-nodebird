import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

function NodeBird({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Node Bird</title>
      </Head>
      <Component />
    </>
  );
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
