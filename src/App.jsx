import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <LoginPage />
      </ChakraProvider>
      <div className="routes">
        <Switch>
          <Route path="/login-page" element={<LoginPage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
