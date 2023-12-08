import React, { useEffect, useContext } from 'react';
import { Container, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Points from './Points';
import { UserContext } from './index.js'
import { GetUser } from './cache';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = GetUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const navigateToHistory = () => {
    navigate('/history');
  };

  const navigateToFavorites = () => {
    navigate('/favorites');
  };

  const renderUserProfile = () => (
    <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '92vh', paddingBottom: '60px'}}>
      <Points user={user} />
      <Grid container direction="column" alignItems="center" spacing={2}>
        {!user.Activated && (
          <Grid item>
            <Button variant="outlined" style={{ width: '200px', color: '#fff', borderColor: '#a70' }}>
              Verify Email
            </Button>
          </Grid>
        )}
        {!user.VIP && (
          <Grid item>
            <Button variant="outlined" style={{ width: '200px', color: '#fff', borderColor: '#a70' }}>
              Become VIP
            </Button>
          </Grid>
        )}
        {
          <Grid item>
            <Button variant="outlined" onClick={navigateToHistory} style={{ width: '200px', color: '#fff', borderColor: '#a70' }}>
              History
            </Button>
          </Grid>
        }
        {
          <Grid item>
            <Button variant="outlined" onClick={navigateToFavorites} style={{ width: '200px', color: '#fff', borderColor: '#a70' }}>
              Favorites
            </Button>
          </Grid>
        }
      </Grid>
    </Container>
  );

  return <div>{user ? renderUserProfile() : <Login />}</div>;
};

export default Profile;
