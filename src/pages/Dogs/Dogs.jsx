import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Location from '../../components/Location';

import { useAuth } from '../../contexts/AuthContext';

const Dogs = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <p>This is the Dog Table page</p>
      <strong>User email/username:</strong>
      {currentUser.email}
      <Button variant="link" onClick={handleLogout}>
        Log out
      </Button>
      <Location />
    </div>
  );
};
export default Dogs;
