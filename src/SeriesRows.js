import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';

export default function SeriesRows({ seriesList, handleSeriesClick }) {
  const isOdd = seriesList.length % 2 !== 0;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0 10px' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ flex: '1 0 calc(50% - 10px)', maxWidth: 'calc(50% - 10px)', margin: '0 5px' }} key={seriesItem.id}>
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
                <h3>{seriesItem.Name}</h3>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
      {isOdd && <div style={{ flex: '1 0 calc(50% - 10px)', maxWidth: 'calc(50% - 10px)', margin: '0 5px', visibility: 'hidden' }}></div>}
    </div>
  );
}
