import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EA8224',
    },
    secondary: {
      main: '#FAA51A',
    },
    background: {
      default: '#F8EDE3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#23211D',
    },

  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#EA8224',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'inherit',
          },
          '&:active': {
            color: 'inherit',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#F1C618',
          },
          '&:active': {
            color: '#F1C618',
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#EA8224',
    },
    secondary: {
      main: '#FAA51A',
    },
    background: {
      default: '#23211D',
      paper: '#23211D',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#23211D',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#23211D',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#EA8224',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'inherit',
          },
          '&:active': {
            color: 'inherit',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#F1C618',
          },
          '&:active': {
            color: '#F1C618',
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
