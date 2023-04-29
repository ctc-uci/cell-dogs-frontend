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
import { ArrowBackIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
  const isLargerThan768 = screenWidthExceeds(768);

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
    setEditable(false);
  };

  function ShowModal({ isOpen, onClose }) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Facility</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove the facility from the adoption log? Once you delete
            them, there is no way of getting the information back
          </ModalBody>

          <ModalFooter>
            <Button
              className="cancelButton"
              width="250px"
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
                width="250px"
                size="sm"
                bg="#21307a"
                color="white"
                onClick={() => handleConfirmDelete(state.id)}
              >
                Yes, remove the facility
              </Button>
            </ButtonGroup>
          </ModalFooter>
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
                  //width="62.5px"
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
                size="sm"
                colorScheme="gray"
                color="--cds-grey-1"
                onClick={() => Navigate('/facilities')}
              >
                Add Another Point of Contact
              </Button>
            )}
          </div>
          {isLargerThan768 && (
            <div>
              <div className="pocRow1">
                <div className="pocName">
                  <h3>Name</h3>
                  <div className="pocNameInput">
                    <Input
                      disabled={!editable}
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pocTitle">
                  <h3>Title</h3>
                  <div className="pocTitleInput">
                    <Input
                      disabled={!editable}
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      marginTop="-0.3rem"
                    />
                  </div>
                </div>
              </div>
              <div className="pocRow2">
                <div className="pocPhoneNumber">
                  <h3>Phone Number</h3>
                  <div className="pocPhoneNumberInput">
                    <Input
                      disabled={!editable}
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pocEmail">
                  <h3>Email</h3>
                  <div className="pocEmailInput">
                    <Input
                      disabled={!editable}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLargerThan768 && (
            <div>
              <div className="pocName">
                <h3>Name</h3>
                <div className="pocNameInput">
                  <Input
                    disabled={!editable}
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                  />
                </div>
              </div>
              <div className="pocTitle">
                <h3>Title</h3>
                <div className="pocTitleInput">
                  <Input
                    disabled={!editable}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="pocPhoneNumber">
                <h3>Phone Number</h3>
                <div className="pocPhoneNumberInput">
                  <Input
                    disabled={!editable}
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="pocEmail">
                <h3>Email</h3>
                <div className="pocEmailInput">
                  <Input
                    disabled={!editable}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {!isLargerThan768 && (
            <Flex justify="center">
              <Button
                width="85%"
                colorScheme="gray"
                color="--cds-grey-1"
                onClick={() => Navigate('/facilities')}
                marginTop="2rem"
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
                  colorScheme="blue"
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

// idk if this works lol
ViewMore.propTypes = {
  facilityName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};
