import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { name, password });
      if (response.data.success) {
        setError('');
        // Redirect to login page after successful registration
        window.location.href = '/login';
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Register
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Registration;
