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
  Text,
} from '@chakra-ui/react';
import { ArrowBackIcon, ChevronRightIcon, ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import './ViewDog.css';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import ShowTags from '../AddDog/ShowTags.jsx';
import { useBackend } from '../../contexts/BackendContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddDog = () => {
  const { id: dogId } = useParams();

  const [editable, setEditable] = useState(false);
  const [dog, setDog] = useState({});
  const [therapyTag, setTherapyTag] = useState(false);
  const [staffAdoptionTag, setStaffAdoptionTag] = useState(false);
  const [deceasedTag, setDeceasedTag] = useState(false);
  const [specialTag, setSpecialTag] = useState(false);
  const [serviceTag, setServiceTag] = useState(false);
  const [facility, setFacilities] = useState([]);

  const { backend } = useBackend();
  const Navigate = useNavigate();

  const handleEditButton = () => {
    setEditable(!editable);
  };

  const getDog = async () => {
    try {
      const res = await backend.get(`/dog/${dogId}`);
      setDog(res.data[0]);
      console.log(res.data[0])
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  const getFacilities = async () => {
    const { data } = await backend.get('/facility');
    setFacilities(data);
  };

  const getFacility = async() => {
    try{
      const res = await backend.get(`/facility/${dog.facilityid}`)
      return res.data.name
    }
    catch (err) {
      console.log(err);
    }
  }

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

    await backend
      .put(`dog/${dogId}`,
        dog
      )
      .then(() => {
        console.log('Successfully updated dog');
      });
    Navigate(`/dog/${dog.dogid}`);
    handleEditButton();
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
              <BreadcrumbLink href="#">{dog.dogname}</BreadcrumbLink>
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
                disabled={!editable}
                id="nameField"
                type="name"
                placeholder="Enter Name"
                value = {dog.dogname}
                size="lg"
                variant="unstyled"
                onChange={e => {
                  let copy = { ...dog }
                copy['dogname'] = e.target.value
                setDog(copy)
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
          {!editable && (
            <Button
              className="editButton"
              // width="62.5px"
              size="sm"
              color="gray"
              variant="outline"
              onClick={() => handleEditButton()}
            >
              Edit Dog
            </Button>
          )}
          <div className="cancelButton">
            {editable && (
              <ButtonGroup variant="outline" spacing="6" onClick={() => handleEditButton()}>
                <Button>Cancel</Button>
              </ButtonGroup>
            )}
          </div>
          <div className="removeDogButton">
            {editable && (
              <ButtonGroup variant="outline" spacing="6">
                <Button colorScheme="red">Remove Dog</Button>
              </ButtonGroup>
            )}
          </div>
          <div className="saveButton">
            {editable && (
              <Button colorScheme="facebook" onClick={saveAllChanges}>
                Save All Changes
              </Button>
            )}
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
              disabled={!editable}
              className="formInput"
              value={dog.adoptername}
              onChange={(e) => {
                let copy = { ...dog }
                copy['adoptername'] = e.target.value
                setDog(copy)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              disabled={!editable}
              className="formInput"
              value={dog.adoptemail}
              onChange={e => {
                let copy = { ...dog }
                copy['adoptemail'] = e.target.value
                  setDog(copy)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              disabled={!editable}
              className="formInput"
              value={dog.adopterphone}
              onChange={e => {
                let copy = { ...dog }
                copy['adopterphone'] = e.target.value
                  setDog(copy)
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
              disabled={!editable}
              className="formInput"
              value={dog.altname}
              onChange={e => {
                let copy = { ...dog }
                copy['altname'] = e.target.value
                setDog(copy)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Breed</FormLabel>
            <Input
              type="text"
              disabled={!editable}
              className="formInput"
              value={dog.breed}
              onChange={e => {
                let copy = { ...dog }
                copy['breed'] = e.target.value
                setDog(copy)
              }}
            />
          </FormControl>
          <div className="genderAndGrad">
            <div className="gender">
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder="Select Gender"
                disabled={!editable}
                value={dog.gender}
                className="formInput"
                onChange={e => {
                  let copy = { ...dog }
                  copy['gender'] = e.target.value
                  setDog(copy)
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
                value={dog.age}
                disabled={!editable}
                onChange={e => {
                  let copy = { ...dog }
                copy['age'] = e.target.value
                setDog(copy)
                }}
              />
            </FormControl>
          </div>
          <div className="chipInputFields">
            <FormControl className="chipType">
              <FormLabel>Chip Type</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.chiptype}
                onChange={e => {
                  let copy = { ...dog }
                copy['chiptype'] = e.target.value
                setDog(copy)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Chip Number</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.chipnum}
                onChange={e => {
                  let copy = { ...dog }
                copy['chipnum'] = e.target.value
                setDog(copy)
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
              disabled={!editable}
              className="formInput"
              value={dog.addrline}
              onChange={e => {
                let copy = { ...dog }
                copy['addrline'] = e.target.value
                setDog(copy)
              }}
            />
          </FormControl>
          <div className="cityAndState">
            <FormControl className="city">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.adoptcity}
                onChange={e => {
                  let copy = { ...dog }
                copy['adoptcity'] = e.target.value
                setDog(copy)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.adoptstate}
                onChange={e => {
                  let copy = { ...dog }
                copy['adoptstate'] = e.target.value
                setDog(copy)
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <Input
              type="text"
              disabled={!editable}
              className="formInput"
              value={dog.zip}
              onChange={e => {
                let copy = { ...dog }
                copy['zip'] = e.target.value
                setDog(copy)
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
                  disabled={!editable}
                  className="formInput"
                  value={dog.fees}
                  onChange={e => {
                    let copy = { ...dog }
                copy['fees'] = e.target.value
                setDog(copy)
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Revenue ($)</FormLabel>
                <Input
                  type="text"
                  disabled={!editable}
                  className="formInput"
                  value={dog.revenue}
                  onChange={e => {
                    let copy = { ...dog }
                copy['revenue'] = e.target.value
                setDog(copy)
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
            disabled={!editable}
            className="formInput"
            value={() => getFacility()}
            onChange={e => {
              let copy = { ...dog }
                copy['facilityid'] = e.target.value
                setDog(copy)
            }}
          >
            {getFacilityList()}
          </Select>
          <FormControl>
            <FormLabel>Facility Unit</FormLabel>
            <Input
              type="text"
              disabled={!editable}
              className="formInput"
              value={dog.facilityUnit}
              onChange={e => {
                let copy = { ...dog }
                copy['facilityUnit'] = e.target.value
                setDog(copy)
              }}
            />
          </FormControl>
          <div className="GradAndGroup">
            <FormControl className="gradDate">
              <FormLabel>Graduation Date</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.graddate}
                onChange={e => {
                  let copy = { ...dog }
                copy['graddate'] = e.target.value
                setDog(copy)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Group Number</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.groupnum}
                onChange={e => {
                  let copy = { ...dog }
                copy['groupnum'] = e.target.value
                setDog(copy)
                }}
              />
            </FormControl>
          </div>
          <FormControl>
            <FormLabel>Shelter</FormLabel>
            <Input
              type="text"
              disabled={!editable}
              className="formInput"
              value={dog.shelter}
              onChange={e => {
                let copy = { ...dog }
                copy['shelter'] = e.target.value
                setDog(copy)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Animal ID</FormLabel>
            <Input
              type="text"
              disabled={!editable}
              className="formInput"
              value={dog.dogid}
              onChange={e => {
                let copy = { ...dog }
                copy['dogid'] = e.target.value
                setDog(copy)
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
          disabled={!editable}
          name="additionalNotes"
          rows="7"
          width="70%"
          value={dog.notes}
          onChange={e => {
            let copy = { ...dog }
                copy['notes'] = e.target.value
                setDog(copy)
          }}
        />
      </Flex>
    </div>
  );
};

export default AddDog;
