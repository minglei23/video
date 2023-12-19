import React from 'react';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SeriesCardContent from './SeriesCardContent';

export default function TrendingList({ seriesList, handleSeriesClick }) {
  const getBackgroundColor = (index) => {
    switch (index) {
      case 0: return '#fa0';
      case 1: return '#999';
      default: return '#c73';
    }
  };

  const formatViews = (index) => {
    return (100 * Math.exp(-0.3 * index - 1)).toFixed(2) + 'k';
  };

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {seriesList.map((seriesItem, i) => (
        <div style={{ display: 'inline-block', width: '140px', padding: '0 10px', position: 'relative' }} key={seriesItem.id}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 10,
            backgroundColor: getBackgroundColor(i),
            color: 'white',
            padding: '4px 8px',
            fontSize: '15px',
            fontWeight: 'bold',
            zIndex: 1,
            borderRadius: '0 6px 6px 6px'
          }}>
            {i + 1}
          </div>
          <Card style={{ backgroundColor: '#111', color: 'white' }}>
            <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
              <CardMedia
                component="img"
                height="190"
                image={seriesItem.BaseURL + '/image.jpg'}
                alt={seriesItem.Name}
              />
              <SeriesCardContent name={seriesItem.Name} />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocalFireDepartmentIcon style={{ color: '#f30', fontSize: '1.5em', marginRight: '5px' }} />
                <span>{formatViews(i)}</span>
              </div>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}
