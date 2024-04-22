import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import AuthForm from './AuthForm';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';
import { gotologin, gotosignup, orcontinuewith } from './word';
import { decodeID } from './vtt';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');

  const [referral, setReferral] = useState(0);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  useEffect(() => {
    const storedReferral = localStorage.getItem("referral");
    if (storedReferral) {
      setReferral(decodeID(storedReferral))
    }
  }, []);

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '92vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={6}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <AuthForm isLogin={isLoginView} setError={setError} referral={referral} />
          <Grid container justifyContent="center" style={{ marginTop: 20 }}>
            <Button variant="outlined" onClick={toggleView} style={{ color: '#f35', borderColor: '#f35', width: '94%', borderRadius: '12px' }}>
              {isLoginView ? gotosignup() : gotologin()}
            </Button>
          </Grid>
          {error && (
            <Snackbar
              open={Boolean(error)}
              autoHideDuration={6000}
              onClose={() => setError('')}
              message={error}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
          )}
          <Typography variant="body2" style={{ margin: '30px 0 15px 0', color: '#777' }}>
            {orcontinuewith()}
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <LoginGoogle referral={referral} />
            <LoginFacebook referral={referral} />
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
