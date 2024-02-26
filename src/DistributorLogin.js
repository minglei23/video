import React, { useState } from 'react';
import { Button, Container, Box, Grid, Snackbar } from '@mui/material';
import DistributorAuthForm from './DistributorAuthForm';
import { gotologin, gotosignup } from './word';

const DistributorLogin = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  return (
    <div style={{ backgroundImage: 'url("/image/login.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
        <Box textAlign="center" marginTop={8}>
          <img src="/image/RealShort.png" alt="RealShort" style={{ width: '150px', display: 'block', margin: 'auto' }} />
          <DistributorAuthForm isLogin={isLoginView} setError={setError} />
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
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default DistributorLogin;
