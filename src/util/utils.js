import { useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';

// See auth_utils for AuthInterceptor
const CDSBackend = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACKEND_HOST
      : process.env.REACT_APP_BACKEND_HOST_PROD,
  withCredentials: true,
});

const screenWidthExceeds = size => useMediaQuery(`(min-width: ${size}px)`)[0];

const possibleDogTags = {
  service: {
    display: 'Service',
    color: '#48BB78',
  },
  therapy: {
    display: 'Therapy',
    color: '#4299E1',
  },
  specialNeeds: {
    display: 'Special Needs',
    color: '#ED8936',
  },
  staffAdoptions: {
    display: 'Staff Adoptions',
    color: '#21307A',
  },
  deceased: {
    display: 'Deceased',
    color: '#C53030',
  },
};

// eslint-disable-next-line import/prefer-default-export
export { CDSBackend, possibleDogTags, screenWidthExceeds };
