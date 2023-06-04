import React from "react";
import Slider from "react-slick";
import "./homeCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCarousel = () => {
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slider-arrow prev-arrow" onClick={onClick}>
        <i className="fa fa-chevron-left"></i>
      </div>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slider-arrow next-arrow" onClick={onClick}>
        <i className="fa fa-chevron-right"></i>
      </div>
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="homeSliderContainer">
      <Slider {...settings}>
        <div className="homeSliderImageContainer">
          <img
            className="homeSliderImage"
            src="https://images.hdqwalls.com/wallpapers/monkey-nft-v7.jpg"
            alt=""
          />
        </div>
        <div className="homeSliderImageContainer">
          <img
            className="homeSliderImage"
            src="https://wallpapersmug.com/download/3840x2160/3e0156/bitcoin-digital-art-abstract.jpg"
            alt=""
          />
        </div>
        <div className="homeSliderImageContainer">
          <img
            className="homeSliderImage"
            src="https://wallpaperaccess.com/full/3648367.jpg"
            alt=""
          />
        </div>
        <div className="homeSliderImageContainer">
          <img
            className="homeSliderImage"
            src="https://pbs.twimg.com/media/B3TpEy9CUAEtdoY.jpg"
            alt=""
          />
        </div>
        <div className="homeSliderImageContainer">
          <img
            className="homeSliderImage"
            src="https://wallpaperaccess.com/full/1267681.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default HomeCarousel;
