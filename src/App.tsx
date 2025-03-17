import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './Navbar';
import UserPage from './UserPage';
import { User } from './types/User';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(undefined);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <MainContent toggleTheme={toggleTheme} isDarkMode={isDarkMode} setUserToFilterBy={setUserToFilterBy} userToFilterBy={userToFilterBy}/>
      </Router>
    </ThemeProvider>
  );
};

const MainContent: React.FC<{ toggleTheme: () => void; isDarkMode: boolean; setUserToFilterBy: (user: User | undefined) => void; userToFilterBy: User | undefined }> = ({ toggleTheme, isDarkMode, setUserToFilterBy, userToFilterBy }) => {
  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} setUserToFilterBy={setUserToFilterBy} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Routes>
        <Route path="/" element={<UserPage userToFilterBy={userToFilterBy} setUserToFilterBy={setUserToFilterBy} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;