import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { GetPoints, GetIfChecked, Checkin } from './service.js'

const Points = ({ user }) => {
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
          <Typography variant="h5">Welcome, {user.Email}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Your Points: {points}</Typography>
        </Grid>
        <Grid item style={{ marginBottom: '20px' }}>
          <Button variant="contained" onClick={handleCheckin} disabled={checked} style={{ width: '200px' }}>
            {checked ? 'Already Checked-in' : 'Check-in Today'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Points;
