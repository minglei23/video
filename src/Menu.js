import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { home, profile, recommend } from './word';

const Menu = (props) => {
  const { onChangeMenu } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleClick = (key, pathname) => {
    if (!onChangeMenu) {
      navigate(pathname);
      return;
    }
    new Promise((resolve) => {
      onChangeMenu(key, resolve);
    }).then(() => {
      navigate(pathname);
    });
  };

  return (
    <BottomNavigation
      showLabels
      value={currentPath}
      style={{
        height: '8vh',
        width: '100%',
        backgroundColor: '#101015',
        color: 'white',
        borderTop: 'none',
        boxShadow: 'none',
        zIndex: 9999,
        position: 'fixed',
        bottom: 0,
      }}
    >
      <BottomNavigationAction
        label={home()}
        style={{ color: currentPath === '/home' ? '#f35' : 'white' }}
        icon={<HomeIcon />}
        onClick={() => handleClick(1, '/home')}
      />
      <BottomNavigationAction
        label={recommend()}
        style={{ color: currentPath === '/recommend' ? '#f35' : 'white' }}
        icon={<PlayCircleOutlineIcon />}
        onClick={() => handleClick(2, '/recommend')}
      />
      <BottomNavigationAction
        label={profile()}
        style={{ color: currentPath === '/profile' ? '#f35' : 'white' }}
        icon={<PersonOutlineIcon />}
        onClick={() => handleClick(3, '/profile')}
      />
    </BottomNavigation>
  );
};

export default Menu;
