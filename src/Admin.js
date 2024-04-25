import React, { useState, createContext, useEffect } from 'react';
import { Button, Paper, Container, Typography, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GetHistoryList, GetUserList, InvitePartner } from './service';
import { GetAdmin } from './cache';
import AdminLogin from './AdminLogin';
import EmailModal from './EmailModal';

const AdminContext = createContext();

export default function Admin() {
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");
  const [lastSentEmail, setLastSentEmail] = useState("");
  const [emailSendOpen, setEmailSendOpen] = useState(false);
  const [emailSend, setEmailSend] = useState("");

  const [userList, setUserList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!admin) {
        const storedAdmin = GetAdmin();
        setAdmin(storedAdmin);
      }
    };
    fetchAdmin();
  }, [admin, setAdmin]);

  const handleClick = async () => {
    setEmailSendOpen(true);
    setEmailSend("Server is sending the email.");
    if (email && email.includes('@') && email !== lastSentEmail) {
      setLastSentEmail(email);
      try {
        const code = await InvitePartner(email);
        if (code == 1) {
          setEmailSend("Server successfully sent the invitation email!");
        } else {
          setEmailSend("Server failed to send the email.");
        }
      } catch (error) {
        console.error('Error invite distributor:', error);
        setEmailSend("Server failed to send the email.");
      }
    } else {
      if (email && email.includes('@')) {
        setEmailSend("Server cannot send the email repeatedly.");
      } else {
        setEmailSend("The email address is incorrect.");
      }
    }
  };

  const handleUserClick = async () => {
    const users = await GetUserList();
    if (users) {
      setUserList(users)
    }
  };

  const handleHisotryClick = async () => {
    const histories = await GetHistoryList();
    if (histories) {
      setHistoryList(histories)
    }
  };

  const renderAdmin = () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" style={{ backgroundColor: 'white', height: '100vh', padding: '20px' }}>
        <Paper style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" style={{ textAlign: 'left', fontWeight: 'bold' }}>
              Admin
            </Typography>
            <TextField
              label="email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '50%', borderRadius: '6px' }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Invite
          </Button>
        </Paper>
      </Container>
      <EmailModal open={emailSendOpen} onClose={() => setEmailSendOpen(false)} message={emailSend} />
    </LocalizationProvider>
  );

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {admin ? renderAdmin() : <AdminLogin />}
    </AdminContext.Provider>
  )
}

export { AdminContext };
