import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import FacebookLogin from 'react-facebook-login';

const LoginFacebook = () => {
  const [showFacebookLogin, setShowFacebookLogin] = useState(false);

  const responseFacebook = (response) => {
    console.log('facebook', response);
    if (response.accessToken && response.userID) {
      console.log('User ID:', response.userID);
      console.log('Access Token:', response.accessToken);
    } else {
      console.log('User did not fully authorize.');
    }
  };

  const handleFacebookLoginClick = () => {
    setShowFacebookLogin(true);
  };

  return (
    <Grid item>
      {!showFacebookLogin &&
        <Button onClick={handleFacebookLoginClick}>
          <img src="/image/facebook.png" alt="Facebook" style={{ width: '45px', height: '45px' }} />
        </Button>
      }
      {showFacebookLogin && (
        <FacebookLogin
          appId="616758257243323"
          autoLoad={true}
          callback={responseFacebook}
        />
      )}
    </Grid>
  );
};

export default LoginFacebook;
