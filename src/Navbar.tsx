import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { WbSunny, Brightness2 } from '@mui/icons-material';
import UserIcon from './UserIcon';
import { users } from './SharedData';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const actualUser = users[1]; // for now

  const actions = [
    {
      type: 'login',
      action: () => console.log('LOGIN'),
    },
    {
      type: 'logout',
      action: () => console.log('LOGOUT'),
    },
  ];

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TastyTalks
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <WbSunny /> : <Brightness2 />}
        </IconButton>
        <UserIcon
          user={actualUser}
          style={{ marginLeft: 'auto' }}
          actions={actions}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;