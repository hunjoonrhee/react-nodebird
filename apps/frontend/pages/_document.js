// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

function MyDocument({ htmlAttributes }) {
  return (
    <Html {...htmlAttributes}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getStaticProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
