import React, { useState, useContext } from 'react';
import { Button, Typography, Container, Box, TextField } from '@mui/material';
import { login, register } from './service';
import { UserContext } from './index.js';

const Profile = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoginView) {
      try {
        const userData = await login(email, password);
        setUser(userData); // 更新用户状态
      } catch (error) {
        console.error('登录失败:', error);
      }
    } else {
      try {
        const userData = await register(email, password);
        setUser(userData); // 更新用户状态
      } catch (error) {
        console.error('注册失败:', error);
      }
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView); // 切换视图
  };

  const renderLoginForm = () => {
    return (
      <Container>
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h5">{isLoginView ? 'Login' : 'Sign Up'}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: '20px' }}
            >
              {isLoginView ? 'Login' : 'Sign Up'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleView}
            >
              {isLoginView ? 'Go to Sign Up' : 'Go to Login'}
            </Button>
          </form>
        </Box>
      </Container>
    );
  };

  const renderUserProfile = () => {
    return (
      <Container>
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h5">Welcome, {user.Email}</Typography>
        </Box>
      </Container>
    );
  };

  return (
    <div>
      {user ? renderUserProfile() : renderLoginForm()}
    </div>
  );
};

export default Profile;
