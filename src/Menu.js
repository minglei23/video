import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { home, profile, recommend } from './word';

const Menu = (props) => {
  const { onChangeMenu } = props;

  const navigate = useNavigate();

  const handleClick = (key, pathname) => {
    if (!onChangeMenu) {
      navigate(pathname)
      return
    }
    new Promise((resolve) => {
      onChangeMenu(key, resolve)
    }).then(() => {
      navigate(pathname)
    })
  }
  return (
    <BottomNavigation showLabels style={{
      height: '8vh',
      width: '100%',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(16, 16, 32, 0.75)',
      color: 'white',
      borderTop: 'none',
      boxShadow: 'none',
      zIndex: 9999,
      position: 'fixed',
      bottom: 0
    }}>
      <BottomNavigationAction label={home()} style={{ color: 'white' }} icon={<HomeIcon />} onClick={() => handleClick(1, '/home')} />
      <BottomNavigationAction label={recommend()} style={{ color: 'white' }} icon={<PlayCircleOutlineIcon />} onClick={() => handleClick(2, '/recommend')} />
      <BottomNavigationAction label={profile()} style={{ color: 'white' }} icon={<PersonOutlineIcon />} onClick={() => handleClick(3, '/profile')} />
    </BottomNavigation>)
};

export default Menu;
