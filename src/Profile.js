import React, { useState, useContext, useEffect } from 'react';
import { Typography, Container, Box, Button, Modal, Grid, List, ListItem, ListItemText } from '@mui/material';
import { UserContext } from './index.js';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { GetLikeList, GetWatchList } from './service.js'; // 确保已经正确导入这两个函数

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleOpenVerifyModal = () => {
    setOpenVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const handleHistoryClick = async () => {
    const response = await GetWatchList(user.ID);
    setHistoryList(response.VideoList);
    setOpenHistoryModal(true);
  };

  const handleFavoritesClick = async () => {
    const response = await GetLikeList(user.ID);
    setFavoritesList(response.VideoList);
    setOpenFavoritesModal(true);
  };

  const renderVerifyEmailModal = () => {
    return (
      <Modal
        open={openVerifyModal}
        onClose={handleCloseVerifyModal}
        aria-labelledby="verify-email-modal-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 250, maxHeight: '90vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
          <Typography id="verify-email-modal-title" variant="h6" component="h2">
            Please Verify Your Email
          </Typography>
          <Button onClick={handleOpenVerifyModal} style={{ marginTop: 20 }}>
            Verify Email
          </Button>
        </Box>
      </Modal>
    );
  };

  const renderListModal = (open, handleClose, list, title) => (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="list-modal-title"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: '90vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, }}>
        <Typography id="list-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <List>
          {list.map((item) => (
            <ListItem key={item.ID} secondaryAction={
              <Button onClick={() => navigate(`/player/${item.ID}/0`)}>
                Watch
              </Button>
            }>
              <ListItemText primary={item.Name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );

  const renderUserProfile = () => {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">Welcome, {user.Email}</Typography>
          </Grid>
          {!user.Activated && (
            <Grid item>
              <Button variant="contained" style={{ width: '200px' }}>
                Verify Email
              </Button>
            </Grid>
          )}
          {!user.VIP && (
            <Grid item>
              <Button variant="contained" onClick={handleOpenVerifyModal} style={{ width: '200px' }}>
                Become VIP
              </Button>
            </Grid>
          )}
          {user.Activated && (
            <Grid item>
              <Button variant="outlined" onClick={handleHistoryClick} style={{ width: '200px' }}>
                History
              </Button>
            </Grid>
          )}
          {user.Activated && (
            <Grid item>
              <Button variant="outlined" onClick={handleFavoritesClick} style={{ width: '200px' }}>
                Favorites
              </Button>
            </Grid>
          )}
        </Grid>
        {renderVerifyEmailModal()}
        {renderListModal(openHistoryModal, () => setOpenHistoryModal(false), historyList, 'History')}
        {renderListModal(openFavoritesModal, () => setOpenFavoritesModal(false), favoritesList, 'Favorites')}
      </Container>
    );
  };

  return (
    <div>
      {user ? renderUserProfile() : <Login />}
    </div>
  );
};

export default Profile;
