import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n'; // Import i18n configuration
import './styles/fonts.css'; // Import custom fonts
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
