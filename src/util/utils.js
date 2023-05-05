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

const isNumeric = (value, errorMessage) => {
  if (!/^\d+$/.test(value)) {
    throw new Error(errorMessage);
  }
};

const isBoolean = (value, errorMessage) => {
  if (![true, false, 'true', 'false'].includes(value)) {
    throw new Error(errorMessage);
  }
};

const isZipCode = (value, errorMessage) => {
  if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
    throw new Error(errorMessage);
  }
};

const isAlphaNumeric = (value, errorMessage) => {
  if (!/^[0-9a-zA-Z]+$/.test(value)) {
    throw new Error(errorMessage);
  }
};

const isPhoneNumber = (value, errorMessage) => {
  if (!/^\d+$/.test(value) || value.length > 15) {
    throw new Error(errorMessage);
  }
};
const isISODate = str => {
  try {
    const ISOString = str.toISOString();
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(ISOString)) return false;
    const d = new Date(ISOString);
    return d.toISOString() === ISOString;
  } catch (err) {
    return false;
  }
};

const isDate = str => {
  try {
    const ISOString = str.toISOString();
    console.log('hellooooo');
    console.log(str(ISOString));
    //!/\d{4}-\d{2}-\d{2}/.test(ISOString)
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(ISOString)) return false;
    const d = new Date(ISOString);
    return d.toISOString() === ISOString;
  } catch (err) {
    return false;
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  CDSBackend,
  screenWidthExceeds,
  isNumeric,
  isBoolean,
  isZipCode,
  isAlphaNumeric,
  isPhoneNumber,
  isISODate,
  isDate,
};
