import React from 'react';
import { Box, Button, Grid, TextField, Link } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<GoogleIcon />}
        sx={{ mt: 1, mb: 2 }}
      >
        Login with Google
      </Button>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to="/register" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;