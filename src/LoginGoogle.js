import React from 'react';
import { Button, Grid } from '@mui/material';
import GoogleLogin from 'react-google-login';

const LoginGoogle = () => {
  const responseGoogle = (response) => {
    console.log('google', response);
  }

  return (
    <Grid item>
      <GoogleLogin
        clientId="YOUR_CLIENT_ID"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img src="/image/google.png" alt="Google" style={{ width: '45px', height: '45px' }} />
          </Button>
        )}
      />
    </Grid>
  );
};

export default LoginGoogle;
