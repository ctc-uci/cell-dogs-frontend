/* eslint-disable */
import { AddIcon, ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowCancelModal from '../../common/ShowCancelModal';
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
import CreateToast from '../Toasts/CreateToast';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import './AddFacility.css';

const AddFacility = () => {
  const [facilityName, setFacilityName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null); // This is the image that is uploaded
  const [notes, setNotes] = useState('');
  // const [name, setName] = useState('');
  // const [title, setTitle] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const { backend } = useBackend();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const isLargerThan768 = screenWidthExceeds(768);
  const cancelDisclosure = useDisclosure({ id: 'cancel-modal' });

  // This is the the specific component we are updating inside of the list
  const PocElement = ({ index, name, holder }) => {
    const handleChange = event => {
      const value = event.target.value;
      setPocList(prevValues => {
        const newValues = [...prevValues];
        newValues[index] = {
          ...newValues[index],
          [name]: value,
        };
        return newValues;
      });
    };

    return <Input placeholder={holder} value={pocList[index][name]} onChange={handleChange} />;
  };

  // Create the initial POC list
  const [pocList, setPocList] = useState([
    { name: '', title: '', phone: '', email: '', notes: '' },
  ]);

  const Navigate = useNavigate();

  const toast = useToast();
  const addFacility = async () => {
    try {
      const facilityData = {
        name: facilityName,
        addressLine: address,
        image: image,
        description: notes,
      };
      const facility = await backend.post(`/facility`, facilityData);

      for (const poc of pocList) {
        const pocData = {
          facilityId: facility.data[0].id,
          name: poc['name'],
          title: poc['title'],
          phoneNumber: poc['phone'],
          emailAddress: poc['email'],
          notes: poc['notes'],
        };
        await backend.post('/facilityContacts', pocData);
      }

      CreateToast({
        description: `${facilityName} added to the facilities log`,
        status: 'success',
        toast,
      });

      Navigate('/facilities');
    } catch (error) {
      CreateToast({
        description: `Error: ${error.data}`,
        status: 'error',
        toast,
      });
    }
  };

  const showFacilityName = () => {
    if (facilityName == '') {
      return 'Enter Name';
    }
    return facilityName;
  };

  const handleConfirmDelete = async id => {
    try {
      const response = await backend.delete(`/facility/${id}`);

      onClose();

      if (response.status === 200) {
        CreateToast({
          description: `${facilityName} deleted successfully`,
          status: 'success',
          toast,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onAddBtnClick = event => {
    setPocList(prevList => [...prevList, { name: '', title: '', phone: '', email: '', notes: '' }]);
  };

  return (
    <Box>
      <div className="breadcrumbAndAdd">
        <div className="breadcrumb">
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => Navigate('/facilities')}>Facilities</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">New Facility</BreadcrumbLink>
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
        <Button variant="link" leftIcon={<ArrowBackIcon />} onClick={() => Navigate('/facilities')}>
          Go Back
        </Button>
      </Flex>

      <Box className="facilityModalContent" p={5}>
        <div className="userInfoButtons">
          <div className="placeholder">
            {/* <Avatar height="100px" width="100px" /> */}
            <UploadAvatar width="100px" height="100px" setUrl={setImage} />
          </div>
          <div className="modalHeader">
            <h1 className="enterName">{showFacilityName()}</h1>
          </div>
          {isLargerThan768 && (
            <div className="buttons">
              <Button
                className="cancelButton"
                width="250px"
                size="sm"
                color="--cds-blue-2"
                variant="outline"
                onClick={cancelDisclosure.onOpen}
              >
                Cancel
              </Button>

              <ShowCancelModal
                isOpen={cancelDisclosure.isOpen}
                onClose={cancelDisclosure.onClose}
                pageName={'facilities'}
                discardNavigationLocation={'facilities'}
              />

              <Button
                className="saveButton"
                width="250px"
                size="sm"
                bg="#21307a"
                color="white"
                onClick={() => addFacility()}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <h5>Facility Name</h5>
        <div className="nameInputInAdd">
          <Input
            placeholder="OC Juvenile Hall"
            value={facilityName}
            onChange={e => setFacilityName(e.target.value)}
          />
        </div>
        <h5>Address</h5>
        <div className="addressInput">
          <Input
            placeholder="123 Irvine Way Fountain Valley, CA 92728"
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <h5>Notes</h5>
        <div className="notesInput">
          <Textarea
            height="150px"
            padding-top="0px"
            placeholder="Enter notes here"
            onChange={e => setNotes(e.target.value)}
          />
        </div>
        <div className="pointsOfContactContainerInAdd">
          <div className="pointsOfContact">
            <h4>Points of Contact</h4>
          </div>

          {/* Map the Elements inside of the list*/}
          {pocList.map((item, index) => (
            <>
              {isLargerThan768 && (
                <div>
                  <div className="pocRow1">
                    <div className="pocName">
                      <h6>Name</h6>
                      <div className="pocNameInput">
                        {PocElement({ index: index, name: 'name', holder: 'Jane Doe' })}
                      </div>
                    </div>
                    <div className="pocTitle">
                      <h6>Title</h6>
                      <div className="pocTitleInput">
                        {PocElement({ index: index, name: 'title', holder: 'Programs Officer' })}
                      </div>
                    </div>
                  </div>
                  <div className="pocRow2">
                    <div className="pocPhoneNumber">
                      <h6>Phone Number</h6>
                      <div className="pocPhoneNumberInput">
                        {PocElement({ index: index, name: 'phone', holder: '123-456-7890' })}
                      </div>
                    </div>
                    <div className="pocEmail">
                      <h6>Email</h6>
                      <div className="pocEmailInput">
                        {PocElement({ index: index, name: 'email', holder: 'email@uci.edu' })}
                      </div>
                    </div>
                  </div>
                  <div className="pocRow3">
                    <div className="pocNotes">
                      <h6>Notes</h6>
                      <div className="pocNotesInput">
                        {PocElement({
                          index: index,
                          name: 'notes',
                          holder: 'This person is awesome.',
                        })}
                      </div>
                    </div>
                  </div>
                  <Box height="20px" />
                </div>
              )}
              {!isLargerThan768 && (
                <Flex
                  flexDirection="column"
                  borderBottom={index === pocList.length - 1 ? '' : '1px solid #c3cbdb'}
                  marginBottom={index === pocList.length - 1 ? '' : '2rem'}
                >
                  <div className="pocName">
                    <h6>Name</h6>
                    <div className="pocNameInput">
                      {PocElement({ index: index, name: 'name', holder: 'Jane Doe' })}
                    </div>
                  </div>
                  <div className="pocTitle">
                    <h6>Title</h6>
                    <div className="pocTitleInput">
                      {PocElement({ index: index, name: 'title', holder: 'Programs Officer' })}
                    </div>
                  </div>
                  <div className="pocPhoneNumber">
                    <h6>Phone Number</h6>
                    <div className="pocPhoneNumberInput">
                      {PocElement({ index: index, name: 'phone', holder: '123-456-7890' })}
                    </div>
                  </div>
                  <div className="pocEmail">
                    <h6>Email</h6>
                    <div className="pocEmailMobileInput">
                      {PocElement({ index: index, name: 'email', holder: 'email@uci.edu' })}
                    </div>
                  </div>
                  <div className="pocNotes">
                    <h6>Notes</h6>
                    <div className="pocNotesInput">
                      {PocElement({
                        index: index,
                        name: 'notes',
                        holder: 'This facility is awesome.',
                      })}
                    </div>
                  </div>
                </Flex>
              )}
              {index !== 0 && (
                <Flex justifyContent="flex-end" mb={5}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={e => {
                      e.preventDefault();
                      setPocList(pocList.filter((item, i) => index !== i));
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              )}
            </>
          ))}
          {isLargerThan768 && (
            <Flex direction="row" justifyContent="flex-end">
              <Button
                size="sm"
                colorScheme="gray"
                color="--cds-grey-1"
                onClick={e => onAddBtnClick(e)}
              >
                Add Another Point of Contact
              </Button>
            </Flex>
          )}
        </div>
        {!isLargerThan768 && (
          <Flex justify="center">
            <Button
              width="85%"
              colorScheme="gray"
              color="--cds-grey-1"
              onClick={e => onAddBtnClick(e)}
              marginBottom="3rem"
            >
              + Add Contact
            </Button>
          </Flex>
        )}
      </Box>
      <Flex>
        {!isLargerThan768 && (
          <div className="bottomEditButtonInAdd">
            <Flex width="100%" justifyContent="center" gap="2rem" marginBottom="10px">
              <Button
                width="37.75%"
                size="sm"
                color="gray"
                variant="outline"
                onClick={cancelDisclosure.onOpen}
                backgroundColor="white"
              >
                Cancel
              </Button>

              <ShowCancelModal
                isOpen={cancelDisclosure.isOpen}
                onClose={cancelDisclosure.onClose}
                pageName={'Facilities'}
              />

              <Button
                width="37.75%"
                className="saveButton"
                size="sm"
                backgroundColor="#21307A"
                color="white"
                variant="solid"
                onClick={() => addFacility()}
              >
                Save
              </Button>
            </Flex>
          </div>
        )}
      </Flex>
    </Box>
  );
};
export default AddFacility;
