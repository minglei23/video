import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { GetPoints, GetIfChecked, Checkin } from './service.js';
import { SetUserVIP } from './cache.js';
import { dailybonus, topup } from './word.js';

const Points = ({ user }) => {
  const [points, setPoints] = useState(0);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      const response = await GetPoints(user.ID);
      const checked = await GetIfChecked(user.ID);
      if (!user.VIP && response.VIP) {
        SetUserVIP()
      }
      setPoints(response.Points);
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
      <Grid container direction="column" alignItems="center" spacing={2} marginBottom={"30px"} marginTop={"30px"}>
        <Grid item>
          <AccountCircleIcon style={{ color: '#fa5', fontSize: '3rem' }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.Email}</Typography>
        </Grid>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          <MonetizationOnIcon style={{ color: '#fa5' }} />
          <Typography variant="h6" style={{ color: '#fa5', marginLeft: '5px', marginRight: '20px' }}>{points}</Typography>
          {!checked && <Button variant="contained" onClick={handleCheckin} style={{ backgroundColor: '#fa5', color: '#000', fontSize: '0.8rem', padding: '3px 6px' }}>
            {dailybonus()}
          </Button>}
          <Button variant="contained" onClick={() => {navigate('/store')}} style={{ backgroundColor: '#fa5', color: '#000', marginLeft: '10px',  fontSize: '0.8rem', padding: '3px 6px' }}>
            {topup()}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Points;
