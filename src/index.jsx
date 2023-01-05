import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
