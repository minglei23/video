import React, { useEffect, useContext } from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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

  const renderUserProfile = () => (
    <div>
      <Container style={{ display: 'flex', flexDirection: 'column', height: '92vh'}}>
        <Points user={user} />
        <List>
          {!user.Activated && (
            <ListItem onClick={() => console.log('Verify Email')}>
              <EmailIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Verify Email" />
            </ListItem>
          )}
          {!user.VIP && (
            <ListItem onClick={() => console.log('Become VIP')}>
              <StarIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Become VIP" />
            </ListItem>
          )}
          <ListItem onClick={() => navigateTo('/history')}>
            <HistoryIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="History" />
          </ListItem>
          <ListItem onClick={() => navigateTo('/favorites')}>
            <FavoriteIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem onClick={() => console.log('Settings')}>
            <SettingsIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem onClick={() => console.log('Help')}>
            <HelpIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem onClick={() => console.log('Sign Out')}>
            <ExitToAppIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Container>
    </div>
  );

  return <div>{user ? renderUserProfile() : <Login />}</div>;
};

export default Profile;
