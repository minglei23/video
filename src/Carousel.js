import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Button, Box, InputBase } from '@mui/material';

export default function Carousel({ seriesList, handleSeriesClick }) {

  const navigate = useNavigate();

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
    <Box>
      <Box sx={{
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingTop: '5px',
        paddingBottom: '5px'
      }}>
        <Grid container alignItems="center" spacing={0.5} style={{ width: '100%' }}>
          <Grid item style={{ flexBasis: '25%', flexGrow: 0, flexShrink: 0 }}>
            <img src="/image/RealShort.png" alt="RealShort" style={{ maxHeight: '30px', borderRadius: '5px', paddingLeft: '5px' }} />
          </Grid>
          <Grid item style={{ flexBasis: '65%', flexGrow: 0, flexShrink: 0 }}>
            <InputBase
              fullWidth
              placeholder="    Search"
              onClick={() => navigate('/search')}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '2px', paddingRight: '10px', borderRadius: '20px', color: '#fff', height: '26px', fontSize: '13px' }}
              endAdornment={<SearchIcon style={{ color: '#ddd', cursor: 'pointer' }} />}
            />
          </Grid>
          <Grid item style={{ flexBasis: '10%', flexGrow: 0, flexShrink: 0 }}>
            <Button onClick={() => navigate('/profile')} style={{ minWidth: 0, padding: 0 }}>
              <img src="/image/coin.gif" alt="Coin" style={{ maxHeight: '24px', paddingLeft: '5px' }} />
            </Button>
          </Grid>
        </Grid>
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
