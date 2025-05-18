import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, theme as antdTheme, Typography, Button } from 'antd';
import MainLayout from './layouts/MainLayout.jsx';
import Login from './features/Auth/pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Shifts from './features/ShiftManagement/pages/Shifts.jsx';
import CreateShift from './features/ShiftManagement/pages/Create.jsx';
import useThemeStore from './store/themeStore.js';
import './App.css';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#646cff',
          borderRadius: 8,
        },
        components: {
          Layout: {
            bodyBg: isDarkMode ? '#242525' : '#f0f2f5',
            headerBg: isDarkMode ? '#1f1f1f' : '#fff',
            siderBg: '#001529',
          },
          Menu: {
            darkItemBg: '#001529',
            darkItemSelectedBg: '#1890ff',
          },
        },
      }}
    >
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
              index
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
            <Route path='shifts' element={<Shifts />} />
            <Route path='shifts/create' element={<CreateShift />} />
            <Route path='profile' element={<div>Profile (Coming Soon)</div>} />
          </Route>

          {/* Catch all route */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
