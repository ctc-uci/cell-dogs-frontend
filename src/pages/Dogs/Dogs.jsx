import { React, useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
// eslint-disable-next-line import/no-useless-path-segments
import AdoptionLogNavbar from './AdoptionLogNavbar';
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
  const [facilityFilter, setFacilityFilter] = useState('');
  const [searchDog, setSearchDog] = useState('');

  const getFacilities = async () => {
    try {
      const res = await backend.get('/facility');
      setData(res.data);
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
      <AdoptionLogNavbar
        setFacilityFilter={setFacilityFilter}
        facilityFilter={facilityFilter}
        setSearchDog={setSearchDog}
        searchDog={searchDog}
      />
      {facilityFilter ? (
        <div>
          <AdoptionLog tableName={data[facilityFilter].name} searchDog={searchDog} tableId={facility.id} />
        </div>
      ) : (
        <div>
          {data.map(facility => (
            <AdoptionLog key={facility.name} tableName={facility.name} searchDog={searchDog} tableId={facility.id} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Dogs;
