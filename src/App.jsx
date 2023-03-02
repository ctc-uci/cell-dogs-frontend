import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ChakraProvider } from '@chakra-ui/react';

// Pages & Components
// import Home from './pages/Home/Home';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Dogs from './pages/Dogs/Dogs';
import AddDog from './pages/AddDog/AddDog';
import Facilities from './pages/Facilities/Facilities';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoginPage from './pages/Login/LoginPage';
import Navbar from './components/Navbar/Navbar';
import AddFacility from './components/AddFacility/AddFacility';

// Utils
import { AuthProvider } from './contexts/AuthContext';
import { BackendProvider } from './contexts/BackendContext';

// Styles/Theme
import CDSTheme from './styles/theme';
import './common/global.css';

const App = () => {
  return (
    <AuthProvider>
      <BackendProvider>
        <ChakraProvider theme={CDSTheme}>
          <CookiesProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Dogs />
                  </>
                }
              />
              <Route
                path="/dogs/new"
                element={
                  <>
                    <Navbar />
                    <AddDog />
                  </>
                }
              />
              <Route
                path="/facilities"
                element={
                  <>
                    <Navbar />
                    <Facilities />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <ErrorPage />
                  </>
                }
              />
              <Route
                path="/add-facility"
                element={
                  <>
                    <Navbar />
                    <AddFacility />
                  </>
                }
              />
            </Routes>
          </CookiesProvider>
        </ChakraProvider>
      </BackendProvider>
    </AuthProvider>
  );
};

export default App;
