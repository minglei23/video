import React, { useState, createContext, useEffect } from 'react';
import { Button, Paper, Container, Typography, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GetDistribution } from './service';
import { GetDistributor } from './cache';
import DistributorLogin from './DistributorLogin';
import DistributionList from './DistributionList.js';
import QRCode from 'react-qr-code';
import { encodeID } from './vtt.js';

export default function Distribution() {
  const [distributor, setDistributor] = useState(null);
  const [list, setList] = useState([]);
  const [filteredlist, setFilteredlist] = useState([]);
  const [link, setLink] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [balance, setBalance] = useState(0);
  const [start, setStart] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchDistribution = async () => {
      if (!distributor) {
        const storedDistributor = GetDistributor();
        setDistributor(storedDistributor);
      }
      if (distributor) {
        setLink(`https://dev.realshort.tv/referral/${encodeID(distributor.ID)}`);
        try {
          const l = await GetDistribution(distributor.ID);
          if (l) {
            const a = l.reduce(function (sum, item) {
              return sum + (item.Spend * item.Commission);
            }, 0);
            const s = new Date(distributor.Time)
            setList(l);
            setAmount(a);
            setWithdraw(0);
            setBalance(a);
            setStart(s);
          }
        } catch (error) {
          console.error('Error fetching distribution:', error);
        }
      }
    };
    fetchDistribution();
  }, [distributor, setDistributor, refresh, setRefresh]);

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
            <Typography variant="h6" component="h2" style={{ textAlign: 'left', fontWeight: 'bold' }}>
              {distributor.Email}
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'left', fontWeight: 'bold' }}>
              Invitation Link: <span style={{ color: '#26c' }}>{link}</span>
              <div style={{ margin: '10px' }}>
                <QRCode value={link} size={64} level={"H"} />
              </div>
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold' }}>Total:</span> <span style={{ color: '#26c' }}>{amount.toFixed(2)}</span>,
              <span style={{ fontWeight: 'bold' }}> Withdraw:</span> <span style={{ color: '#26c' }}>{withdraw.toFixed(2)}</span>,
              <span style={{ fontWeight: 'bold' }}> Balance:</span> <span style={{ color: '#26c' }}>{balance.toFixed(2)}</span>
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
        <DistributionList filteredlist={filteredlist} />
      </Container>
    </LocalizationProvider>
  );
  return <div>{distributor ? renderDistribution() : <DistributorLogin refresh={refresh} setRefresh={setRefresh}/>}</div>;
}
