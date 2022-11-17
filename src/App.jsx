import React from 'react';
// import logo from './logo.svg';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Forgot from './pages/Forgot';
import Dogs from './pages/Dogs';
import AddDog from './pages/AddDog';
import Facilities from './pages/Facilities';

const App = () => {
  const location = useLocation();
  return (
    <div>
      {/* <Header /> */}
      <Switch key={location.pathname} location={location}>
        <Route path="/login" render={() => <Home />} />
        <Route path="/forgot" render={() => <Forgot />} />
        <Route path="/dogs" render={() => <Dogs />} />
        <Route path="/dogs/new" render={() => <AddDog />} />
        <Route path="/facilities" render={() => <Facilities />} />
        <Route path="*" render={() => ''} />
      </Switch>
    </div>
  );
};

export default App;
