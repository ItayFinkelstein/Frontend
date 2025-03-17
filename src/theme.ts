import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#C1272D', // Deep Tomato Red
        },
        secondary: {
            main: '#FFB400', // Amber Gold
        },
        background: {
            default: '#F8EDE3', // Toasted Beige
            paper: '#ffffff',
        },
        text: {
            primary: '#2C2C2C', // Charcoal Black
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F9F1E8', // Lighter shade of Toasted Beige
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // Keep TextField white
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#C1272D',
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
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8A1B23', // Dark Crimson
        },
        secondary: {
            main: '#FF9F00', // Warm Amber
        },
        background: {
            default: '#2C2C2C', // Dark Charcoal
            paper: '#2C2C2C',
        },
        text: {
            primary: '#E0E0E0', // Light Gray
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2C2C2C', // Dark Charcoal
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2C2C2C', // Dark Charcoal
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8A1B23',
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
    },
});

export { lightTheme, darkTheme };