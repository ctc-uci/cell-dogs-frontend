import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home/Home';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dogs from './pages/Dogs/Dogs';
import AddDog from './pages/AddDog/AddDog';
import Facilities from './pages/Facilities/Facilities';

const App = () => {
  const location = useLocation();
  return (
    <>
      {/* <Header /> */}
      <Routes key={location.pathname} location={location}>
        <Route path="/login" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* TODO: link 404 page when merged */}
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/new" element={<AddDog />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="*" element="" />
      </Routes>
    </>
  );
};

export default App;
