import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { WbSunny, Brightness2 } from "@mui/icons-material";
import UserIcon from "./UserIcon";
import { User } from "./types/User";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  actualUser: User | undefined;
  setUserToFilterBy: (user: User | undefined) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  isDarkMode,
  actualUser,
  setUserToFilterBy,
}) => {
  console.log("actualUser1", actualUser);
  const actions = [
    {
      type: "view",
      action: () => setUserToFilterBy(actualUser),
    },
    {
      type: "logout",
      action: () => console.log(actualUser),
    },
  ];

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TastyTalks
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Feed
        </Button>
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{ marginRight: 2 }}
        >
          {isDarkMode ? <WbSunny /> : <Brightness2 />}
        </IconButton>
        <UserIcon
          user={actualUser}
          style={{ marginLeft: "auto" }}
          actions={actions}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
