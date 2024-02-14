import React, { useState, useEffect, useContext } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Typography } from "@mui/material";
import { GetDistribution } from './service';
import { GetUser } from './cache';
import { UserContext } from './index.js';
import Login from './Login';

export default function Distribution() {
  const [list, setList] = useState([]);
  const [link, setLink] = useState("");
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

  const handleWithdrawClick = (email) => {
    console.log('Withdraw');
  };

  const renderDistribution = () => (
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Spend</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Commission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list && list.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.UserID}</TableCell>
              <TableCell>${item.Spend}</TableCell>
              <TableCell>{item.Date}</TableCell>
              <TableCell>{item.Commission * 100}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );

  return <div>{user ? renderDistribution() : <Login />}</div>;
}
