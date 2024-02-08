import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';

export default function SeriesRows({ seriesList, handleSeriesClick }) {
  const isOdd = seriesList.length % 2 !== 0;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0 10px' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ flex: '1 0 calc(50% - 10px)', maxWidth: 'calc(50% - 10px)', margin: '0 5px', position: 'relative' }} key={seriesItem.ID}>
          {seriesItem.Hot && <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'red',
            color: 'white',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 2,
            borderRadius: '6px'
          }}>
            HOT
          </div>}
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
              <CardContent style={{ padding: '5px' }}>
                <h5 style={{
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textAlign: 'left',
                  margin: '0',
                  fontSize: '0.9em'
                }}>{seriesItem.Name}</h5>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
      {isOdd && <div style={{ flex: '1 0 calc(50% - 10px)', maxWidth: 'calc(50% - 10px)', margin: '0 5px', visibility: 'hidden' }}></div>}
    </div>
  );
}
