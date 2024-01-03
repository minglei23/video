import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import FacebookLogin from 'react-facebook-login';

const LoginFacebook = () => {
  const [showFacebookLogin, setShowFacebookLogin] = useState(false);

  const responseFacebook = (response) => {
    console.log('facebook', response);
  }

  const componentClicked = () => {
    console.log('Facebook button clicked');
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
          appId="YOUR_APP_ID"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
      )}
    </Grid>
  );
};

export default LoginFacebook;
