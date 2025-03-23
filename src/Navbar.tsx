import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WbSunny, Brightness2 } from "@mui/icons-material";
import UserIcon from "./pages/user/UserIcon";
import { User } from "./types/User";
import { logout } from "./http-connections/authService";
import { ENDPOINTS } from "./endpoints";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  setUserToFilterBy: (user: User | undefined) => void;
  actualUser: User | undefined;
  setActualUser: (user: User | undefined) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  isDarkMode,
  setUserToFilterBy,
  actualUser,
  setActualUser,
}) => {
  const navigate = useNavigate();

  const actions = [
    {
      type: "view",
      action: () => setUserToFilterBy(actualUser),
    },
    {
      type: "logout",
      action: () =>
        logout(() => {
          setActualUser(undefined);
          navigate(ENDPOINTS.LOGIN);
        }),
    },
  ];

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Box
          component="img"
          src="/src/assets/logo_with_name.svg"
          alt="InstaBurger Logo"
          sx={{ height: "60px" }}
        />
        <Box sx={{ flexGrow: 1 }} />
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
