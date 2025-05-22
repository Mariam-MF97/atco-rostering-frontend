import { createTheme } from '@mui/material/styles';

// Common theme settings
const commonSettings = {
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          fontWeight: 600,
          // Light theme defaults, will be overridden below
        },
        previousNext: {
          color: '#515B92',
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#646cff',
    },
    background: {
      default: '#F6F6F6',
      paper: '#fff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  components: {
    ...commonSettings.components,
    MuiPaginationItem: {
      styleOverrides: {
        ...commonSettings.components.MuiPaginationItem.styleOverrides,
        root: {
          ...commonSettings.components.MuiPaginationItem.styleOverrides.root,
          color: '#23232B',
          '&.Mui-selected': {
            background: '#515B92',
            color: '#fff',
            borderRadius: '4px',
            '&:hover': {
              background: '#515B92',
              color: '#fff',
            },
          },
        },
        previousNext: {
          color: '#515B92',
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#646cff',
    },
    background: {
      default: '#1F1F25',
      paper: '#1e1e1e',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  components: {
    ...commonSettings.components,
    MuiPaginationItem: {
      styleOverrides: {
        ...commonSettings.components.MuiPaginationItem.styleOverrides,
        root: {
          ...commonSettings.components.MuiPaginationItem.styleOverrides.root,
          color: '#fff',
          '&.Mui-selected': {
            background: '#CFB1FF',
            color: '#000',
            borderRadius: '4px',
            '&:hover': {
              background: '#CFB1FF',
              color: '#000',
            },
          },
        },
        previousNext: {
          color: '#CFB1FF',
        },
      },
    },
  },
});
