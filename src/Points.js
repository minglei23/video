import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GetPoints } from './service.js';

const Points = ({ user }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const points = await GetPoints(user.ID);
      setPoints(points);
    };

    loadData();
  }, [user.ID]);

  const handleCheckin = async () => {
    console.log('go to rewards')
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center" spacing={2} marginBottom={"30px"}>
        <Grid item>
          <AccountCircleIcon style={{ color: '#fa0', fontSize: '3rem' }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.Email}</Typography>
        </Grid>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          <MonetizationOnIcon style={{ color: '#fa0' }} />
          <Typography variant="h6" style={{ color: '#fa0', marginLeft: '5px', marginRight: '20px' }}>{points}</Typography>
          <Button variant="contained" onClick={handleCheckin} style={{ backgroundColor: '#fa0', color: '#000', fontSize: '0.8rem', padding: '3px 6px' }}>
            Rewards
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Points;
