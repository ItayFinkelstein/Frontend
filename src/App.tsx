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
import usePosts from "./data_hooks/usePosts";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fetchUserPosts = usePosts().loadNextUserPostsPage;

  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );

  function setUserToFilterByFunc(newUser: User | undefined) {
    console.log("****************");
    console.trace("set user", newUser);
    console.log("userToFilterBy", userToFilterBy);
    console.log("****************");
    if (newUser !== undefined && newUser._id !== userToFilterBy?._id) {
      console.log("CONDITION", newUser._id);
      fetchUserPosts(newUser._id);
    }
    console.log("REACHED HERE");
    // console.log("user state", userPostsState.posts);
    setUserToFilterBy(newUser);
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
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
          setUserToFilterByFunc={setUserToFilterByFunc}
        />
      </Router>
    </ThemeProvider>
  );
};

const AppContent: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
  setUserToFilterByFunc: (user: User | undefined) => void;
  userToFilterBy: User | undefined;
}> = ({ toggleTheme, isDarkMode, userToFilterBy, setUserToFilterByFunc }) => {
  const locationRoute = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {locationRoute.pathname !== ENDPOINTS.LOGIN &&
        locationRoute.pathname !== ENDPOINTS.REGISTER && (
          <div style={{ height: "5vh", flexShrink: 0 }}>
            <Navbar
              toggleTheme={toggleTheme}
              isDarkMode={isDarkMode}
              setUserToFilterBy={setUserToFilterByFunc}
            />
          </div>
        )}
      <div style={{ height: "10vh" }} />{" "}
      {/* Add spacing between Navbar and MainContent */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <MainContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterByFunc={setUserToFilterByFunc}
        />
      </div>
    </div>
  );
};

const MainContent: React.FC<{
  toggleTheme: () => void;
  isDarkMode: boolean;
  setUserToFilterByFunc: (user: User | undefined) => void;
  userToFilterBy: User | undefined;
}> = ({ userToFilterBy, setUserToFilterByFunc }) => {
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
                setUserToFilterBy={setUserToFilterByFunc}
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
