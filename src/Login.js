import React, { useState } from 'react';
import { Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import AuthForm from './AuthForm';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');

  const referral = 0;

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '92vh' }}>
        <Box textAlign="center" marginTop={8}>
          <Typography variant="h5" margin={"25px"}>{isLoginView ? 'Login' : 'Sign Up'}</Typography>
          <AuthForm isLogin={isLoginView} setError={setError} referral={referral} />
          <Grid container justifyContent="center" style={{ marginTop: 20 }}>
            <Button variant="outlined" onClick={toggleView} style={{ width: '200px', color: '#fff', borderColor: '#fa0' }}>
              {isLoginView ? 'Go to Sign Up' : 'Go to Login'}
            </Button>
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

export default Login;
