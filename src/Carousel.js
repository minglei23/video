import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Top from './Top';
import { Box } from '@mui/material';

export default function Carousel({ seriesList, handleSeriesClick }) {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        backgroundImage: 'url("/image/top.png")',
        backgroundSize: 'cover',
        paddingTop: '10px',
        paddingBottom: '10px'
      }}>
        <Top />
      </Box>
      <Slider {...settings}>
        {seriesList.map((seriesItem) => (
          <div key={seriesItem.ID} style={{ textAlign: 'center', padding: '10px' }}>
            <div onClick={() => handleSeriesClick(seriesItem)} style={{ cursor: 'pointer' }}>
              <img src={seriesItem.BaseURL + '/image.jpg'} alt={seriesItem.Name} style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
              <h4 style={{ margin: '10px 10px 0px 10px' }}>{seriesItem.Name}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
}
