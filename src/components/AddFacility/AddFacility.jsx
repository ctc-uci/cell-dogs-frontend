/* eslint-disable */
import {
  Button,
  Input,
  Avatar,
  Textarea,
  Box,
  Flex,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import './AddFacility.css';
import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { BsPlusLg } from 'react-icons/bs';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import CreateToast from '../Toasts/CreateToast';

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

  const Navigate = useNavigate();

  const addFacility = async () => {
    const facilityData = {
      name: facilityName,
      addressLine: address,
      city: 'Irvine',
      state: 'CA',
      zipcode: '92697',
      description: notes,
    };
    await backend.post(`/facility`, facilityData);
    Navigate('/facilities');
  };

  const showFacilityName = () => {
    if (facilityName == '') {
      return 'Enter Name';
    }
    return facilityName;
  };

  const toast = useToast();

  const handleConfirmDelete = async () => {
    try {
      const facilityData = {
        id: id,
      };

      const response = await backend.delete(`/facility/${facilityData.id}`);
      console.log(`Deleted facility with id ${facilityData.id}`);

      onClose();

      // attempting to add toast
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
          <div className="buttons">
            <Button
              className="cancelButton"
              width="250px"
              size="sm"
              color="--cds-blue-2"
              variant="outline"
              onClick={() => Navigate('/facilities')}
            >
              Cancel
            </Button>
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="red" width="250px" size="sm" onClick={onOpen}>
                Remove Facility
              </Button>
            </ButtonGroup>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remove Facility</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to remove the facility from the adoption log? Once you
                  delete them, there is no way of getting the information back
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
                      className="saveButton"
                      width="250px"
                      size="sm"
                      bg="#21307a"
                      color="white"
                      onClick={() => handleConfirmDelete(id)}
                    >
                      Yes, remove the facility
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </Modal>

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
        </div>
        <div className="pointsOfContact">
          <h1 className="POCText">Points of Contact</h1>
          <Button
            size="sm"
            colorScheme="gray"
            color="--cds-grey-1"
            onClick={() => Navigate('/facilities')}
          >
            Add Another Point of Contact
          </Button>
        </div>
        <h3>Facility Name</h3>
        <div className="nameInput">
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
        <div className="pocRow1">
          <div className="pocName">
            <h3>Name</h3>
            <div className="pocNameInput">
              <Input placeholder="Jane Smith" />
            </div>
          </div>
          <div className="pocTitle">
            <h3>Title</h3>
            <div className="pocTitleInput">
              <Input placeholder="Programs Officer" />
            </div>
          </div>
        </div>
        <div className="pocRow2">
          <div className="pocPhoneNumber">
            <h3>Phone Number</h3>
            <div className="pocPhoneNumberInput">
              <Input placeholder="(123)456-7890" />
            </div>
          </div>
          <div className="pocEmail">
            <h3>Email</h3>
            <div className="pocEmailInput">
              <Input placeholder="email@uci.edu" />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default AddFacility;
