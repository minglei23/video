import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Button, Box, Typography, InputBase } from '@mui/material';

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
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}>
        <Grid container alignItems="center" spacing={0} >
          <Grid item marginLeft={1} marginRight={1}>
            <Typography style={{ fontWeight: 'bold', color: '#fc5' }}>RealShort</Typography>
          </Grid>
          <Grid item xs style={{ flexGrow: 1, flexShrink: 1 }}>
            <InputBase
              fullWidth
              placeholder="    Search"
              onClick={() => navigate('/search')}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: '2px', paddingRight: '10px', borderRadius: '20px', color: '#fff', height: '26px', fontSize: '13px' }}
              endAdornment={<SearchIcon style={{ color: '#ddd', cursor: 'pointer' }} />}
            />
          </Grid>
          <Grid item style={{ flexGrow: 0, flexShrink: 0 }}>
            <Button onClick={() => navigate('/rewards')} style={{ minWidth: 0, padding: 0, margin: 10 }} >
              <img src="/image/coin.gif" alt="Coin" style={{ width: 24, height: 24 }} />
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
