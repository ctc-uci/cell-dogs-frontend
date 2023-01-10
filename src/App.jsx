import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import CDSTheme from './styles/theme.ts';

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={CDSTheme}>
        <div className="routes">
          <Switch>
            <Route path="/login-page" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
