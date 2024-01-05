import React, { useEffect, useContext } from 'react';
import { Button, Grid } from '@mui/material';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { cologin } from './service';
import { UserContext } from './index.js'
import { SetUser } from './cache';

const LoginGoogle = () => {
  const clientId = "493751355482-fb7ivmgcvirq81f3jg8gkf2p7d8ak5ol.apps.googleusercontent.com";
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile'
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const responseGoogle = async (response) => {
    if (!response || !response.profileObj || !response.accessToken) {
      console.error('google response error');
      return
    }
    try {
      const userData = await cologin(response.profileObj.googleId, response.accessToken, 1, response.profileObj.email);
      setUser(userData);
      SetUser(userData);
    } catch (error) {
      console.error('google login failed:', error);
    }
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
