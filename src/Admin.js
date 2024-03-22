import React, { useState, createContext, useEffect } from 'react';
import { Paper, Container, Typography } from "@mui/material";
import { GetAdminToken } from './cache';
import AdminLogin from './AdminLogin.js';

const AdminContext = createContext();

export default function Admin() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!admin) {
        const token = GetAdminToken();
        setAdmin(token);
      }
    };
    fetchAdmin();
  }, [admin, setAdmin]);

  const renderAdmin = () => (
    <Container maxWidth="lg" style={{ backgroundColor: 'white', height: '100vh', padding: '20px' }}>
      <Paper style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2" style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {admin}
          </Typography>
        </div>
      </Paper>
    </Container>
  );

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {admin ? renderAdmin() : <AdminLogin />}
    </AdminContext.Provider>
  )
}

export { AdminContext };
