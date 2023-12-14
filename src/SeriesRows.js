import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';

export default function SeriesRows({ seriesList, handleSeriesClick }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0 10px' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ flex: '1 0 calc(50% - 10px)', margin: '0 5px' }} key={seriesItem.id}>
          <Card style={{ backgroundColor: '#111', color: 'white', height: '100%' }}>
            <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
              <div style={{ position: 'relative', height: 0, paddingTop: '145%' }}>
                <CardMedia
                  component="img"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  image={seriesItem.BaseURL + '/image.jpg'}
                  alt={seriesItem.Name}
                />
              </div>
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
