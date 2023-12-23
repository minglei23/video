import React from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Help = () => {
  const navigate = useNavigate();

  return(
    <div>
        <NavBar title={'Help'} onBack={()=>{navigate('/profile')}}/>
      <Container style={{ display: 'flex', flexDirection: 'column', height: '92vh'}}>
        <List>
          <ListItem onClick={() => {navigate('/termsofService')}}>
            <ListItemText primary="Terms of Service" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
          <ListItem onClick={() =>{navigate('/privacyPolicy')}}>
            <ListItemText primary="Privacy Policy" />
            <ArrowForwardIosIcon style={{ width: '15px' }} />
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default Help;
