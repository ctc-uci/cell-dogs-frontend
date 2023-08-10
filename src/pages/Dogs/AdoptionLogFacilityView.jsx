import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AdoptionLogFacilityCards from './AdoptionLogFacilityCards';
import AdoptionLogFacilityTable from './AdoptionLogFacilityTable';
import { useBackend } from '../../contexts/BackendContext';
import calculateDogAgeAtGraduation from './CalculateDogAtGraduationAge';

const AdoptionLogFacilityView = ({ info, dogs, selected, setSelected, view }) => {
  // eslint-disable-next-line
  const { shelter, facilityid } = info;

  const toast = useToast();

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

  const copyEmails = () => {
    const emails = dogs.map(dog => dog.adoptemail);
    navigator.clipboard.writeText(emails.join(', '));
    toast({
      title: 'Emails copied to clipboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
          <Button variant="outline" onClick={copyEmails}>
            Copy Email List
          </Button>
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
