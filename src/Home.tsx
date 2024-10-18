import React from 'react';
import { Typography, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Welcome to the Homepage!
      </Typography>
      <Typography variant="h6">
        You are now logged in.
      </Typography>
    </Container>
  );
};

export default Home;
