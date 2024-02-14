import React, { useState, useEffect, useContext } from 'react';
import { Button, Paper, Container, Typography, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GetDistribution } from './service';
import { GetUser } from './cache';
import { UserContext } from './index.js';
import Login from './Login';
import DistributionList from './DistributionList.js';

export default function Distribution() {
  const [list, setList] = useState([]);
  const [filteredlist, setFilteredlist] = useState([]);
  const [link, setLink] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchDistribution = async () => {
      if (!user) {
        const storedUser = GetUser();
        setUser(storedUser);
      }
      if (user) {
        setLink(`https://realshort.tv/referral/${user.ID}`);
        try {
          const response = await GetDistribution(user.ID);
          setList(response);
        } catch (error) {
          console.error('Error fetching distribution:', error);
        }
      }
    };
    fetchDistribution();
  }, [user, setUser]);

  useEffect(() => {
    const filtered = list.filter(item => {
      const itemDate = new Date(item.Date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });
    setFilteredlist(filtered);
  }, [list, fromDate, toDate]);

  const handleWithdrawClick = (email) => {
    console.log('Withdraw');
  };

  const renderDistribution = () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" style={{ backgroundColor: 'white', height: '100vh', padding: '20px' }}>
        <Paper style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2" style={{ textAlign: 'left' }}>
              {user.Email}
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'left' }}>
              Invitation Link: {link}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWithdrawClick}
          >
            Withdraw
          </Button>
        </Paper>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To"
            value={toDate}
            onChange={(newValue) => {
              setToDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <DistributionList filteredlist={filteredlist} />
      </Container>
    </LocalizationProvider>
  );

  return <div>{user ? renderDistribution() : <Login />}</div>;
}
