import { React, useState, useEffect } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
// eslint-disable-next-line import/no-useless-path-segments
import AdoptionLogNavbar from './AdoptionLogNavbar';
import { useBackend } from '../../contexts/BackendContext';
import AdoptionLog from './AdoptionLog';
import AdoptionLogCard from './AdoptionLogCard';
import { screenWidthExceeds } from '../../util/utils';

const Dogs = () => {
  // const { currentUser, logout } = useAuth();
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const isLargerThan768 = screenWidthExceeds(768);

  // const handleLogout = async () => {
  //   await logout();
  //   navigate('/login');
  // };
  const [view, setView] = useState('table');
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const [dogs, setDogs] = useState([]);

  const getFacilities = async () => {
    try {
      const res = await backend.get('/facility');
      setData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getDogs = async () => {
    try {
      const res = await backend.get('/dog');
      setDogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFacilities();
    getDogs();
  }, []);

  const dogsLen = dogs.length;

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
      <AdoptionLogNavbar view={view} setView={setView} />
      {view === 'table' &&
        data.map(facility => (
          <AdoptionLog
            key={facility.name}
            tableName={facility.name}
            tableId={facility.id}
            data={dogs}
          />
        ))}
      {view === 'card' && !isLargerThan768 && (
        <Text color="#6E6E6E" marginLeft="205px" marginTop="20px" marginBottom="10px">
          {dogsLen} results
        </Text>
      )}
      {view === 'card' && isLargerThan768 && (
        <Text color="#6E6E6E" marginLeft="135px" marginTop="30px" marginBottom="20px">
          {dogsLen} results
        </Text>
      )}
      {view === 'card' &&
        data.map(facility => (
          <AdoptionLogCard
            key={facility.name}
            tableName={facility.name}
            tableId={facility.id}
            data={dogs}
          />
        ))}
    </div>
  );
};
export default Dogs;
