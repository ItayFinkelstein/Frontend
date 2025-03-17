import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import UserPage from "./UserPage";
import { User } from "./types/User";
import { users } from "./SharedData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [actualUser, setActualUser] = useState<User | undefined>(users[1]);

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
          setActualUser={setActualUser}
        />
      </Router>
    </ThemeProvider>
  );
};

const MainContent: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
  setActualUser: (user: User | undefined) => void;
  actualUser: User | undefined;
}> = ({ toggleTheme, isDarkMode, setActualUser, actualUser }) => {
  const location = useLocation();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          actualUser={actualUser}
          setActualUser={setActualUser}
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
                  actualUser={actualUser}
                  setActualUser={setActualUser}
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
