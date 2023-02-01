import React from 'react';
import { Button } from '@chakra-ui/react';
import Location from '../../components/Location';
import AddFacilityModal from '../../components/AddFacilityModal';

const Facilities = () => {
  return (
    <div>
      <p>This is the Facilities page</p>
      <Location />
      <Button>
        <div>
          <AddFacilityModal />
        </div>
      </Button>
    </div>
  );
};
export default Facilities;
