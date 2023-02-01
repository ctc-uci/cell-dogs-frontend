import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Heading,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
} from '@chakra-ui/react';
import { ArrowBackIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons';
import './AddDog.css';
import { useBackend } from '../../contexts/BackendContext';
import Location from '../../components/Location';

const AddDog = () => {
  const [facilityid, setFacilityID] = useState(0);
  const [groupnum, setGroupNum] = useState(0);
  const [graddate, setGradDate] = useState('');
  const [dogname, setDogName] = useState('');
  const [age, setAge] = useState(0);
  const [shelter, setShelter] = useState('');
  const [breed, setBreed] = useState('');
  const [chiptype, setChipType] = useState('');
  const [chipnum, setChipNum] = useState(0);
  const [gender, setGender] = useState('');
  const [profilepic, setProfilePic] = useState('');
  const [altname, setAltName] = useState('');
  const [notes, setNotes] = useState('');
  const [adoptername, setAdopterName] = useState('');
  const [adopterphone, setAdopterPhone] = useState('');
  const [addrline, setAddrLine] = useState('');
  const [adoptcity, setAdoptCity] = useState('');
  const [adoptstate, setAdoptState] = useState('');
  const [zip, setZip] = useState('');
  const [adoptemail, setAdoptEmail] = useState('');
  const [fees, setFees] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const { backend } = useBackend();

  // backend
  //   .post('/dog')
  //   .then(response => {
  //     const jsonData = response.data;
  //     console.log(jsonData); // or do something else with the data
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  const saveAllChanges = async () => {
    // const dogs = await backend.get('/dog');
    // const dogNames = dogs.data.map(dog => dog.dogname);

    // if (dogNames.indexOf(dogname) > -1) {
    //   // dog already in table
    //   // update row
    //   return;
    // }

    backend
      .post('/dog', {
        facilityid,
        groupnum,
        graddate,
        dogname,
        age,
        shelter,
        breed,
        chiptype,
        chipnum,
        gender,
        profilepic,
        altname,
        notes,
        adoptername,
        adopterphone,
        addrline,
        adoptcity,
        adoptstate,
        zip,
        adoptemail,
        fees,
        revenue,
      })
      .then(() => {
        console.log('Successfully updated dog');
      });
  };

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
              <BreadcrumbLink href="#">New Dog</BreadcrumbLink>
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
          <Avatar height="100px" width="100px" />
        </div>
        <div className="name">
          <div className="nameInput">
            <FormControl>
              <Input
                id="nameField"
                type="name"
                placeholder="Enter Name"
                size="lg"
                variant="unstyled"
                onChange={e => {
                  setDogName(e.target.value);
                }}
              />
            </FormControl>
          </div>
        </div>
        <div className="addTag">
          <Select placeholder="Add Tag" isMulti>
            <option value="Service">Service</option>
            <option value="Therapy">Therapy</option>
            <option value="Staff Adoption">Staff Adoption</option>
            <option value="Special Needs">Special Needs</option>
            <option value="Deceased">Deceased</option>
          </Select>
        </div>
        <div className="tagRow">
          <div className="tag">
            <h3>Service</h3>
          </div>
        </div>
        <div className="buttons">
          <div className="cancelButton">
            <ButtonGroup variant="outline" spacing="6">
              <Button>Cancel</Button>
            </ButtonGroup>
          </div>
          <div className="removeDogButton">
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="red">Remove Dog</Button>
            </ButtonGroup>
          </div>
          <div className="saveButton">
            <Button colorScheme="facebook" onClick={saveAllChanges}>
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
      <div className="row1">
        <div className="adopterInfo">
          <Heading as="h2" fontSize="24px">
            Adopter Info
          </Heading>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setAdopterName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              className="formInput"
              onChange={e => {
                setAdoptEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setAdopterPhone(e.target.value);
              }}
            />
          </FormControl>
        </div>

        <div className="dogInfo">
          <Heading as="h2" fontSize="24px">
            Dog Info
          </Heading>
          <FormControl>
            <FormLabel>Alternate Name</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setAltName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Breed</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setBreed(e.target.value);
              }}
            />
          </FormControl>
          <div className="genderAndGrad">
            <div className="gender">
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder="Select Gender"
                className="formInput"
                onChange={e => {
                  setGender(e.target.value);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
            <FormControl className="grad">
              <FormLabel>Graduation Age</FormLabel>
              <Input
                type="text"
                className="formInput"
                onChange={e => {
                  setGradDate(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="chipInputFields">
            <FormControl className="chipType">
              <FormLabel>Chip Type</FormLabel>
              <Input type="text" className="formInput" />
            </FormControl>
            <FormControl>
              <FormLabel>Chip Number</FormLabel>
              <Input
                type="text"
                className="formInput"
                onChange={e => {
                  setGradDate(e.target.value);
                }}
              />
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
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setGradDate(e.target.value);
              }}
            />
          </FormControl>
          <div className="cityAndState">
            <FormControl className="city">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                className="formInput"
                onChange={e => {
                  setGradDate(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                className="formInput"
                onChange={e => {
                  setGradDate(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setGradDate(e.target.value);
              }}
            />
          </FormControl>
          <div className="financial">
            <Heading as="h2" fontSize="24px">
              Financial
            </Heading>
            <div className="financialFields">
              <FormControl className="fees">
                <FormLabel>Fees</FormLabel>
                <Input
                  type="text"
                  className="formInput"
                  onChange={e => {
                    setGradDate(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Revenue</FormLabel>
                <Input
                  type="text"
                  className="formInput"
                  onChange={e => {
                    setGradDate(e.target.value);
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>

        <div className="facilityInfo">
          <Heading as="h2" fontSize="24px">
            Facility Info
          </Heading>
          <FormLabel>Facility</FormLabel>
          <Select placeholder="Select Facility" className="formInput">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <FormControl>
            <FormLabel>Facility Unit</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setGradDate(e.target.value);
              }}
            />
          </FormControl>
          <div className="GradAndGroup">
            <FormControl className="gradDate">
              <FormLabel>Graduation Date</FormLabel>
              <Input
                type="text"
                className="formInput"
                onChange={e => {
                  setGradDate(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Group Number</FormLabel>
              <Input
                type="text"
                className="formInput"
                onChange={e => {
                  setGradDate(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Shelter</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setGradDate(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Animal ID</FormLabel>
            <Input
              type="text"
              className="formInput"
              onChange={e => {
                setGradDate(e.target.value);
              }}
            />
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
