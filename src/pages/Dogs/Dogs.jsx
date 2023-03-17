import { React, useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
// import Location from '../../components/Location';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { useBackend } from '../../contexts/BackendContext';
import AdoptionLog from './AdoptionLog';

const Dogs = () => {
  // const { currentUser, logout } = useAuth();
  // const { logout } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   navigate('/login');
  // };

  const { backend } = useBackend();
  const [data, setData] = useState([]);

  const getFacilities = async () => {
    try {
      const res = await backend.get('/facility');
      setData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

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
      {/* <AdoptionLogFunctionalities></AdoptionLogFunctionalities> */}
      {data.map(facility => (
        <AdoptionLog key={facility.name} tableName={facility.name} />
      ))}
      {/* <p>This is the Dog Table page</p>
      <strong>User email/username:</strong>
      {currentUser.email}
      <Button variant="link" onClick={handleLogout}>
        Log out
      </Button>
      <Location /> */}
    </div>
  );
};
export default Dogs;
