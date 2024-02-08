import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import SeriesCardContent from './SeriesCardContent';

export default function PopularList({ seriesList, handleSeriesClick }) {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ display: 'inline-block', width: '150px', padding: '0 10px', position: 'relative', verticalAlign: 'top' }} key={seriesItem.ID}>
          {seriesItem.Hot && <div style={{
            position: 'absolute',
            top: 0,
            left: 10,
            backgroundColor: 'red',
            color: 'white',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1,
            borderRadius: '6px'
          }}>
            HOT
          </div>}
          <Card style={{ backgroundColor: '#112', color: 'white' }}>
            <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
              <CardMedia
                component="img"
                style={{  width: '100%', height: '200px' }}
                image={seriesItem.BaseURL + '/image.jpg'}
                alt={seriesItem.Name}
              />
              <SeriesCardContent name={seriesItem.Name} />
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}
