import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import Location from '../../components/Location';

const Facilities = () => {
  const Navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => Navigate('/add-facility')}>Add Facility</Button>
      <Location />
    </div>
  );
};
export default Facilities;
