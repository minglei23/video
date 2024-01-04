import React, { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

const LoginGoogle = () => {

  const clientId = "493751355482-fb7ivmgcvirq81f3jg8gkf2p7d8ak5ol.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const responseGoogle = (response) => {
    console.log('google', response);
  }

  return (
    <Grid item>
      <GoogleLogin
        clientId={clientId}
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
