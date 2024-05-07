import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ImagesZoom } from './ImagesZoom';
import { backUrl } from '../config/config.js';

function PostImages({ images }) {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <div style={{ display: 'inline-block' }}>
        <img
          role="presentation"
          style={{ width: '50%' }}
          src={`${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ width: '50%' }}
          src={`${images[1].src}`}
          alt={images[1].src}
          onClick={onZoom}
        />
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <img role="presentation" style={{ width: '50%' }} src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      <div role="presentation" style={{ display: 'inline-block', width: '50%', textAlign: 'center' }} onClick={onZoom}>
        <PlusOutlined />
        <br />
        see {images.length - 1} images more
      </div>
    </div>
  );
}

export default PostImages;
