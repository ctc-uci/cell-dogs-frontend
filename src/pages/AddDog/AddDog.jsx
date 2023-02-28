import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ArrowBackIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons';
import cellDogsSampleProfilePicture from '../../assets/CellDogs_sample_profile_picture.png';
import './AddDog.css';

// import Location from '../../components/Location';

const AddDog = () => {
  return (
    <div>
      {/* <Location /> */}
      <div className="breadcrumbAndAdd">
        <div className="breadcrumb">
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Adoption Log</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Lucky</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="addDogButton">
          <Button leftIcon={<AddIcon />} size="sm">
            Add Dog
          </Button>
        </div>
      </div>
      <div className="profileSection">
        <div className="dogPic">
          <div className="backButton">
            <Button variant="link" leftIcon={<ArrowBackIcon />}>
              Go Back
            </Button>
          </div>
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
          <div className="genderAndGrad">
            <div className="gender">
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Select Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
            <FormControl className="grad">
              <FormLabel>Graduation Age</FormLabel>
              <Input type="text" />
            </FormControl>
          </div>
          <div className="chipInputFields">
            <FormControl className="chipType">
              <FormLabel>Chip Type</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Chip Number</FormLabel>
              <Input type="text" />
            </FormControl>
          </div>
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
          <div className="cityAndState">
            <FormControl className="city">
              <FormLabel>City</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input type="text" />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <Input type="text" />
          </FormControl>
          <div className="financial">
            <Heading as="h2" fontSize="24px">
              Financial
            </Heading>
            <div className="financialFields">
              <FormControl className="fees">
                <FormLabel>Fees</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Revenue</FormLabel>
                <Input type="text" />
              </FormControl>
            </div>
          </div>
        </div>

        <div className="facilityInfo">
          <Heading as="h2" fontSize="24px">
            Facility Info
          </Heading>
          <FormLabel>Facility</FormLabel>
          <Select placeholder="Select Facility">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <FormControl>
            <FormLabel>Facility Unit</FormLabel>
            <Input type="text" />
          </FormControl>
          <div className="GradAndGroup">
            <FormControl className="gradDate">
              <FormLabel>Graduation Date</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Group Number</FormLabel>
              <Input type="text" />
            </FormControl>
          </div>
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
      <div className="additionalNotesTitle">
        <Heading as="h2" fontSize="24px">
          Additional Notes
        </Heading>
      </div>
      <textarea id="additionalNotes" name="additionalNotes" rows="10" />
    </div>
  );
};

export default AddDog;
