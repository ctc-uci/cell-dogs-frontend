/* eslint-disable */
import React, { useEffect, useState } from 'react';
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
  Flex,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ArrowBackIcon, ChevronRightIcon, ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import './AddDog.css';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import ShowTags from './ShowTags';
import { useBackend } from '../../contexts/BackendContext';
import { useNavigate } from 'react-router-dom';

const AddDog = () => {
  const [dogid, setDogID] = useState(0);
  const [facilityid, setFacilityID] = useState(0);
  const [facilityUnit, setFacilityUnit] = useState('');
  const [groupnum, setGroupNum] = useState(0);
  const [graddate, setGradDate] = useState('');
  const [dogname, setDogName] = useState('');
  const [age, setAge] = useState(0);
  const [shelter, setShelter] = useState('');
  const [breed, setBreed] = useState('');
  const [chiptype, setChipType] = useState('');
  const [chipnum, setChipNum] = useState(0);
  const [gender, setGender] = useState('');
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
  const [therapyTag, setTherapyTag] = useState(false);
  const [staffAdoptionTag, setStaffAdoptionTag] = useState(false);
  const [deceasedTag, setDeceasedTag] = useState(false);
  const [specialTag, setSpecialTag] = useState(false);
  const [serviceTag, setServiceTag] = useState(false);
  const [facility, setFacilities] = useState([]);

  const { backend } = useBackend();
  const Navigate = useNavigate();

  const getFacilities = async () => {
    const { data } = await backend.get('/facility');
    setFacilities(data);
  };

  const getFacilityList = () => {
    return facility.map(element => (
      <option value={element.id} key={element.id}>
        {element.name}
      </option>
    ));
  };

  const TagSetup = ({ tagBoolean, tagName, setTag }) => {
    return (
      <div>
        {tagBoolean ? (
          <MenuItem onClick={() => setTag(false)}>{tagName} (Selected)</MenuItem>
        ) : (
          <MenuItem onClick={() => setTag(true)}>{tagName}</MenuItem>
        )}
      </div>
    );
  };

  const TagMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Add tag
        </MenuButton>
        <MenuList>
          <TagSetup tagBoolean={serviceTag} tagName="Service" setTag={setServiceTag} />
          <TagSetup tagBoolean={therapyTag} tagName="Therapy" setTag={setTherapyTag} />
          <TagSetup tagBoolean={staffAdoptionTag} tagName="Stf Adpt" setTag={setStaffAdoptionTag} />
          <TagSetup tagBoolean={specialTag} tagName="Special" setTag={setSpecialTag} />
          <TagSetup tagBoolean={deceasedTag} tagName="Decsd" setTag={setDeceasedTag} />
        </MenuList>
      </Menu>
    );
  };

  const saveAllChanges = async () => {
    console.log(serviceTag);
    const service = serviceTag;
    const therapy = therapyTag;
    const staffAdoption = staffAdoptionTag;
    const specialNeeds = specialTag;
    const deceased = deceasedTag;
    backend
      .post('/dog', {
        dogid,
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
        service,
        therapy,
        staffAdoption,
        specialNeeds,
        deceased,
        facilityUnit,
      })
      .then(() => {
        console.log('Successfully updated dog');
      });
  };

  useEffect(() => {
    getFacilities();
  }, []);
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

      <Flex width="100%" justifyContent="flex-start" pt={4} ml={10}>
        <Button variant="link" leftIcon={<ArrowBackIcon />} onClick={() => Navigate('/')}>
          Go Back
        </Button>
      </Flex>

      <div className="profileSection">
        <div className="dogPic">
          <UploadAvatar width="100px" height="100px" />
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
          <TagMenu />
        </div>
        <div className="tagRow">
          <ShowTags
            serviceTag={serviceTag}
            therapyTag={therapyTag}
            staffAdoptionTag={staffAdoptionTag}
            specialTag={specialTag}
            disabledTag={deceasedTag}
          />
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
              placeholder="Jane Doe"
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
              placeholder="kl123@gmail.com"
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
              placeholder="123-456-7891"
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
              placeholder="Sir Lucks-a-lot"
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
              placeholder="Chihuahua"
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
                placeholder="6"
                onChange={e => {
                  setAge(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="chipInputFields">
            <FormControl className="chipType">
              <FormLabel>Chip Type</FormLabel>
              <Input
                type="text"
                className="formInput"
                placeholder="AVID"
                onChange={e => {
                  setChipType(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Chip Number</FormLabel>
              <Input
                type="text"
                className="formInput"
                placeholder="172683272"
                onChange={e => {
                  setChipNum(e.target.value);
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
              placeholder="123 Irvine Way"
              onChange={e => {
                setAddrLine(e.target.value);
              }}
            />
          </FormControl>
          <div className="cityAndState">
            <FormControl className="city">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                className="formInput"
                placeholder="Irvine"
                onChange={e => {
                  setAdoptCity(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                className="formInput"
                placeholder="CA"
                onChange={e => {
                  setAdoptState(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <Input
              type="text"
              className="formInput"
              placeholder="92728"
              onChange={e => {
                setZip(e.target.value);
              }}
            />
          </FormControl>
          <div className="financial">
            <Heading as="h2" fontSize="24px">
              Financial
            </Heading>
            <div className="financialFields">
              <FormControl className="fees">
                <FormLabel>Fees ($)</FormLabel>
                <Input
                  type="text"
                  className="formInput"
                  placeholder="270"
                  onChange={e => {
                    setFees(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Revenue ($)</FormLabel>
                <Input
                  type="text"
                  className="formInput"
                  placeholder="400"
                  onChange={e => {
                    setRevenue(e.target.value);
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
          <Select
            placeholder="Select Facility"
            className="formInput"
            onChange={e => {
              setFacilityID(e.target.value);
            }}
          >
            {getFacilityList()}
          </Select>
          <FormControl>
            <FormLabel>Facility Unit</FormLabel>
            <Input
              type="text"
              className="formInput"
              placeholder="Tango"
              onChange={e => {
                setFacilityUnit(e.target.value);
              }}
            />
          </FormControl>
          <div className="GradAndGroup">
            <FormControl className="gradDate">
              <FormLabel>Graduation Date</FormLabel>
              <Input
                type="text"
                className="formInput"
                placeholder="11/20/2023"
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
                placeholder="27"
                onChange={e => {
                  setGroupNum(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Shelter</FormLabel>
            <Input
              type="text"
              className="formInput"
              placeholder="Irvine Dog Rescue"
              onChange={e => {
                setShelter(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Animal ID</FormLabel>
            <Input
              type="text"
              className="formInput"
              placeholder="123456"
              onChange={e => {
                setDogID(e.target.value);
              }}
            />
          </FormControl>
        </div>
      </div>

      <Flex direction="column" align="center" justify-content="center">
        <Heading as="h2" fontSize="24px">
          Additional Notes
        </Heading>
        <Textarea
          borderWidth={1}
          name="additionalNotes"
          rows="7"
          width="70%"
          placeholder="The dog is beautiful."
          onChange={e => {
            setNotes(e.target.value);
          }}
        />
      </Flex>
    </div>
  );
};

export default AddDog;
