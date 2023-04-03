import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
import ViewMore from './components/FacilitiesPageViewMore/ViewMore';

// Utils
import { AuthProvider } from './contexts/AuthContext';
import { BackendProvider } from './contexts/BackendContext';
import ProtectedRoute from './util/ProtectedRoute/ProtectedRoute';

// Styles/Theme
import CDSTheme from './styles/theme';
import './common/global.css';
import Users from './pages/Users';

const DISALLOWED_NAVBAR_PATHS = ['/login', '/forgot-password', '/reset-password', '/404'];

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <BackendProvider>
        <ChakraProvider theme={CDSTheme}>
          {!DISALLOWED_NAVBAR_PATHS.includes(location.pathname) && <Navbar />}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<ProtectedRoute Component={Dogs} redirectPath="/login" />} />
            <Route
              path="/dogs/new"
              element={<ProtectedRoute Component={AddDog} redirectPath="/login" />}
            />
            <Route
              path="/facilities"
              element={<ProtectedRoute Component={Facilities} redirectPath="/login" />}
            />
            <Route
              path="/add-facility"
              element={<ProtectedRoute Component={AddFacility} redirectPath="/login" />}
            />
            <Route
              path="/users"
              element={<ProtectedRoute Component={Users} redirectPath="/login" />}
            />
            <Route path="view-more" element={<ViewMore />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ChakraProvider>
      </BackendProvider>
    </AuthProvider>
  );
};

export default App;
