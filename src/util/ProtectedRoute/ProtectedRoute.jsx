import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { useAuth } from '../../contexts/AuthContext';

import styles from './ProtectedRoute.module.css';

/**
 * Protects a route from unauthenticated users
 * @param {Component} children The component the user is trying to access
 * @param {string} redirectPath The path to redirect the user to if they're not logged in
 * @param {Array} roles A list of roles that are allowed to access the route
 * @param {Cookies} cookies The user's current cookies
 * @returns The relevant path to redirect the user to depending on authentication state.
 */
const ProtectedRoute = ({ Component, redirectPath }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('currentUser', currentUser);
    setIsAuthenticated(currentUser !== null);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return isAuthenticated ? <Component /> : <Navigate to={redirectPath} />;
};

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

export default ProtectedRoute;
