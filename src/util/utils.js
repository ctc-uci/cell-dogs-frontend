import axios from 'axios';
import { useMediaQuery } from '@chakra-ui/react';

// See auth_utils for AuthInterceptor
const CDSBackend = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACKEND_HOST
      : process.env.REACT_APP_BACKEND_HOST_PROD,
  withCredentials: true,
});

const screenWidthExceeds = size => useMediaQuery(`(min-width: ${size}px)`)[0];

// eslint-disable-next-line import/prefer-default-export
export { CDSBackend, screenWidthExceeds };
