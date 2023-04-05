import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MissionsContextProvider } from './context/MissionContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MissionsContextProvider>
        <App />
      </MissionsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);