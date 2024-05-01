import React, { useState } from 'react';
import Slick from 'react-slick';
import { CloseOutlined } from '@ant-design/icons';
import { style as ImagesZoomStyle } from './IndexZoom.styles';

function ImagesZoom({ images, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'fixed',
        zIndex: 5000,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
      }}>
      {/* <Global /> */}
      <header style={ImagesZoomStyle.header}>
        <h1 style={{ margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px' }}> Image details </h1>
        <CloseOutlined style={ImagesZoomStyle.closeBtn} onClick={onClose}>
          X
        </CloseOutlined>
      </header>
      <div style={ImagesZoomStyle.slick}>
        <div style={{ alignItems: 'center' }}>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}>
            {images.map((v) => (
              <div style={ImagesZoomStyle.imgDiv} key={`http://localhost:3065/${v.src}`}>
                <img
                  style={ImagesZoomStyle.img}
                  src={`http://localhost:3065/${v.src}`}
                  alt={`http://localhost:3065/${v.src}`}
                />
              </div>
            ))}
          </Slick>
          <div style={{ textAlign: 'center' }}>
            <div style={ImagesZoomStyle.indicatorDiv}>
              {currentSlide + 1} /{images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesZoom;
