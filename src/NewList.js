import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import SeriesCardContent from './SeriesCardContent';

export default function NewList({ seriesList, handleSeriesClick }) {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ display: 'inline-block', width: '150px', padding: '0 10px', position: 'relative' }} key={seriesItem.id}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 10,
            backgroundColor: 'green',
            color: 'white',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1,
            borderRadius: '0 6px 6px 6px'
          }}>
            New
          </div>
          <Card style={{ backgroundColor: '#101015', color: 'white' }}>
            <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
              <CardMedia
                component="img"
                height="200"
                image={seriesItem.BaseURL + '/image.jpg'}
                alt={seriesItem.Name}
              />
              <SeriesCardContent name={seriesItem.Name}/>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}
