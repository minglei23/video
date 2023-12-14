import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function TrendingList({ seriesList, handleSeriesClick }) {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {seriesList.map((seriesItem, i) => (
        <div style={{ display: 'inline-block', width: '150px', padding: '0 10px', position: 'relative' }} key={seriesItem.id}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 10,
            backgroundColor: '#fa0',
            color: 'white',
            padding: '4px 8px',
            fontSize: '15px',
            fontWeight: 'bold',
            zIndex: 1,
            borderRadius: '0 6px'
          }}>
            {i+1}
          </div>
          <Card style={{ backgroundColor: '#111', color: 'white' }}>
            <CardActionArea onClick={() => handleSeriesClick(seriesItem)}>
              <CardMedia
                component="img"
                height="200"
                image={seriesItem.BaseURL + '/image.jpg'}
                alt={seriesItem.Name}
              />
              <CardContent style={{ padding: '0px' }}>
                <h3>{seriesItem.Name}</h3>
                <LocalFireDepartmentIcon style={{ color: '#f30', fontSize: '1.5em' }} />
                <h3>3.45k</h3>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}