import React from 'react';
import { CardContent } from '@mui/material';

export default function SeriesCardContent({ name }) {
  return (
    <CardContent style={{
      padding: '0px',
      height: '4.5em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <h3 style={{
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textAlign: 'left',
        margin: '0'
      }}>
        {name}
      </h3>
    </CardContent>
  );
}
