import { createGlobalStyle } from 'styled-components';

export const style = {
  header: {
    height: '44px',
    background: 'white',
    position: 'relative',
    padding: 0,
    textAlign: 'center',
  },

  btn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '15px',
    lineHeight: '14px',
    cursor: 'pointer',
  },

  slick: {
    background: '#090909',
    height: 'calc(100% - 44px)',
  },

  imgDiv: {
    padding: '32px',
    textAlign: 'center',
  },

  img: {
    margin: '0 auto',
    maxHeight: '750px',
  },

  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '15px',
    lineHeight: '14px',
    cursor: 'pointer',
  },

  indicatorDiv: {
    width: '75px',
    height: '30px',
    lineHeight: '30px',
    borderRadius: '15px',
    background: '#313131',
    display: 'inline-block',
    textAlign: 'center',
    color: 'white',
    fontSize: '15px',
  },
};

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
`;
