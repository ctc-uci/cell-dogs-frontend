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
import FormSection from './Form/FormSection';
import { useNavigate } from 'react-router-dom';
import ShowCancelModal from '../../common/ShowCancelModal';
import AddDogSchema from './AddDog.yup';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import { useBackend } from '../../contexts/BackendContext';
import { yupResolver } from '@hookform/resolvers/yup';
import './AddDog.css';
import AdopterInfoSchema from './Form/FormSchemas/AdopterInfoSchema';
import AdopterAddressSchema from './Form/FormSchemas/AdopterAddressSchema';
import DogInfoSchema from './Form/FormSchemas/DogInfoSchema';
import NotesSchema from './Form/FormSchemas/NotesSchema';
import FacilityInfoSchema from './Form/FormSchemas/FacilityInfoSchema';

import FinancialInfoSchema from './Form/FormSchemas/FinancialInfoSchema';
import ShowTags from './ShowTags';
import { useForm } from 'react-hook-form';
const AddDog = () => {
  const { backend } = useBackend();
  const Navigate = useNavigate();

  const [specialTag, setSpecialTag] = useState(false);
  const [therapyTag, setTherapyTag] = useState(false);
  const [staffAdoptionTag, setStaffAdoptionTag] = useState(false);
  const [deceasedTag, setDeceasedTag] = useState(false);
  const [serviceTag, setServiceTag] = useState(false);
  const [facility, setFacilities] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const cancelDisclosure = useDisclosure({ id: 'cancel-modal' });

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, values },
    reset,
  } = useForm({
    resolver: yupResolver(AddDogSchema),
  });

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
      ...values,
      specialTag,
      therapyTag,
      staffAdoptionTag,
      deceasedTag,
      serviceTag,
      image: avatar,
    };
    console.log(toSend);
    await backend.post('/dog', {
      ...toSend,
    });

    Navigate('/');
    toast({
      position: 'bottom-right',
      description: 'Dog added successfully',
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
            <UploadAvatar width="100px" height="100px" setUrl={setAvatar} />
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
                  value={values?.dogname}
                  {...register('dogname')}
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
              <Button colorScheme="facebook" type="submit">
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
        <ShowCancelModal
          isOpen={cancelDisclosure.isOpen}
          onClose={cancelDisclosure.onClose}
          pageName={'adoption log'}
          discardNavigationLocation={''}
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
