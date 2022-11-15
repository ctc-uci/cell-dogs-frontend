import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdoptionLog from './pages/AdoptionLog';
import Facilities from './pages/Facilities';
import Users from './pages/Users';

function App() {
  return (
    <div>
      <Navbar />
      <div className="routes">
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/adoption-log" element={<AdoptionLog />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/users" element={<Users />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
