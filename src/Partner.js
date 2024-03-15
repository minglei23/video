import React, { useState, createContext, useEffect } from 'react';
import { Button, Paper, Container, Typography, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GetPartnerList, InviteDistributor } from './service';
import { GetPartner } from './cache';
import PartnerLogin from './PartnerLogin';
import PartnerList from './PartnerList.js';

const PartnerContext = createContext();

export default function Partner() {
  const [partner, setPartner] = useState(null);
  const [list, setList] = useState([]);
  const [filteredlist, setFilteredlist] = useState([]);
  const [email, setEmail] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [balance, setBalance] = useState(0);
  const [start, setStart] = useState(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchPartner = async () => {
      if (!partner) {
        const storedPartner = GetPartner();
        setPartner(storedPartner);
      }
      if (partner) {
        try {
          const l = await GetPartnerList(partner.ID);
          if (l) {
            const a = l.reduce(function (sum, item) {
              return sum + (item.Spend * item.Commission);
            }, 0);
            const s = new Date(partner.Time)
            setList(l);
            setAmount(a);
            setWithdraw(0);
            setBalance(a);
            setStart(s);
          }
        } catch (error) {
          console.error('Error fetching partner:', error);
        }
      }
    };
    fetchPartner();
  }, [partner, setPartner]);

  useEffect(() => {
    const filtered = list.filter(item => {
      const itemDate = new Date(item.Date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });
    setFilteredlist(filtered);
  }, [list, fromDate, toDate]);

  const handleClick = async () => {
    if (email && email.includes('@')) {
      console.log(email);
      try {
        const r = await InviteDistributor(email, partner.ID);
      } catch (error) {
        console.error('Error invite distributor:', error);
      }
    }
  };

  const renderPartner = () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" style={{ backgroundColor: 'white', height: '100vh', padding: '20px' }}>
        <Paper style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" style={{ textAlign: 'left', fontWeight: 'bold' }}>
              {partner.Email}
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
            <Typography variant="body1" style={{ textAlign: 'left', marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Total:</span> <span style={{ color: '#26c' }}>{amount.toFixed(2)}</span>
              <span style={{ fontWeight: 'bold' }}> Withdraw:</span> <span style={{ color: '#26c' }}>{withdraw.toFixed(2)}</span>
              <span style={{ fontWeight: 'bold' }}> Balance:</span> <span style={{ color: '#26c' }}>{balance.toFixed(2)}</span>
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'left', marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Your commission:</span> <span style={{ color: '#26c' }}>20% </span>
              <span style={{ fontWeight: 'bold' }}>Your distrubutor commission:</span> <span style={{ color: '#26c' }}>20%</span>
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Invite
          </Button>
        </Paper>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue);
            }}
            minDate={start}
            maxDate={today}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To"
            value={toDate}
            onChange={(newValue) => {
              if (newValue) {
                const adjustedDate = new Date(newValue);
                adjustedDate.setHours(23, 59, 59, 999);
                setToDate(adjustedDate);
              } else {
                setToDate(null);
              }
            }}
            minDate={fromDate || start}
            maxDate={today}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <PartnerList filteredlist={filteredlist} />
      </Container>
    </LocalizationProvider>
  );

  return (
    <PartnerContext.Provider value={{ partner, setPartner }}>
      {partner ? renderPartner() : <PartnerLogin />}
    </PartnerContext.Provider>
  )
}

export { PartnerContext };
