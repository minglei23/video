import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardActionArea } from '@mui/material';
import { GetSeriesList } from './service';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleSeriesClick = (seriesId) => {
    navigate(`/player/${seriesId}`);
  };

  const [series, setSeries] = useState([]);

  useEffect(() => {
    GetSeriesList().then(data => {
      setSeries(data);
    });
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {series.map((series, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleSeriesClick(series.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={series.image}
                  alt={series.name}
                />
                <div style={{ padding: '10px' }}>
                  <p>{series.name}</p>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
