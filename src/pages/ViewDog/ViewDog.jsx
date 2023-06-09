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
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormSection from '../AddDog/Form/FormSection';
import ShowCancelModal from '../../common/ShowCancelModal';
import AddDogSchema from '../AddDog/AddDog.yup';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import { useBackend } from '../../contexts/BackendContext';
import '../AddDog/AddDog.css';
import AdopterInfoSchema from '../AddDog/Form/FormSchemas/AdopterInfoSchema';
import AdopterAddressSchema from '../AddDog/Form/FormSchemas/AdopterAddressSchema';
import DogInfoSchema from '../AddDog/Form/FormSchemas/DogInfoSchema';
import NotesSchema from '../AddDog/Form/FormSchemas/NotesSchema';
import FacilityInfoSchema from '../AddDog/Form/FormSchemas/FacilityInfoSchema';

import FinancialInfoSchema from '../AddDog/Form/FormSchemas/FinancialInfoSchema';
import ShowTags from '../AddDog/ShowTags';

const AddDog = () => {
  const { backend } = useBackend();
  const { id: dogId } = useParams();
  const Navigate = useNavigate();

  const [name, setName] = useState('');

  const [dogdata, setDogData] = useState({});

  const [specialTag, setSpecialTag] = useState(false);
  const [therapyTag, setTherapyTag] = useState(false);
  const [staffAdoptionTag, setStaffAdoptionTag] = useState(false);
  const [deceasedTag, setDeceasedTag] = useState(false);
  const [serviceTag, setServiceTag] = useState(false);
  const [facility, setFacilities] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const cancelDisclosure = useDisclosure({ id: 'cancel-modal' });
  const removeDogButton = async () => {
    const confirm = window.confirm('Are you sure you want to delete this dog?');
    console.log(confirm);

    if (!confirm) return;
    await backend.delete(`dog/${dogId}`).catch(function (err) {
      console.log(err);
    });
    Navigate('/');
  };
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, values },
    reset,
  } = useForm({
    resolver: yupResolver(AddDogSchema),
  });

  useEffect(() => {
    console.log(name);
  }, [name]);
  useEffect(() => {
    const getDogData = async () => {
      const { data } = await backend.get(`/dog/${dogId}`);
      setDogData(data);
      const transformed = {};
      Object.keys(data[0]).forEach(element => {
        transformed[element] = data[0][element];
        switch (element) {
          case 'graddate':
            setValue(element, new Date(data[0][element]).toISOString().slice(0, 10));
            break;
          case 'adoptemail':
            console.log(data[0]['adoptemail']);
            setValue('adopteremail', data[0][element]);
            break;
          case 'adoptcity':
            console.log(data[0]['adoptcity']);
            setValue('adoptercity', data[0][element]);
            break;
          case 'adoptstate':
            console.log(data[0]['adoptstate']);
            setValue('adopterstate', data[0][element]);
            break;
          case 'zip':
            console.log(data[0]['zip']);
            setValue('adopterzip', data[0][element]);
            break;
          case 'addrline':
            console.log(data[0]['addrline']);
            setValue('adopteraddrline', data[0][element]);
            break;
          default:
            setValue(element, data[0][element]);
        }
      });
      if (data[0].specialNeeds) setSpecialTag(true);
      if (data[0].therapy) setTherapyTag(true);
      if (data[0].staffAdoption) setStaffAdoptionTag(true);
      if (data[0].deceased) setDeceasedTag(true);
      if (data[0].service) setServiceTag(true);
      setAvatar(data[0].image);
    };
    getDogData();
  }, []);

  const watchName = watch('name');
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value);
      setName(value?.dogname);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
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

  const onSubmit = async values => {
    const toSend = {
      dogId: dogId,
      ...values,
      specialTag,
      therapyTag,
      staffAdoptionTag,
      deceasedTag,
      serviceTag,
      image: avatar,
    };
    await backend.put(`/dog/${dogId}`, {
      ...toSend,
    });

    Navigate('/');
    toast({
      position: 'bottom-right',
      description: 'Dog updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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

  useEffect(() => {
    getFacilities();
  }, []);
  return (
    <Flex direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Location /> */}
        <div className="breadcrumbAndAdd">
          <div className="breadcrumb">
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => Navigate('/')}>Adoption Log</BreadcrumbLink>
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
            <UploadAvatar width="100px" height="100px" url={avatar} setUrl={setAvatar} />
          </div>
          <div className="name">
            <div className="nameInput">
              <FormControl>
                <Input
                  id="nameField"
                  type="name"
                  placeholder="Enter Name Below"
                  size="lg"
                  variant="unstyled"
                  value={name}
                  disabled={!name}
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
              <ButtonGroup variant="outline" spacing="6" onClick={cancelDisclosure.onOpen}>
                <Button>Cancel</Button>
              </ButtonGroup>
            </div>
            <div className="saveButton">
              <Button colorScheme="red" onClick={removeDogButton}>
                Delete Dog
              </Button>
            </div>
            <div className="saveButton">
              <Button colorScheme="facebook" type="submit">
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
        <ShowCancelModal
          isOpen={cancelDisclosure.isOpen}
          onClose={cancelDisclosure.onClose}
          pageName="adoption log"
          discardNavigationLocation=""
        />

        <Flex width="100%" alignItems="center" gap={10} id="FormWrapper" direction="column" mb={10}>
          <Flex
            width="min(100%, 1200px)"
            direction={{
              base: 'column',
              md: 'row',
            }}
            px={{
              base: 10,
              md: 0,
            }}
            justifyContent="space-between"
            gap={10}
          >
            <FormSection
              title="Adopter Information"
              schema={AdopterInfoSchema}
              register={register}
              errors={errors}
            />
            <FormSection
              title="Dog Information"
              schema={DogInfoSchema}
              register={register}
              errors={errors}
            />
          </Flex>
          <Flex
            width="min(100%, 1200px)"
            direction={{
              base: 'column',
              md: 'row',
            }}
            px={{
              base: 10,
              md: 0,
            }}
            justifyContent="space-between"
            gap={10}
          >
            <FormSection
              title="Address Information"
              schema={AdopterAddressSchema}
              register={register}
              errors={errors}
            />
            <FormSection
              title="Facility Information"
              schema={FacilityInfoSchema}
              register={register}
              errors={errors}
            />
          </Flex>

          <Flex
            width="min(100%, 1200px)"
            direction={{
              base: 'column',
              md: 'row',
            }}
            px={{
              base: 10,
              md: 0,
            }}
            justifyContent="space-between"
            gap={10}
          >
            <FormSection
              title="Finacial Information"
              schema={FinancialInfoSchema}
              register={register}
              errors={errors}
            />
            <FormSection
              title="Additional Information"
              schema={NotesSchema}
              register={register}
              errors={errors}
            />
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddDog;
