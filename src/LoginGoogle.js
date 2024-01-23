import React, { useEffect, useContext, useState } from 'react';
import { Button, Grid } from '@mui/material';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { cologin } from './service';
import { UserContext } from './index.js'
import { SetUser } from './cache';

const LoginGoogle = ({ referral }) => {
  const clientId = "493751355482-fb7ivmgcvirq81f3jg8gkf2p7d8ak5ol.apps.googleusercontent.com";
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');

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
      setError(response);
      return
    }
    try {
      const userData = await cologin(response.profileObj.googleId, response.accessToken, 1, response.profileObj.email, referral);
      setUser(userData);
      SetUser(userData);
    } catch (error) {
      console.error('google login failed:', error);
      setError(error);
    }
  }

  return (
    <Grid item>
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
