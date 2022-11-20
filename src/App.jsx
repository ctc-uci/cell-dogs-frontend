import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home/Home';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dogs from './pages/Dogs/Dogs';
import AddDog from './pages/AddDog/AddDog';
import Facilities from './pages/Facilities/Facilities';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Dogs />} />
      <Route path="/dogs/new" element={<AddDog />} />
      <Route path="/facilities" element={<Facilities />} />
      {/* TODO: replace element with 404 page */}
      <Route path="*" element="" />
    </Routes>
  );
};

export default App;
