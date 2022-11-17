import React from 'react';
import { useLocation } from 'react-router-dom';

function Location() {
  const location = useLocation();

  return <div>{location.pathname}</div>;
}

export default Location;
