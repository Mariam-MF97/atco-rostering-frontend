import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import MainLayout from './layouts/MainLayout.jsx';
import Login from './features/Auth/pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ListShifts from './features/planning/shifts/pages/ListShifts.jsx';
import CreateShift from './features/planning/shifts/pages/CreateShift.jsx';
import ViewShift from './features/planning/shifts/pages/ViewShift.jsx';
import EditShift from './features/planning/shifts/pages/EditShift.jsx';
import useThemeStore from './store/themeStore.js';
import { lightTheme, darkTheme } from './theme';
import './App.css';

function App() {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path='/login' element={<Login />} />

            {/* Protected routes */}
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route
                element={
                  <div
                    style={{
                      textAlign: 'center',
                      marginTop: 64,
                      fontSize: 24,
                    }}
                  >
                    Dashboard is empty
                  </div>
                }
              />
              <Route path='shifts' element={<ListShifts />} />
              <Route path='shifts/create' element={<CreateShift />} />
              <Route path='shifts/:id' element={<ViewShift />} />
              <Route path='shifts/:id/edit' element={<EditShift />} />
              <Route
                path='profile'
                element={<div>Profile (Coming Soon)</div>}
              />
            </Route>

            {/* Catch all route */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
