import React from 'react';
import { FormControl, FormLabel, Input, Button, Heading, Select } from '@chakra-ui/react';
import cellDogsSampleProfilePicture from '../../assets/CellDogs_sample_profile_picture.png';
import './AddDog.css';
import Location from '../../components/Location';

const AddDog = () => {
  return (
    <div>
      <p>This is the Adding Dog page</p>
      <Location />
      <div>
        <Button variant="ghost">Go Back</Button>
      </div>
      <div className="profileSection">
        <div className="dogPic">
          <img id="profilePic" src={cellDogsSampleProfilePicture} alt="Cell Dogs Sample Profile" />
        </div>
        <h2 className="dogName">Lucky</h2>
        <div className="tagRow">
          <div className="tag">
            <h3>Service</h3>
          </div>
        </div>
        <div className="editDogButton">
          <Button>Edit Dog</Button>
        </div>
      </div>
      <div className="row1">
        <div className="adopterInfo">
          <Heading as="h2" fontSize="24px">
            Adopter Info
          </Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="text" />
          </FormControl>
        </div>

        <div className="dogInfo">
          <Heading as="h2" fontSize="24px">
            Dog Info
          </Heading>
          <FormControl>
            <FormLabel>Alternate Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Breed</FormLabel>
            <Input type="text" />
          </FormControl>
          <Select placeholder="Select Gender">
            <FormLabel>Gender</FormLabel>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <FormControl>
            <FormLabel>Graduation Age</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Chip Type</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Chip Number</FormLabel>
            <Input type="text" />
          </FormControl>
        </div>
      </div>
      <div className="row2">
        <div className="addressFinancial">
          <Heading as="h2" fontSize="24px">
            Address
          </Heading>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>State</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <Input type="text" />
          </FormControl>
          <div className="financial">
            <Heading as="h2" fontSize="24px">
              Financial
            </Heading>
            <FormControl>
              <FormLabel>Fees</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Revenue</FormLabel>
              <Input type="text" />
            </FormControl>
          </div>
        </div>

        <div className="facilityInfo">
          <Heading as="h2" fontSize="24px">
            Facility Info
          </Heading>
          <Select placeholder="Select Facility">
            <FormLabel>Facility</FormLabel>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <FormControl>
            <FormLabel>Graduation Date</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Group Number</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Shelter</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Animal ID</FormLabel>
            <Input type="text" />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default AddDog;
