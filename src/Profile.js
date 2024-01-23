import React, { useEffect, useContext } from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

  const signOut = () => {
    setUser(null);
    localStorage.clear();
  }

  const renderUserProfile = () => (
    <div>
      <Container style={{ display: 'flex', flexDirection: 'column', height: '92vh' }}>
        <Points user={user} />
        <List>
          {!user.VIP && (
            <ListItem onClick={() => { navigate('/store') }}>
              <MonetizationOnIcon style={{ marginRight: '10px' }} />
              <ListItemText primary="Get Coins" />
              <ArrowForwardIosIcon style={{ width: '15px' }} />
            </ListItem>
          )}
          <ListItem onClick={() => navigateTo('/history')}>
            <HistoryIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="History" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
          <ListItem onClick={() => navigateTo('/favorites')}>
            <StarIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Favorites" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
          {/* <ListItem onClick={() => console.log('Settings')}>
            <SettingsIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Settings" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem> */}
          <ListItem onClick={() => navigateTo('/help')}>
            <HelpIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Help" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
          <ListItem onClick={signOut}>
            <ExitToAppIcon style={{ marginRight: '10px' }} />
            <ListItemText primary="Sign Out" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
        </List>
      </Container>
    </div>
  );

  return <div>{user ? renderUserProfile() : <Login />}</div>;
};

export default Profile;
