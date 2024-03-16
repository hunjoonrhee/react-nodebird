import React, {useState} from 'react';
import Slick from 'react-slick';
import {CloseBtn, Global, Header, ImgWrapper, Indicator, SlickWrapper} from "./IndexZoom.styles";

const ImagesZoom = ({images, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <div style={{display: "inline-block", position: "fixed", zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0, alignItems: "center"}}>
            <Global/>
            <Header>
                <h1> Image details </h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div style={{alignItems: "center"}}>
                    <Slick
                        initialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src}/>
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {' '}
                            /
                            {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </div>
    )
}

export default ImagesZoom;