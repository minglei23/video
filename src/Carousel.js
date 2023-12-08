import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel ({seriesList, handleSeriesClick}) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {seriesList.map((seriesItem) => (
        <div key={seriesItem.ID} style={{ textAlign: 'center', padding: '10px' }}>
          <div onClick={() => handleSeriesClick(seriesItem)} style={{ cursor: 'pointer' }}>
            <img src={seriesItem.BaseURL + '/image.jpg'} alt={seriesItem.Name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <h4 style={{ margin: '5px 10px' }}>{seriesItem.Name}</h4>
          </div>
        </div>
      ))}
    </Slider>
  );
}
