import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';

export default function PopularList({ seriesList, handleSeriesClick }) {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ display: 'inline-block', width: '150px', padding: '0 10px' }} key={seriesItem.id}>
          <Card style={{ backgroundColor: '#111', color: 'white' }}>
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
