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
        scope: 'profile'
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const responseGoogle = (response) => {
    const googleId = response.profileObj.googleId;
    const accessToken = response.accessToken;
    console.log(`Google ID: ${googleId}`);
    console.log(`Access Token: ${accessToken}`);
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
