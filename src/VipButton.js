import React from 'react';
import { Button } from '@mui/material';

const VipButton = ({ url, border, color, content1, content2, content3 }) => {
  return (
    <Button onClick={() => {
      window.open(url, "_blank");
    }}
      style={{
        margin: '10px 20px',
        display: 'flex',
        alignItems: 'stretch',
        border: border,
        borderRadius: '10px',
        padding: 0,
      }}
    >
      <div
        style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <h4 style={{ margin: '8px 0 0 0', color: '#fff', lineHeight: '1.2' }}>
          {content1}
        </h4>
        <h5 style={{ margin: '0', color: color, lineHeight: '1.2' }}>
          {content2}
        </h5>
      </div>
      <div
        style={{
          width: '30%',
          backgroundColor: color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '0 5px 5px 0',
          height: '45px',
        }}
      >
        <h3 style={{ margin: '0', color: '#fff' }}>
          {content3}
        </h3>
      </div>
    </Button>
  );
};

export default VipButton;
