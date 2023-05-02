/* eslint-disable */
import { AddIcon, ArrowBackIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import { useBackend } from '../../contexts/BackendContext';
import ShowTags from '../AddDog/ShowTags.jsx';
import './ViewDog.css';
import { ViewDogSchema } from './ViewDog.schema';

const ViewDog = () => {
  const { id: dogId } = useParams();

  const [editable, setEditable] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [dog, setDog] = useState({});
  const [facility, setFacilities] = useState([]);

  const { backend } = useBackend();
  const Navigate = useNavigate();

  const handleEditButton = () => {
    setEditable(!editable);
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    const getDog = async () => {
      try {
        const res = await backend.get(`/dog/${dogId}`);
        setDog(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getDog();
  }, []);

  const getFacilities = async () => {
    const { data } = await backend.get('/facility');
    setFacilities(data);
  };

  const getFacility = async () => {
    try {
      const res = await backend.get(`/facility/${dog.facilityid}`);
      return res.data.name;
    } catch (err) {
      console.log(err);
    }
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
          <MenuItem
            onClick={() => {
              let copy = { ...dog };
              copy[setTag] = false;
              setDog(copy);
            }}
          >
            {tagName} (Selected)
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              let copy = { ...dog };
              copy[setTag] = true;
              setDog(copy);
            }}
          >
            {tagName}
          </MenuItem>
        )}
      </div>
    );
  };

  const TagMenu = () => {
    return (
      <Menu>
        <MenuButton isDisabled={!editable} as={Button} rightIcon={<ChevronDownIcon />}>
          Add tag
        </MenuButton>
        <MenuList>
          <TagSetup tagBoolean={dog.service} tagName="Service" setTag={'service'} />
          <TagSetup tagBoolean={dog.therapy} tagName="Therapy" setTag={'therapy'} />
          <TagSetup tagBoolean={dog.staffAdoption} tagName="Stf Adpt" setTag={'staffAdoption'} />
          <TagSetup tagBoolean={dog.specialNeeds} tagName="Special" setTag={'specialNeeds'} />
          <TagSetup tagBoolean={dog.deceased} tagName="Decsd" setTag={'deceased'} />
        </MenuList>
      </Menu>
    );
  };

  const removeDogButton = async () => {
    await backend.delete(`dog/${dog.dogid}`).catch(function (err) {
      console.log(err);
    });
    Navigate('/');
  };

  const saveAllChanges = async () => {
    await backend.put(`dog/${dogId}`, dog).catch(function (err) {
      console.log(err);
    });
    setEditable(!editable);
    setShowButtons(!showButtons);
    console.log(dog);
  };

  const ViewDogYup = ({ setModalStep, onClose, info, setRender, render }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(ViewDogSchema),
    });
  };

  useEffect(() => {
    getFacilities();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
          <div className="dogPic" disabled={!editable}>
            <UploadAvatar width="100px" height="100px" disabled="true" />
          </div>
          <div className="name">
            <div className="nameInput">
              <FormControl>
                <Input
                  disabled={!editable}
                  id="nameField"
                  type="name"
                  placeholder="Enter Name"
                  value={dog.dogname}
                  size="lg"
                  variant="unstyled"
                  {...register('dogname')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['dogname'] = e.target.value;
                    setDog(copy);
                  }}
                />
              </FormControl>
            </div>
          </div>
          {/* <div className="addTag">
          <TagMenu />
        </div> */}
          <div className="tagRow">
            <ShowTags
              serviceTag={dog.service}
              therapyTag={dog.therapy}
              staffAdoptionTag={dog.staffAdoption}
              specialTag={dog.special}
              disabledTag={dog.deceased}
            />
          </div>
          <div className="editButton">
            {!editable && (
              <>
                <ButtonGroup variant="solid" spacing="6" onClick={() => handleEditButton()}>
                  <Button>Edit Dog</Button>
                </ButtonGroup>
              </>
            )}
          </div>
          {showButtons && (
            <div className="changesButtons">
              <ButtonGroup variant="outline" spacing="6">
                <Button>Cancel</Button>
              </ButtonGroup>

              <ButtonGroup variant="outline" spacing="6">
                <Button colorScheme="red">Remove Dog</Button>
              </ButtonGroup>

              <Button colorScheme="facebook" onClick={saveAllChanges}>
                Save All Changes
              </Button>
            </div>
          )}
          ;
        </div>

        <div className="row1">
          <div className="adopterInfo">
            <Text fontSize="24px">Adopter Info</Text>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.adoptername}
                {...register('adoptername')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['adoptername'] = e.target.value;
                  setDog(copy);
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
                {...register('adoptemail')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['adoptemail'] = e.target.value;
                  setDog(copy);
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
                {...register('adopterphone')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['adopterphone'] = e.target.value;
                  setDog(copy);
                }}
              />
            </FormControl>
          </div>

          <div className="dogInfo">
            <Text as="h2" fontSize="24px">
              Dog Info
            </Text>
            <FormControl>
              <FormLabel>Alternate Name</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.altname}
                {...register('altname')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['altname'] = e.target.value;
                  setDog(copy);
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
                {...register('breed')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['breed'] = e.target.value;
                  setDog(copy);
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
                    let copy = { ...dog };
                    copy['gender'] = e.target.value;
                    setDog(copy);
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
                  {...register('age')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['age'] = e.target.value;
                    setDog(copy);
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
                  {...register('chiptype')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['chiptype'] = e.target.value;
                    setDog(copy);
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
                  {...register('chipnum')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['chipnum'] = e.target.value;
                    setDog(copy);
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="row2">
          <div className="addressFinancial">
            <Text as="h2" fontSize="24px">
              Address
            </Text>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                disabled={!editable}
                className="formInput"
                value={dog.addrline}
                {...register('addrline')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['addrline'] = e.target.value;
                  setDog(copy);
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
                  {...register('adoptcity')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['adoptcity'] = e.target.value;
                    setDog(copy);
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
                  {...register('adoptstate')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['adoptstate'] = e.target.value;
                    setDog(copy);
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
                {...register('zip')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['zip'] = e.target.value;
                  setDog(copy);
                }}
              />
            </FormControl>
            <div className="financial">
              <Text fontSize="24px">Financial</Text>
              <div className="financialFields">
                <FormControl className="fees">
                  <FormLabel>Fees ($)</FormLabel>
                  <Input
                    type="text"
                    disabled={!editable}
                    className="formInput"
                    value={dog.fees}
                    {...register('fees')}
                    onChange={e => {
                      let copy = { ...dog };
                      copy['fees'] = e.target.value;
                      setDog(copy);
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
                    {...register('revenue')}
                    onChange={e => {
                      let copy = { ...dog };
                      copy['revenue'] = e.target.value;
                      setDog(copy);
                    }}
                  />
                </FormControl>
              </div>
            </div>
          </div>

          <div className="facilityInfo">
            <Text fontSize="24px">Facility Info</Text>
            <FormLabel>Facility</FormLabel>
            <Select
              disabled={!editable}
              className="formInput"
              value={() => getFacility()}
              {...register('facilityid')}
              onChange={e => {
                let copy = { ...dog };
                copy['facilityid'] = e.target.value;
                setDog(copy);
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
                {...register('facilityUnit')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['facilityUnit'] = e.target.value;
                  setDog(copy);
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
                  {...register('graddate')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['graddate'] = e.target.value;
                    setDog(copy);
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
                  {...register('groupnum')}
                  onChange={e => {
                    let copy = { ...dog };
                    copy['groupnum'] = e.target.value;
                    setDog(copy);
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
                {...register('shelter')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['shelter'] = e.target.value;
                  setDog(copy);
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
                {...register('dogid')}
                onChange={e => {
                  let copy = { ...dog };
                  copy['dogid'] = e.target.value;
                  setDog(copy);
                }}
              />
            </FormControl>
          </div>
        </div>

        <div className="additionalNotesTitle">
          <Text fontSize="24px">Additional Notes</Text>
        </div>
        <Flex direction="column" align="center" justify-content="center">
          <Textarea
            borderWidth={1}
            disabled={!editable}
            name="additionalNotes"
            rows="7"
            width="70%"
            value={dog.notes}
            onChange={e => {
              let copy = { ...dog };
              copy['notes'] = e.target.value;
              setDog(copy);
            }}
          />
        </Flex>
      </form>
    </div>
  );
};

ViewDog.propTypes = {
  dog: PropTypes.shape({
    addrline: PropTypes.string,
    adoptcity: PropTypes.string,
    adoptemail: PropTypes.string,
    adoptername: PropTypes.string,
    adopterphone: PropTypes.number,
    adoptstate: PropTypes.string,
    age: PropTypes.number,
    altname: PropTypes.string,
    breed: PropTypes.string,
    chipnum: PropTypes.number,
    chiptype: PropTypes.string,
    deceased: PropTypes.boolean,
    dogid: PropTypes.number,
    dogname: PropTypes.string,
    facilityUnit: PropTypes.string,
    facilityid: PropTypes.string,
    fees: PropTypes.number,
    gender: PropTypes.string,
    graddate: PropTypes.string,
    groupnum: PropTypes.number,
    revenue: PropTypes.number,
    service: PropTypes.boolean,
    shelter: PropTypes.string,
    specialNeeds: PropTypes.boolean,
    staffAdoption: PropTypes.boolean,
    therapy: PropTypes.boolean,
    zip: PropTypes.number,
  }).isRequired,
};

export default ViewDog;
