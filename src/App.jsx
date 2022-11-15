import React from 'react';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
