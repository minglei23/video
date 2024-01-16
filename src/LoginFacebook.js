import React, { useState, useContext } from 'react';
import { Button, Grid } from '@mui/material';
import FacebookLogin from 'react-facebook-login';
import { cologin } from './service';
import { UserContext } from './index.js'
import { SetUser } from './cache';

const LoginFacebook = ({referral}) => {
  const [showFacebookLogin, setShowFacebookLogin] = useState(false);
  const { setUser } = useContext(UserContext);

  const responseFacebook = async (response) => {
    if (!response.userID || !response.accessToken) {
      console.error('facebook response error');
      return
    }
    try {
      const userData = await cologin(response.userID, response.accessToken, 2, response.name, referral);
      setUser(userData);
      SetUser(userData);
    } catch (error) {
      console.error('facebook login failed:', error);
    }
  }

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
          autoLoad={false}
          callback={responseFacebook}
          disableMobileRedirect={true}
        />
      )}
    </Grid>
  );
};

export default LoginFacebook;
