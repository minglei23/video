import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Box } from '@mui/material';

export default function SeriesInfo({user, series}) {

  const navigate = useNavigate();

  const handleEpisodeClick = (seriesId, episodeNumber) => {
    if ((user && user.VIP) || episodeNumber <= 5) {
      navigate(`/player/${seriesId}/${episodeNumber}`);
    }
  };

  if (!series?.TotalNumber) return null;

  return (
    <Box style={{ maxHeight: '50vh', padding: '15px' }}>
      <Typography variant="h5" marginBottom="20px" color={'#fff'}>
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
                  borderColor: '#444',
                  backgroundColor: '#444',
                  height: '45px',
                  position: 'relative'
                }}
                onClick={() => handleEpisodeClick(series.ID, index + 1)}
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
  )
}
