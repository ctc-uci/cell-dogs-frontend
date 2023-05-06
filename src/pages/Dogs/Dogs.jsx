import { AddIcon } from '@chakra-ui/icons';
import { Button, Text } from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
// eslint-disable-next-line import/no-useless-path-segments
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
import AdoptionLog from './AdoptionLog';
import AdoptionLogCard from './AdoptionLogCard';
import AdoptionLogNavbar from './AdoptionLogNavbar';

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
  const [facilityFilter, setFacilityFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [searchDog, setSearchDog] = useState('');
  const [dogs, setDogs] = useState([]);
  const [checkedDogs, setCheckedDogs] = useState([]);

  const getCheckedDogs = checkedDog => {
    if (checkedDogs.includes(checkedDog)) {
      setCheckedDogs(checkedDogs.filter(i => i != checkedDog));
    } else {
      setCheckedDogs([...checkedDogs, checkedDog]);
    }
    console.log(checkedDogs);
  };

  const getFacilities = async () => {
    try {
      const res = await backend.get('/facility');
      setData(res.data);
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

  const getDogsSearch = async () => {
    try {
      const res = await backend.get(`/dog/search/${searchDog}`);
      setDogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchDog) {
      getDogsSearch();
    } else {
      getDogs();
    }
  }, [searchDog]);

  useEffect(() => {
    getFacilities();
  }, []);

  const dogsLen = dogs.length;
  // console.log('Dogs: ', checkedDogs);

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
        view={view}
        setView={setView}
        setFilter={setFilter}
        filter={filter}
        facilityFilter={facilityFilter}
        setFacilityFilter={setFacilityFilter}
        setSearchDog={setSearchDog}
        searchDog={searchDog}
        checkedDogs={checkedDogs}
      />
      {view === 'table' &&
        data
          .filter(
            facility =>
              !facilityFilter || facility.name.toLowerCase().includes(facilityFilter.toLowerCase()),
          )
          .map(facility => (
            <AdoptionLog
              key={facility.name}
              tableName={facility.name}
              tableId={facility.id}
              data={dogs}
              filter={filter}
              getCheckedDogs={getCheckedDogs}
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
