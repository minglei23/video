import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';
import { GetHistory } from './cache';

export default function FavoritesRows({ seriesList, handleSeriesClick }) {
  const numberOfPlaceholders = (3 - (seriesList.length % 3)) % 3;
  const toAddOn = (seriesItem) => {
    const history = GetHistory(seriesItem.ID);
    if (history) {
      return `EP.${history} / EP.${seriesItem.TotalNumber}`;
    }
    return `EP.1 / EP.${seriesItem.TotalNumber}`;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0 10px' }}>
      {seriesList.map((seriesItem) => (
        <div style={{ flex: '1 0 calc(33% - 10px)', maxWidth: 'calc(33% - 10px)', margin: '0 5px' }} key={seriesItem.id}>
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
              <CardContent style={{ padding: '0' }}>
                <h5 style={{
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  textAlign: 'left',
                  margin: '0'
                }}>{seriesItem.Name}</h5>
                <h5 style={{ margin: '5px 0', lineHeight: '1.2', color: '#aaa' }}>{toAddOn(seriesItem)}</h5>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
      {[...Array(numberOfPlaceholders)].map((_, index) => (
        <div key={`placeholder-${index}`} style={{ flex: '1 0 calc(33% - 10px)', maxWidth: 'calc(33% - 10px)', margin: '0 5px', visibility: 'hidden' }}></div>
      ))}
    </div>
  );
}
