import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetSeries } from './service';
import { GetUser } from './cache';
import { Button, Grid, Typography, Box } from '@mui/material';

const Series = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const [user, setUser] = useState(null);
  const [series, setSeries] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const performSeries = async () => {
      setUser(GetUser());
      const s = await GetSeries(seriesId);
      if (s) {
        setImage(s.BaseURL + '/image.jpg');
        setSeries(s);
      }
    };
    performSeries();
  }, [seriesId]);

  const handleEpisodeClick = (episodeNumber) => {
    if (user?.VIP || episodeNumber < 6) {
      navigate(`/player/${seriesId}/${episodeNumber}`);
    }
  };

  return (
    <Box style={{ height: '92vh', padding: '15px' }}>
      <Box style={{ textAlign: 'center', marginBottom: '15px' }}>
        <img src={image} alt="Series Cover" style={{ width: '100%', height: '45vh', objectFit: 'cover' }} />
      </Box>
      <Typography variant="h5" marginBottom="20px">
        {series && series.Name}
      </Typography>
      <Grid container spacing={1} justifyContent="flex-start">
        {series && Array.from({ length: series.TotalNumber }).map((_, index) => {
          const isAccessible = user?.VIP || index < 5;
          return (
            <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                style={{
                  color: '#fff',
                  borderColor: '#333',
                  backgroundColor: '#333',
                  height: '45px',
                  position: 'relative'
                }}
                onClick={() => handleEpisodeClick(index + 1)}
              >
                {index + 1}
                {!isAccessible && <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#fa0',
                  color: 'white',
                  padding: '0px 3px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  zIndex: 1,
                  borderRadius: '5px'
                }}>
                  VIP
                </div>}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Series;
