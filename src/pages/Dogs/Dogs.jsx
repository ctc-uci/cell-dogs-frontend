import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Location from '../../components/Location';
import { useAuth } from '../../contexts/AuthContext';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { AddIcon } from '@chakra-ui/icons';

const Dogs = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };


  return (
    <div>
      <div className="breadcrumbAndAdd">
        <BreadcrumbBar left="Adoption Log">
          <div className="addDogButton">
            <Button 
              leftIcon={<AddIcon />} 
              size="sm" 
              onClick={() => {
                navigate('/dogs/new');
              }}
            >
              Add Dog
            </Button>
          </div>
        </BreadcrumbBar>
      </div>
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
