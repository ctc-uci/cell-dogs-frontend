/* eslint-disable */
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
import CreateToast from '../Toasts/CreateToast';
import './ViewMore.css';
import UploadAvatar from '../UploadAvatar/UploadAvatar';

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
  console.log(state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelDisclosure = useDisclosure({ id: 'cancel-modal' });
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

  // Create the initial POC list
  const [pocList, setPocList] = useState([]);
  const isLargerThan768 = screenWidthExceeds(768);

  const handleGetPOCs = async () => {
    const res = await backend.get(`/facilityContacts/${state.id}`);
    setPocList(() => {
      const newValues = [];
      for (let poc in res.data) {
        newValues.push({
          id: res.data[poc].id,
          name: res.data[poc].name,
          title: res.data[poc].title,
          phone: res.data[poc].phone_number,
          email: res.data[poc].email_address,
          notes: res.data[poc].notes,
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
    try {
      const facilityData = {
        name: facilityName,
        addressLine: address,
        description: notes,
      };
      const resposne = await backend.put(`facility/${state.id}`, facilityData);
      for (const poc of pocList) {
        if (poc['new']) {
          const pocData = {
            facilityId: state.id,
            name: poc['name'],
            title: poc['title'],
            phoneNumber: poc['phone'],
            emailAddress: poc['email'],
            notes: poc['notes'],
          };
          await backend.post('/facilityContacts', pocData);
        } else {
          const pocData = {
            name: poc['name'],
            title: poc['title'],
            phoneNumber: poc['phone'],
            emailAddress: poc['email'],
            notes: poc['notes'],
          };
          await backend.put(`/facilityContacts/${poc['id']}`, pocData);
        }
      }

      CreateToast({
        description: `Edited facility!`,
        status: 'info',
        toast,
      });

      setEditable(false);
    } catch (error) {
      console.log(error);
      CreateToast({
        description: `Error: ${error.data}`,
        status: 'error',
        toast,
      });
    }
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

  function ShowCancelModal({ isOpen, onClose }) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <WarningIcon w="2rem" h="2rem" color="red.500" marginTop="2rem" />
            <ModalHeader>Changes not saved!</ModalHeader>
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to discard all changes made? By clicking 'Discard all changes' you
            will be sent back to the facilities page.
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
                  onClick={() => Navigate('/facilities')}
                >
                  Discard all changes
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
                  onClick={() => Navigate('/facilities')}
                >
                  Discard all changes
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
    setPocList(prevList => [
      ...prevList,
      { name: '', title: '', phone: '', email: '', notes: '', new: true },
    ]);
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
            <Avatar name={state.name} src={state.image} height="100px" width="100px" />
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
                  onClick={cancelDisclosure.onOpen}
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

                <ShowCancelModal
                  isOpen={cancelDisclosure.isOpen}
                  onClose={cancelDisclosure.onClose}
                  discardNavigationLocation={''}
                />

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
        <h5>Facility Name</h5>
        <div className="facilityNameInput">
          <Input
            disabled={!editable}
            value={facilityName}
            onChange={e => setFacilityName(e.target.value)}
          />
        </div>
        <h5>Address</h5>
        <div className="addressInput">
          <Input disabled={!editable} value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <h5>Notes</h5>
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
            <h4>Points of Contact</h4>
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
                    <div className="pocNotes">
                      <h6>Notes</h6>
                      <div className="pocNotesInput">
                        {PocElement({
                          index: index,
                          name: 'notes',
                          holder: 'This person is awesome',
                        })}
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
                  onClick={cancelDisclosure.onOpen}
                  backgroundColor="white"
                >
                  Cancel
                </Button>

                <ShowCancelModal
                  isOpen={cancelDisclosure.isOpen}
                  onClose={cancelDisclosure.onClose}
                />

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
