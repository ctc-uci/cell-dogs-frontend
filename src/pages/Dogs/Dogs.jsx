import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
// eslint-disable-next-line import/no-useless-path-segments
import { useBackend } from '../../contexts/BackendContext';
import AdoptionLogFacilityView from './AdoptionLogFacilityView';
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
  const [sortedDogs, setSortedDogs] = useState({});

  const [selected, setSelected] = useState([]);

  const selectAll = () => {
    if (selected.length === dogs.length) {
      setSelected([]);
      return false;
    }
    setSelected(dogs.map(dog => dog.dogid));
    return true;
  };

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

  const getDogs = async signal => {
    try {
      const params = {
        filterBy: filter,
        facility: facilityFilter,
      };
      console.log(params);
      const res = await backend.get(searchDog.length > 0 ? `/dog/search/${searchDog}` : '/dog', {
        signal,
        params,
      });
      setDogs(res.data);
      console.log(data);
      const tempSortedDogs = {};
      res.data.forEach(dog => {
        if (tempSortedDogs[dog.facilityid]) {
          tempSortedDogs[dog.facilityid].dogs.push(dog);
        } else {
          tempSortedDogs[dog.facilityid] = {
            dogs: [dog],
            info: {
              shelter: dog.shelter,
              facilityid: dog.facilityid,
            },
          };
        }
      });
      console.log(tempSortedDogs);
      setSortedDogs(tempSortedDogs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getDogs(controller.signal);
    return () => controller.abort();
  }, [searchDog, filter, facilityFilter]);

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
      <Flex align="center" justify="center" px={5}>
        <Flex
          width={{
            base: '100%',
            md: '100%',
            lg: '100%',
            xl: '80%',
          }}
          direction="column"
        >
          <AdoptionLogNavbar
            view={view}
            setView={setView}
            setFilter={setFilter}
            filter={filter}
            facilityFilter={facilityFilter}
            setFacilityFilter={setFacilityFilter}
            setSearchDog={setSearchDog}
            searchDog={searchDog}
            selectAll={selectAll}
            dogs={dogs}
            selected={selected}
          />
          <VStack spacing={4} align="stretch" mt={10}>
            {Object.keys(sortedDogs)?.map(id => (
              <AdoptionLogFacilityView
                key={id}
                info={sortedDogs[id].info}
                dogs={sortedDogs[id].dogs}
                selected={selected}
                setSelected={setSelected}
                view={view}
              />
            ))}
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Dogs;
