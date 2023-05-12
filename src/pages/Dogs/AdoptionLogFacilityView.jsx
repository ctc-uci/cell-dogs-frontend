import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AdoptionLogFacilityCards from './AdoptionLogFacilityCards';
import AdoptionLogFacilityTable from './AdoptionLogFacilityTable';
import { useBackend } from '../../contexts/BackendContext';

const AdoptionLogFacilityView = ({ info, dogs, selected, setSelected, view }) => {
  // eslint-disable-next-line
  const { shelter, facilityid } = info;

  const calculateDogAgeAtGraduation = (graduationDate, currentAge) => {
    // Step 1: Convert graduation date to JavaScript Date object
    const gradDate = new Date(graduationDate);

    // Step 2: Calculate birth year of dog based on current age
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - currentAge;

    // Step 3: Calculate age of dog at graduation in milliseconds
    const birthDate = new Date(birthYear, 0, 1); // January 1st of the birth year
    const ageAtGraduationInMs = gradDate - birthDate;

    // Step 4: Convert age of dog at graduation from milliseconds to years
    const ageAtGraduationInYears = ageAtGraduationInMs / (1000 * 60 * 60 * 24 * 365);

    return Math.floor(ageAtGraduationInYears);
  };

  const [facilitySelected, setFacilitySelected] = useState(false);
  useEffect(() => {
    // if every dogid in dogs is in selected, then setFacilitySelected to true
    // else setFacilitySelected to false
    if (dogs.every(dog => selected.includes(dog.dogid))) {
      setFacilitySelected(true);
    } else {
      setFacilitySelected(false);
    }
  }, [dogs, selected]);

  const toggleFacilitySelected = () => {
    if (facilitySelected) {
      setSelected(selected.filter(id => !dogs.map(dog => dog.dogid).includes(id)));
    } else {
      setSelected([...selected, ...dogs.map(dog => dog.dogid)]);
    }
  };
  const toggleCheck = dogid => {
    if (selected.includes(dogid)) {
      setSelected(selected.filter(id => id !== dogid));
    } else {
      setSelected([...selected, dogid]);
    }
    console.log(selected);
  };

  const [facilityName, setFacilityName] = useState('');
  const { backend } = useBackend();
  const getFacilityName = async id => {
    try {
      const res = await backend.get(`/facility/${id}`);
      setFacilityName(res.data[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFacilityName(facilityid);
  }, []);

  return (
    <Box>
      <Flex
        width="100%"
        direction={{
          base: 'column',
          md: 'row',
        }}
        gap={2}
        justifyContent="space-between"
      >
        <Text fontSize="3xl">{facilityName}</Text>
        <Flex direction="row" gap={2}>
          <Button variant="outline" onClick={toggleFacilitySelected}>
            {facilitySelected ? 'Deselect All' : 'Select All'}
          </Button>
          <Button variant="outline">Copy Email List</Button>
        </Flex>
      </Flex>
      {view === 'table' ? (
        <AdoptionLogFacilityTable
          {...{
            dogs,
            selected,
            info,
            calculateDogAgeAtGraduation,
            toggleCheck,
            facilitySelected,
            toggleFacilitySelected,
          }}
        />
      ) : (
        <AdoptionLogFacilityCards
          {...{
            dogs,
            selected,
            info,
            calculateDogAgeAtGraduation,
            toggleCheck,
            facilitySelected,
            toggleFacilitySelected,
            facilityName,
          }}
        />
      )}
    </Box>
  );
};

export default AdoptionLogFacilityView;
