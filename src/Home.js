import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardActionArea, CardContent, Collapse } from '@mui/material';
import { GetSeriesList } from './service';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [expandedSeriesId, setExpandedSeriesId] = useState(null);

  const handleSeriesClick = (seriesId) => {
    setExpandedSeriesId(expandedSeriesId === seriesId ? null : seriesId);
  };

  const handleEpisodeClick = (seriesId, episodeNumber) => {
    navigate(`/player/${seriesId}/${episodeNumber}`);
  };

  useEffect(() => {
    GetSeriesList().then(data => {
      setSeries(data);
    });
  }, []);

  return (
    <div style={{ height: '90vh', overflow: 'auto' }}>
      <Grid container spacing={2}>
        {series.map((seriesItem) => (
          <Grid item xs={12} sm={6} md={4} key={seriesItem.id}>
            <Card>
              <CardActionArea onClick={() => handleSeriesClick(seriesItem.id)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={seriesItem.image}
                  alt={seriesItem.name}
                />
                <CardContent>
                  <p>{seriesItem.name}</p>
                </CardContent>
              </CardActionArea>
              <Collapse in={expandedSeriesId === seriesItem.id}>
                <CardContent>
                  {Array.from({ length: seriesItem.total_number }, (_, i) => (
                    <p key={i} style={{ cursor: 'pointer' }} onClick={() => handleEpisodeClick(seriesItem.id, i)}>
                      第{i + 1}集
                    </p>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
