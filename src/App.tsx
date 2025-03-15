import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './Navbar';
import Home from './pages/Home';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <MainContent toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </Router>
    </ThemeProvider>
  );
};

const MainContent: React.FC<{ toggleTheme: () => void; isDarkMode: boolean }> = ({ toggleTheme, isDarkMode }) => {

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div style={{ flex: 1, height: '100%', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;