import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ShiftForm from './features/ShiftManagement/components/ShiftForm.jsx';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path='/' element={<ShiftForm />} />
          <Route
            path='/shifts'
            element={<div>Shifts List (Coming Soon)</div>}
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
