import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? `${process.env.VITE_BACKEND_HOST}:${process.env.VITE_BACKEND_PORT}`
    : process.env.VITE_BACKEND_PROD_HOST;

const BackendContext = createContext();
const useBackend = () => useContext(BackendContext);

const BackendProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const backend = axios.create({
    baseURL,
    withCredentials: false,
  });

  // all requests will be sent with the token now!
  // then in the backend we can verify the token and get the user data
  // or if the token is invalid we can send a 401 response
  // no need to do anything on the backend

  backend.interceptors.request.use(
    async config => {
      if (currentUser) {
        // get token from firebase if there's a current user
        const token = await currentUser?.getIdToken();
        // eslint-disable-next-line
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  backend.interceptors.response.use(
    response => response,
    error => {
      // import 404 redirection from utils.jsx here
      if (error?.response?.status === 404) {
        navigate('*');
      }
      return Promise.reject(error.response);
    },
  );

  return <BackendContext.Provider value={{ backend }}>{children}</BackendContext.Provider>;
};

export { BackendProvider, useBackend };
