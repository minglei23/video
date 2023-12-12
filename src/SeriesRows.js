import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';

export default function SeriesRows({ seriesList, handleSeriesClick }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ flex: '0 1 175px', margin: '0px 5px' }} key={seriesItem.id}>
          <Card style={{ backgroundColor: '#111', color: 'white', height: '100%' }}>
            <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
              <CardMedia
                component="img"
                height="200"
                image={seriesItem.BaseURL + '/image.jpg'}
                alt={seriesItem.Name}
              />
              <CardContent style={{ padding: '0px' }}>
                <h4>{seriesItem.Name}</h4>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}
