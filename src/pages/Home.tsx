import React from 'react';
import { Typography, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1">
        Home Page
      </Typography>
      <Typography variant="body1">
        Welcome to MyApp, the best social media app!
      </Typography>
    </Container>
  );
};

export default Home;