import React, { useState, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { adminlogin } from './service';
import { AdminContext } from './Admin.js'
import { SetAdmin } from './cache';
import { emailWord, loginword, passwordWord } from './word.js';

const AdminAuthForm = ({ setError }) => {
  const { setAdmin } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return false;
    }
    if (!email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const Admin = await adminlogin(email, password);
      setAdmin(Admin);
      SetAdmin(Admin);
    } catch (error) {
      setError(error.message);
      console.error('login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
      <TextField
        label={emailWord()}
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <TextField
        label={passwordWord()}
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ style: { color: '#fff' } }}
        InputProps={{ style: { color: '#fff' } }}
        style={{ width: '94%', height: '45px', backgroundColor: 'rgba(100, 100, 100, 0.5)', borderRadius: '6px' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{
          marginTop: 50,
          color: '#fff',
          width: '94%',
          backgroundColor: '#f35',
          borderRadius: '12px'
        }}
      >
        {loginword()}
      </Button>
    </form>
  );
};

export default AdminAuthForm;
