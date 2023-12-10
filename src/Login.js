import React, { useState } from 'react';
import { Button, Typography, Container, Box, Grid, Snackbar } from '@mui/material';
import AuthForm from './AuthForm';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '92vh' }}>
        <Box textAlign="center" marginTop={8}>
          <Typography variant="h5" margin={"25px"}>{isLoginView ? 'Login' : 'Sign Up'}</Typography>
          <AuthForm isLogin={isLoginView} setError={setError} />
          <Grid container justifyContent="center" style={{ marginTop: 20 }}>
            <Button variant="outlined" onClick={toggleView} style={{ width: '200px', color: '#fff', borderColor: '#d80' }}>
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
          <Typography variant="body2" style={{ margin: '50px 0px 10px 20px', textAlign: 'left' }}>
            or continue with
          </Typography>
          <Grid container spacing={2} style={{ marginLeft: '5px'}}>
            <Grid item>
              <img src="/image/google.png" alt="Google" style={{ width: '40px', height: '40px' }} />
            </Grid>
            <Grid item>
              <img src="/image/facebook.png" alt="Facebook" style={{ width: '40px', height: '40px' }} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
