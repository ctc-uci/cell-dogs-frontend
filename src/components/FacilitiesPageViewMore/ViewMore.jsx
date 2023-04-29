/* eslint-disable */
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Editable,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import { ArrowBackIcon, WarningIcon } from '@chakra-ui/icons';
// import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
import CreateToast from '../Toasts/CreateToast';
import './ViewMore.css';

// export const theme = extendTheme({
//   colors: {
//     brand: {
//       50: '#21307a',
//       60: '#c3cbdb',
//       70: '#f6f7fa',
//       80: '#96c93d',
//       90: '#25222a'
//     }
//   }
// })

const ViewMore = () => {
  const [editable, setEditable] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  const { backend } = useBackend();
  const { state } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const Navigate = useNavigate();

  const onCloseFacility = () => {
    Navigate('/facilities');
  };

  const handleEditButton = () => {
    setEditable(!editable);
  };

  const [facilityName, setFacilityName] = useState(state.name);
  const [address, setAddress] = useState(state.addressLine);
  const [notes, setNotes] = useState(state.description);

  // the four below are currently empty in the database
  const [contactName, setContactName] = useState(state.contactPerson);
  const [title, setTitle] = useState(state.title);
  const [phoneNumber, setPhoneNumber] = useState(state.phoneNumber);
  const [email, setEmail] = useState(state.email);
  // Create the initial POC list
  const [pocList, setPocList] = useState([]);
  const isLargerThan768 = screenWidthExceeds(768);

  const handleGetPOCs = async () => {
    const res = await backend.get(`/facilityContacts/${state.id}`);
    console.log(res.data);
    setPocList(() => {
      const newValues = [];
      for (let poc in res.data) {
        newValues.push({
          id: res.data[poc].id,
          name: res.data[poc].name,
          title: res.data[poc].title,
          phone: res.data[poc].phone_number,
          email: res.data[poc].email_address,
          new: false,
        });
      }
      return newValues;
    });
  };

  useEffect(() => {
    handleGetPOCs();
  }, []);

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

    return (
      <Input
        disabled={!editable}
        placeholder={holder}
        value={pocList[index][name]}
        onChange={handleChange}
      />
    );
  };

  const showFacilityName = () => {
    if (facilityName == '') {
      return 'Enter Name';
    }
    return facilityName;
  };

  const saveFacility = async () => {
    const facilityData = {
      name: facilityName,
      addressLine: address,
      description: notes,
    };
    await backend.put(`facility/${state.id}`, facilityData);
    for (const poc of pocList) {
      if (poc['new']) {
        const pocData = {
          facilityId: state.id,
          name: poc['name'],
          title: poc['title'],
          phoneNumber: poc['phone'],
          emailAddress: poc['email'],
        };
        await backend.post('/facilityContacts', pocData);
      } else {
        const pocData = {
          name: poc['name'],
          title: poc['title'],
          phoneNumber: poc['phone'],
          emailAddress: poc['email'],
        };
        await backend.put(`/facilityContacts/${poc['id']}`, pocData);
      }
    }
    setEditable(false);
  };

  function ShowModal({ isOpen, onClose }) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <WarningIcon w="2rem" h="2rem" color="red.500" marginTop="2rem" />
            <ModalHeader>Remove Facility</ModalHeader>
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove the facility from the adoption log? Once you delete
            them, there is no way of getting the information back
          </ModalBody>
          {isLargerThan768 && (
            <ModalFooter width="100%" display="flex" justifyContent="space-between">
              <Button
                className="cancelButton"
                // width="250px"
                width="16rem"
                size="sm"
                color="--cds-blue-2"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  className="deleteButton"
                  width="12rem"
                  size="sm"
                  bg="#21307a"
                  color="white"
                  onClick={() => handleConfirmDelete(state.id)}
                >
                  Yes, remove the facility
                </Button>
              </ButtonGroup>
            </ModalFooter>
          )}
          {!isLargerThan768 && (
            <ModalFooter width="100%" display="flex" flexDirection="column" gap="10px">
              <ButtonGroup variant="outline" spacing="6" width="100%">
                <Button
                  className="deleteButton"
                  size="sm"
                  width="100%"
                  bg="#21307a"
                  color="white"
                  onClick={() => handleConfirmDelete(state.id)}
                >
                  Yes, remove the facility
                </Button>
              </ButtonGroup>
              <Button
                className="cancelButton"
                width="100%"
                size="sm"
                color="--cds-blue-2"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    );
  }

  const handleConfirmDelete = async id => {
    try {
      let response = await backend.delete(`/facility/${id}`);

      onClose();

      if (response.status === 200) {
        CreateToast({
          description: `${facilityName} deleted successfully`,
          status: 'success',
          toast,
        });
      }

      response = await backend.delete(`/facilityContacts/${id}`);
      if (response.status === 200) {
        Navigate('/facilities');
      }
    } finally {
      setLoading(false);
    }
  };

  const onAddBtnClick = event => {
    setPocList(prevList => [...prevList, { name: '', title: '', phone: '', email: '', new: true }]);
  };

  return (
    <Box>
      <BreadcrumbBar left={'Facilities > ' + showFacilityName()}>
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
        <Button
          variant="link"
          leftIcon={<ArrowBackIcon />}
          onClick={onCloseFacility}
          color="#4A5568"
        >
          Go Back
        </Button>
      </Flex>
      <Box className="facilityModalContent" p={5}>
        <div className="userInfoButtons">
          <div className="placeholder">
            <Avatar height="100px" width="100px" />
          </div>
          <div className="modalHeader">
            <h1 className={`enterName ${!isLargerThan768 && 'mobileLower'}`}>
              {showFacilityName()}
            </h1>
          </div>
          <div className="buttons">
            {!editable && isLargerThan768 && (
              <>
                <Button
                  size="sm"
                  color="#2D3748"
                  backgroundColor="#EDF2F7"
                  variant="outline"
                  onClick={() => handleEditButton()}
                >
                  Edit
                </Button>
              </>
            )}

            {/* <DeleteFacility id={state.id} /> */}

            {editable && isLargerThan768 && (
              <>
                <Button
                  width="142.67px"
                  size="sm"
                  color="gray"
                  variant="outline"
                  onClick={() => handleEditButton()}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  width="142.67px"
                  onClick={onOpen}
                  marginLeft="7px"
                >
                  Remove Facility
                </Button>

                <ShowModal isOpen={isOpen} onClose={onClose} />

                <Button
                  className="saveButton"
                  size="sm"
                  colorScheme="blue"
                  variant="solid"
                  width="142.67px"
                  onClick={() => saveFacility()}
                >
                  Save All Changes
                </Button>
              </>
            )}
          </div>
        </div>
        <h3>Facility Name</h3>
        <div className="facilityNameInput">
          <Input
            disabled={!editable}
            value={facilityName}
            onChange={e => setFacilityName(e.target.value)}
          />
        </div>
        <h3>Address</h3>
        <div className="addressInput">
          <Input disabled={!editable} value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <h3>Notes</h3>
        <div className="notesInput">
          <Textarea
            disabled={!editable}
            height="150px"
            padding-top="0px"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
        <div className="pointsOfContactContainer">
          <div className="pointsOfContact">
            <h1 className="POCText">Points of Contact</h1>
            {isLargerThan768 && (
              <Button
                disabled={!editable}
                size="sm"
                colorScheme="gray"
                color="--cds-grey-1"
                onClick={e => onAddBtnClick(e)}
                isDisabled={!editable}
              >
                Add Another Point of Contact
              </Button>
            )}
          </div>
          {/* Map the Elements inside of the list*/}
          <div className="pocEntireThing">
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
                marginTop="2rem"
                isDisabled={!editable}
              >
                + Add Contact
              </Button>
            </Flex>
          )}
        </div>
      </Box>
      <Flex justifyContent="center">
        {!editable && !isLargerThan768 && (
          <div className="bottomEditButton">
            <Button
              width="80%"
              color="white"
              backgroundColor="#21307A"
              onClick={() => handleEditButton()}
              marginBottom="2rem"
            >
              Edit
            </Button>
          </div>
        )}
        {editable && !isLargerThan768 && (
          <div className="bottomPostEditButton">
            <Flex flexDirection="column" gap="1rem" marginBottom="10px">
              <Flex justifyContent="center">
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={onOpen}
                  marginLeft="7px"
                  backgroundColor="white"
                  width="80%"
                >
                  Remove Facility
                </Button>
              </Flex>
              <Flex width="100%" justifyContent="center" gap="2rem">
                <Button
                  width="37%"
                  size="sm"
                  color="gray"
                  variant="outline"
                  onClick={() => handleEditButton()}
                  backgroundColor="white"
                >
                  Cancel
                </Button>

                <ShowModal isOpen={isOpen} onClose={onClose} />

                <Button
                  width="37%"
                  className="saveButton"
                  size="sm"
                  backgroundColor="#21307A"
                  color="white"
                  variant="solid"
                  onClick={() => saveFacility()}
                >
                  Save All Changes
                </Button>
              </Flex>
            </Flex>
          </div>
        )}
      </Flex>
    </Box>
  );
};
export default ViewMore;
