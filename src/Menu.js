import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const noop = () => {}
const Menu = (props) => {
  const {onChangeMenu} = props;

  const navigate = useNavigate();

 const handleClick = (key, pathname) => {
  if(!onChangeMenu) {
      navigate(pathname)
    return
  }
  new Promise((resolve) => {
    onChangeMenu(key, resolve)
  }).then(() => {
    navigate(pathname)
  })
    
    // console.log(pathname);
    
 }
  return (
    <BottomNavigation showLabels style={{ height: '8vh', width: '100%', backgroundColor: '#111', color: 'white', borderTop: 'none', boxShadow: 'none', zIndex: 9999 }}>
      <BottomNavigationAction label="Home" style={{ color: 'white' }} icon={<HomeIcon />} onClick={() => handleClick(1, '/home')}/>
      <BottomNavigationAction label="Recommend" style={{ color: 'white' }} icon={<PlayCircleOutlineIcon />}  onClick={() => handleClick(2, '/recommend')}/>
      <BottomNavigationAction label="Profile" style={{ color: 'white' }} icon={<PersonOutlineIcon />}  onClick={() => handleClick(3, '/profile')}/>
    </BottomNavigation>)
};

export default Menu;
