/* eslint-disable */
import { Box, Button, Flex, Input, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ShowCancelModal from '../../common/ShowCancelModal';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
import CreateToast from '../Toasts/CreateToast';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import './AddFacility.css';

const AddFacility = () => {
  const [facilityName, setFacilityName] = useState('');
  const [address, setAddress] = useState('');
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
  const [pocList, setPocList] = useState([{ name: '', title: '', phone: '', email: '' }]);

  const Navigate = useNavigate();

  const toast = useToast();
  const addFacility = async () => {
    const facilityData = {
      name: facilityName,
      addressLine: address,
      city: 'Irvine',
      state: 'CA',
      zipcode: '92697',
      description: notes,
    };
    const facility = await backend.post(`/facility`, facilityData);
    console.log(facility);
    for (const poc of pocList) {
      const pocData = {
        facilityId: facility.data[0].id,
        name: poc['name'],
        title: poc['title'],
        phoneNumber: poc['phone'],
        emailAddress: poc['email'],
      };
      await backend.post('/facilityContacts', pocData);
    }
    CreateToast({
      description: `${facilityName} added to the facilities log`,
      status: 'success',
      toast,
    });
    Navigate('/facilities');
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
    setPocList(prevList => [...prevList, { name: '', title: '', phone: '', email: '' }]);
  };

  return (
    <Box>
      <BreadcrumbBar left="Facilities > New Facility">
        <Button
          size="sm"
          colorScheme="gray"
          m={0.1}
          justify="right"
          onClick={() => {
            Navigate('/add-facility');
          }}
        >
          <BsPlusLg />
          Add Facility
        </Button>
      </BreadcrumbBar>
      <Flex width="100%" justifyContent="flex-start" pt={4} ml={10}>
        <Button variant="link" leftIcon={<ArrowBackIcon />} onClick={() => Navigate('/facilities')}>
          Go Back
        </Button>
      </Flex>

      <Box className="facilityModalContent" p={5}>
        <div className="userInfoButtons">
          <div className="placeholder">
            {/* <Avatar height="100px" width="100px" /> */}
            <UploadAvatar width="100px" height="100px" />
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
        <h3>Facility Name</h3>
        <div className="nameInputInAdd">
          <Input
            placeholder="OC Juvenile Hall"
            value={facilityName}
            onChange={e => setFacilityName(e.target.value)}
          />
        </div>
        <h3>Address</h3>
        <div className="addressInput">
          <Input
            placeholder="123 Irvine Way Fountain Valley, CA 92728"
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <h3>Notes</h3>
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
            <h1 className="POCText">Points of Contact</h1>
            {isLargerThan768 && (
              <Button
                size="sm"
                colorScheme="gray"
                color="--cds-grey-1"
                onClick={e => onAddBtnClick(e)}
              >
                Add Another Point of Contact
              </Button>
            )}
          </div>

          {/* Map the Elements inside of the list*/}
          {pocList.map((item, index) => (
            <>
              {isLargerThan768 && (
                <div>
                  <div className="pocRow1">
                    <div className="pocName">
                      <h3>Name</h3>
                      <div className="pocNameInput">
                        {PocElement({ index: index, name: 'name', holder: 'Jane Doe' })}
                      </div>
                    </div>
                    <div className="pocTitle">
                      <h3>Title</h3>
                      <div className="pocTitleInput">
                        {PocElement({ index: index, name: 'title', holder: 'Programs Officer' })}
                      </div>
                    </div>
                  </div>
                  <div className="pocRow2">
                    <div className="pocPhoneNumber">
                      <h3>Phone Number</h3>
                      <div className="pocPhoneNumberInput">
                        {PocElement({ index: index, name: 'phone', holder: '123-456-7890' })}
                      </div>
                    </div>
                    <div className="pocEmail">
                      <h3>Email</h3>
                      <div className="pocEmailInput">
                        {PocElement({ index: index, name: 'email', holder: 'email@uci.edu' })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!isLargerThan768 && (
                <Flex
                  flexDirection="column"
                  borderBottom={index === pocList.length - 1 ? '' : '1px solid #c3cbdb'}
                  marginBottom={index === pocList.length - 1 ? '' : '2rem'}
                >
                  <div className="pocName">
                    <h3>Name</h3>
                    <div className="pocNameInput">
                      {PocElement({ index: index, name: 'name', holder: 'Jane Doe' })}
                    </div>
                  </div>
                  <div className="pocTitle">
                    <h3>Title</h3>
                    <div className="pocTitleInput">
                      {PocElement({ index: index, name: 'title', holder: 'Programs Officer' })}
                    </div>
                  </div>
                  <div className="pocPhoneNumber">
                    <h3>Phone Number</h3>
                    <div className="pocPhoneNumberInput">
                      {PocElement({ index: index, name: 'phone', holder: '123-456-7890' })}
                    </div>
                  </div>
                  <div className="pocEmail">
                    <h3>Email</h3>
                    <div className="pocEmailInput">
                      {PocElement({ index: index, name: 'email', holder: 'email@uci.edu' })}
                    </div>
                  </div>
                </Flex>
              )}
            </>
          ))}
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
