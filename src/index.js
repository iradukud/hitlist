import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
//stylesheets
import './index.css';
//components
import App from './App';
//constext
import { MissionsContextProvider } from './context/MissionContext';
import { AuthContextProvider } from './context/AuthContext';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

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