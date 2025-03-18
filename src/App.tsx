import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Navbar from "./Navbar";
import UserPage from "./UserPage";
import { User } from "./types/User";
import useUsers from "./data_hooks/useUsers";

const App: React.FC = () => {
  const users = useUsers().users;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [actualUser, setActualUser] = useState<User | undefined>(undefined);
  /** todo: change */
  useEffect(() => {
    if (users.length > 0) {
      setActualUser(users[1]);
    }
  }, [users]);
  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <MainContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          actualUser={actualUser}
          userToFilterBy={userToFilterBy}
          setUserToFilterBy={setUserToFilterBy}
        />
      </Router>
    </ThemeProvider>
  );
};

const MainContent: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
  userToFilterBy: User | undefined;
  setUserToFilterBy: (user: User | undefined) => void;
  actualUser: User | undefined;
}> = ({
  toggleTheme,
  isDarkMode,
  actualUser,
  userToFilterBy,
  setUserToFilterBy,
}) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        actualUser={actualUser}
        setUserToFilterBy={setUserToFilterBy}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <UserPage
                actualUser={actualUser}
                userToFilterBy={userToFilterBy}
                setUserToFilterBy={setUserToFilterBy}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
