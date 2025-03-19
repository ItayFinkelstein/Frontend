import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Navbar from "./Navbar";
import UserPage from "./UserPage";
import { User } from "./types/User";
import { ENDPOINTS } from "./endpoints";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /** todo: change */

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
  setUserToFilterBy: (user: User | undefined) => void;
  userToFilterBy: User | undefined;
}> = ({ toggleTheme, isDarkMode, userToFilterBy, setUserToFilterBy }) => {
  const locationRoute = useLocation();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {locationRoute.pathname !== ENDPOINTS.LOGIN &&
        locationRoute.pathname !== ENDPOINTS.REGISTER && (
          <Navbar
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            setUserToFilterBy={setUserToFilterBy}
          />
        )}

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
              <ProtectedRoute>
                <UserPage
                  userToFilterBy={userToFilterBy}
                  setUserToFilterBy={setUserToFilterBy}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
