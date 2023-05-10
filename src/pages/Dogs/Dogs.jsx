import { AddIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
// eslint-disable-next-line import/no-useless-path-segments
import { useBackend } from '../../contexts/BackendContext';
import AdoptionLogNavbar from './AdoptionLogNavbar';

const Dogs = () => {
  // const { currentUser, logout } = useAuth();
  // const { logout } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   navigate('/login');
  // };
  const [view, setView] = useState('table');
  const { backend } = useBackend();
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [facilityFilter, setFacilityFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [searchDog, setSearchDog] = useState('');
  // eslint-disable-next-line
  const [dogs, setDogs] = useState([]);
  const [checkedDogs, setCheckedDogs] = useState([]);

  // eslint-disable-next-line
  const getCheckedDogs = checkedDog => {
    if (checkedDogs.includes(checkedDog)) {
      setCheckedDogs(checkedDogs.filter(i => i !== checkedDog));
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

  return (
    <Box>
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
    </Box>
  );
};
export default Dogs;
