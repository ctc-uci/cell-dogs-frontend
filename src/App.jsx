import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Home from './pages/Home/Home';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dogs from './pages/Dogs/Dogs';
import AddDog from './pages/AddDog/AddDog';
import Facilities from './pages/Facilities/Facilities';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import './App.css';
import './common/global.css';

const App = () => {
  return (
    <CookiesProvider>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Dogs />} />
          <Route path="/dogs/new" element={<AddDog />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
};

export default App;
