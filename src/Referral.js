import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import AuthForm from './AuthForm';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';
import { UserContext } from './index.js';
import { GetUser } from './cache';

const Referral = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState('');
  const { referralId } = useParams();
  const [referral, setReferral] = useState(0);

  useEffect(() => {
    setReferral(parseInt(referralId))
    const storedUser = GetUser();
    if (user || storedUser) {
      navigate('/profile')
    }
  }, [referralId, setUser]);

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box textAlign="center" marginTop={8}>
          <Typography variant="h5" margin={"25px"}>{'Referral'}</Typography>
          <AuthForm isLogin={false} setError={setError} referral={referral} />
          <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          </Grid>
          {error && (
            <Snackbar
              open={Boolean(error)}
              autoHideDuration={6000}
              onClose={() => setError('')}
              message={error}
            />
          )}
          <Typography variant="body2" style={{ margin: '50px 0px 5px 15px', textAlign: 'left' }}>
            or continue with
          </Typography>
          <Grid container >
            <LoginGoogle referral={referral} />
            <LoginFacebook referral={referral} />
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Referral;
