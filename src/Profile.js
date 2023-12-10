import React, { useEffect, useContext } from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Points from './Points';
import { UserContext } from './index.js';
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

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    // Add sign out logic here
    console.log('Signing out...');
  };

  const renderUserProfile = () => (
    <div>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '92vh' }}>
        <Points user={user} />
        <List>
          {!user.Activated && (
            <ListItem button onClick={() => console.log('Verify Email')}>
              <ListItemText primary="Verify Email" />
            </ListItem>
          )}
          {!user.VIP && (
            <ListItem button onClick={() => console.log('Become VIP')}>
              <ListItemText primary="Become VIP" />
            </ListItem>
          )}
          <ListItem button onClick={() => navigateTo('/history')}>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem button onClick={() => navigateTo('/favorites')}>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem button onClick={() => console.log('Settings')}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => console.log('Help')}>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem button onClick={handleSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Container>
    </div>
  );

  return <div>{user ? renderUserProfile() : <Login />}</div>;
};

export default Profile;
