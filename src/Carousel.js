import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
      <Box sx={{ position: 'absolute', zIndex: 1, width: '100%' }}>
        <Grid container alignItems="center" spacing={1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <Grid item marginLeft={2} marginRight={1}>
            <Typography style={{ fontWeight: 'bold', color: '#fc5' }}>MoReel</Typography>
          </Grid>
          <Grid item xs>
            <InputBase
              fullWidth
              placeholder="    Search"
              onClick={() => navigate('/search')}
              style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)', padding: '5px', paddingRight: '15px', borderRadius: '20px', color: '#fff' }}
              endAdornment={<SearchIcon style={{ color: '#fc5', cursor: 'pointer' }} />}
            />
          </Grid>
          <Grid item >
            <Button onClick={() => navigate('/rewards')}>
              <MonetizationOnIcon style={{ color: '#fc5' }} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Slider {...settings}>
        {seriesList.map((seriesItem) => (
          <div key={seriesItem.ID} style={{ textAlign: 'center', padding: '10px' }}>
            <div onClick={() => handleSeriesClick(seriesItem)} style={{ cursor: 'pointer' }}>
              <img src={seriesItem.BaseURL + '/image.jpg'} alt={seriesItem.Name} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
              <h4 style={{ margin: '10px 10px 0px 10px' }}>{seriesItem.Name}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
}
