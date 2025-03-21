import "./global.css";
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <AppContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterBy={setUserToFilterBy}
        />
      </Router>
    </ThemeProvider>
  );
};

const AppContent: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
  setUserToFilterBy: (user: User | undefined) => void;
  userToFilterBy: User | undefined;
}> = ({ toggleTheme, isDarkMode, userToFilterBy, setUserToFilterBy }) => {
  const locationRoute = useLocation();

  const isAuthPage =
    locationRoute.pathname === ENDPOINTS.LOGIN ||
    locationRoute.pathname === ENDPOINTS.REGISTER;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isAuthPage && (
        <>
          <div style={{ height: "5vh", flexShrink: 0, marginBottom: "2vh" }}>
            <Navbar
              toggleTheme={toggleTheme}
              isDarkMode={isDarkMode}
              setUserToFilterBy={setUserToFilterBy}
            />
          </div>
        </>
      )}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <MainContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterBy={setUserToFilterBy}
        />
      </div>
    </div>
  );
};

const MainContent: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
  setUserToFilterBy: (user: User | undefined) => void;
  userToFilterBy: User | undefined;
}> = ({ userToFilterBy, setUserToFilterBy }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
  );
};

export default App;
