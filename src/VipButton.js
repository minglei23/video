import React from 'react';
import { Button } from '@mui/material';

const VipButton = ({ click, words }) => {

  return (
    <>
      <Button onClick={click}
        style={{
          margin: '10px 20px',
          display: 'flex',
          alignItems: 'stretch',
          border: '2px solid #c70',
          borderRadius: '10px',
          padding: 0,
        }}
      >
        <div
          style={{
            width: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '45px',
          }}
        >
          <h4 style={{ margin: '0', color: '#fff'}}>
            {words}
          </h4>
        </div>
        <div
          style={{
            width: '30%',
            backgroundColor: '#c70',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '0 5px 5px 0',
            height: '45px',
          }}
        >
          <h3 style={{ margin: '0', color: '#fff' }}>
            25 Coins
          </h3>
        </div>
      </Button>
    </>
  );
};

export default VipButton;
