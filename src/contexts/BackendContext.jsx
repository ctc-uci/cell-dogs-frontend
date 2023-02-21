import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const baseURL =
  process.env.NODE_ENV === 'development' ? `http://localhost:3001` : `some-production-url`;

const BackendContext = React.createContext();

export function useBackend() {
  return useContext(BackendContext);
}

export function BackendProvider({ children }) {
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
      let token = '';
      if (currentUser) {
        // get token from firebase if there's a current user

        token = await currentUser?.getIdToken();
        // eslint-disable-next-line
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  backend.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // import 404 redirection from utils.jsx here
      if (error?.response?.status === 404) {
        navigate('*');
      }

      return Promise.reject(error.response);
    },
  );

  const value = { backend };

  return <BackendContext.Provider value={value}>{children}</BackendContext.Provider>;
}
