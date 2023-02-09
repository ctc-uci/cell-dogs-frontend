import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Location from '../../components/Location';

const Facilities = () => {
  const Navigation = useNavigate();
  return (
    <div>
      <p>This is the Facilities page</p>
      <Location />
      <Button>
        <div>
          <Button onClick={() => Navigation('/add-facility')}>Add Facility</Button>
        </div>
      </Button>
    </div>
  );
};
export default Facilities;
