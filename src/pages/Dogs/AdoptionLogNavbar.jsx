import { ChevronDownIcon, DownloadIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
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
  selectAll,
  dogs,
  selected,
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

  const isLargerThan768 = screenWidthExceeds(768);

  useEffect(() => {
    if (!isLargerThan768) {
      setView('card');
    }
  }, [isLargerThan768]);

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

  function FiltersButton() {
    const [isOpen, setIsOpen] = useState(false);
    // const [filter, setFilter] = useState("");
    // const [facilityFilter, setFacilityFilter] = useState("");
    // const facilities = [
    //   { id: 1, name: "Facility 1" },
    //   { id: 2, name: "Facility 2" },
    //   { id: 3, name: "Facility 3" },
    // ];

    return (
      <>
        <Button
          variant="outline"
          rightIcon={<Icon as={ChevronDownIcon} boxSize={4} />}
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Filters&nbsp;
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <ModalOverlay />
          <ModalContent
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            height="50%"
            borderRadius="md"
            padding={4}
          >
            <Flex direction="column" height="100%">
              <h5>Filters</h5>
              <ModalCloseButton />
              <Divider borderWidth="1px" borderColor="black" width="100%" />

              <ModalBody flex={1}>
                <Text marginRight="auto" fontSize="sm" fontWeight="bold">
                  Facility:
                </Text>

                <Select
                  margin="auto"
                  value={facilityFilter}
                  onChange={e => setFacilityFilter(e.target.value)}
                  className={styles.customSelectInput}
                  paddingBottom="10px"
                >
                  <option value="">All</option>
                  {facilities ? (
                    facilities.map(facility => (
                      <option key={facility.id} value={facility.id}>
                        {facility.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>All</option>
                  )}
                </Select>
                <Text marginRight="auto" fontSize="sm" fontWeight="bold">
                  Tags:
                </Text>

                <Select value={filter} onChange={e => setFilter(e.target.value)}>
                  <option value="">Filter by...</option>
                  <option value="all">All</option>
                  <option value="service">Service</option>
                  <option value="therapy">Pets</option>
                  <option value="specialNeeds">Other</option>
                  <option value="staffAdoption">Staff Adoption</option>
                  <option value="deceased">Deceased</option>
                  <option value="allMales">All Males</option>
                  <option value="allFemales">All Females</option>
                </Select>
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Text fontSize="sm" marginRight="auto">
                  Clear Filters
                </Text>
                <Button colorScheme="blue" size="sm" marginLeft="auto">
                  Show Results
                </Button>
              </ModalFooter>
            </Flex>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Flex direction="row" justifyContent="center" alignItems="center" width="100%">
      <Flex
        direction={{
          base: 'column',
          md: 'row',
        }}
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
          xl: '100%',
        }}
        gap={2}
      >
        <Box height="100%" marginTop="auto" flex={1} className={styles.mobileContainer}>
          <Flex direction="row" gap={-10} flex={1}>
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
        <Box flex={3} display="flex" alignItems="center" marginTop="auto" gap="15px">
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
          {!isLargerThan768 && <FiltersButton />}
        </Box>

        <div className={styles.mobileContainer}>
          <Flex marginTop="auto" flex={2} direction="row" gap={2}>
            <VStack display="flex" flex={1}>
              <Text marginRight="auto" fontSize="sm">
                Filter by:
              </Text>
              <Select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="">Filter by...</option>
                <option value="all">All</option>
                <option value="service">Service</option>
                <option value="therapy">Pets</option>
                <option value="specialNeeds">Other</option>
                <option value="staffAdoption">Staff Adoption</option>
                <option value="deceased">Deceased</option>
                <option value="allMales">All Males</option>
                <option value="allFemales">All Females</option>
              </Select>
            </VStack>
            <VStack display="flex" flex={1}>
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
                    <option key={facility.name} value={facility.id}>
                      {facility.name}
                    </option>
                  ))
                ) : (
                  <option disabled>All</option>
                )}
              </Select>
            </VStack>
          </Flex>
          <Box w={2} />
          <Box
            display="flex"
            direction="row"
            gap={2}
            marginTop="auto"
            marginLeft="auto"
            flex={1}
            className={styles.mobileContainer}
          >
            <Button size="md" onClick={selectAll}>
              Select All
            </Button>
            <Button size="md" aria-label="Export" rightIcon={<DownloadIcon />}>
              <CSVLink
                data={dogs.filter(dog => selected.includes(dog.dogid))}
                filename="Cell_Dogs_Adoption_Log.csv"
              >
                Export
              </CSVLink>
            </Button>
          </Box>
        </div>
      </Flex>
    </Flex>
  );
};

export default AdoptionLogNavbar;
