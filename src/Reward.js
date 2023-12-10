import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GetPoints, GetIfChecked, Checkin } from './service.js';

const Reward = ({ user }) => {
  const [points, setPoints] = useState(0);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const points = await GetPoints(user.ID);
      const checked = await GetIfChecked(user.ID);
      setPoints(points);
      setChecked(checked);
    };

    loadData();
  }, [user.ID]);

  const handleCheckin = async () => {
    if (!checked) {
      const newPoints = await Checkin(user.ID);
      setPoints(newPoints);
      setChecked(true);
    }
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.Email}</Typography>
        </Grid>
        <Grid item>
          <MonetizationOnIcon />
          <Typography variant="h6">{points}</Typography>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={handleCheckin} 
            disabled={checked} 
            style={{ 
              width: '200px', 
              backgroundColor: checked ? '#000' : '#d80',
              color: checked ? '#d80' : '#fff',
            }}
          >
            {checked ? 'Already Checked-in' : 'Check-in Today'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reward;
