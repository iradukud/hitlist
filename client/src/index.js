import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MissionsContextProvider } from './context/MissionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MissionsContextProvider>
      <App />
    </MissionsContextProvider>
  </React.StrictMode>
);