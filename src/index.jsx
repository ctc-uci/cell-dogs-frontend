import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/provider';
import ChakraTheme from './common/ChakraTheme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
