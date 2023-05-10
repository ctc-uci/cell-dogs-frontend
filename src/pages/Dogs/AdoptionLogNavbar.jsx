import { DownloadIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useBackend } from '../../contexts/BackendContext';
import styles from './AdoptionLogNavbar.module.css';

const AdoptionLogNavbar = ({
  view,
  setView,
  setFilter,
  filter,
  setFacilityFilter,
  facilityFilter,
  setSearchDog,
  searchDog,
  checkedDogs,
}) => {
  // const [filter, setFilter] = useState(false);
  const [facilities, setFacilities] = useState('');

  // eslint-disable-next-line
  const [_, setSelectAll] = useState(false);

  // console.log(JSON.parse('[' + checkedDogs.join(', ') + ']'));
  function handleViewToggle(viewType) {
    return () => {
      setView(viewType);
    };
  }

  const { backend } = useBackend();
  const getFacilities = async () => {
    const { data } = await backend.get('/facility');
    setFacilities(data);
  };

  useEffect(() => {
    getFacilities();
  }, []);

  const buttonStyles = {
    selected: {
      backgroundColor: '#21307A',
      color: 'white',
    },
    unselected: {
      backgroundColor: '#C3CBDB',
      color: 'white',
    },
  };

  return (
    <Flex direction="row" justifyContent="center" alignItems="center">
      <Flex
        direction="row"
        justifyContent={{
          base: 'space-between',
          md: 'space-between',
          lg: 'space-between',
          xl: 'space-between',
        }}
        width={{
          base: '100%',
          md: '100%',
          lg: '100%',
          xl: '80%',
        }}
        gap={2}
        px={10}
      >
        <Box height="100%" marginTop="auto" flex={1}>
          <Flex direction="row" gap={-10}>
            <Button
              size="md"
              fontWeight="bold"
              onClick={handleViewToggle('card')}
              style={view === 'card' ? buttonStyles.selected : buttonStyles.unselected}
              borderRightRadius={0}
            >
              Card View
            </Button>

            <Button
              size="md"
              fontWeight="bold"
              onClick={handleViewToggle('table')}
              style={view === 'table' ? buttonStyles.selected : buttonStyles.unselected}
              borderLeftRadius={0}
            >
              Table View
            </Button>
          </Flex>
        </Box>
        <Box flex={3} display="flex" alignItems="center" marginTop="auto">
          <InputGroup size="sm" margin="auto">
            <InputLeftElement
              margin="auto"
              pointerEvents="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
              top="12%"
            >
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              size="sm"
              value={searchDog}
              onChange={e => setSearchDog(e.target.value)}
              height="40px"
              borderRadius="md"
            />
          </InputGroup>
        </Box>
        <Box marginTop="auto" flex={1}>
          <VStack>
            <Text marginRight="auto" fontSize="sm">
              Filter by:
            </Text>
            <Select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="">Filter by...</option>
              <option value="all">All</option>
              <option value="service">Service</option>
              <option value="therapy">Therapy</option>
              <option value="specialNeeds">Special Needs</option>
              <option value="staffAdoption">Staff Adoption</option>
              <option value="deceased">Deceased</option>
              <option value="allMales">All Males</option>
              <option value="allFemales">All Females</option>
            </Select>
          </VStack>
        </Box>
        <Box marginTop="auto" flex={1}>
          <VStack>
            <Text marginRight="auto" fontSize="sm">
              Facility:
            </Text>
            <Select
              margin="auto"
              value={facilityFilter}
              onChange={e => setFacilityFilter(e.target.value)}
              className={styles.customSelectInput}
            >
              <option value="">All</option>
              {facilities ? (
                facilities.map(facility => (
                  <option key={facility.name} value={facility.name}>
                    {facility.name}
                  </option>
                ))
              ) : (
                <option disabled>All</option>
              )}
            </Select>
          </VStack>
        </Box>
        <Box display="flex" direction="row" gap={2} marginTop="auto" flex={1}>
          <Button size="md" onClick={() => setSelectAll(true)} style={{ marginRight: '10px' }}>
            Select All
          </Button>
          <Button size="md" aria-label="Export" rightIcon={<DownloadIcon />}>
            <CSVLink
              data={JSON.parse(`[${checkedDogs.join(', ')}]`)}
              filename="Cell_Dogs_Adoption_Log.csv"
            >
              Export
            </CSVLink>
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdoptionLogNavbar;
