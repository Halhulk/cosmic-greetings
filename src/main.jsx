import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import GreetingCard from './pages/GreetingCard';
import './i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/greeting/:planetId" element={<GreetingCard />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);