import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { name, password });
      if (response.data.success) {
        setError('');
        // Redirect to home page after successful login
        window.location.href = '/home';
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during authentication.');
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;