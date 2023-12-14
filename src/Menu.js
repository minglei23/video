import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Menu = () => {
  return (
    <BottomNavigation showLabels style={{ position: 'fixed', bottom: 0, height: '8vh', width: '100%', backgroundColor: '#111', color: 'white', borderTop: 'none', boxShadow: 'none', zIndex: 10 }}>
      <BottomNavigationAction label="Home" style={{ color: 'white' }} icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="Recommend" style={{ color: 'white' }} icon={<PlayCircleOutlineIcon />} component={Link} to="/recommend" />
      <BottomNavigationAction label="Profile" style={{ color: 'white' }} icon={<PersonOutlineIcon />} component={Link} to="/profile" />
    </BottomNavigation>)
};

export default Menu;
