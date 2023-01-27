import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import './AddFacilityModal.css';

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

const AddFacilityModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior] = React.useState('inside');

  return (
    <>
      <div className="addFacilityModal">
        <Button onClick={onOpen}>+ Add Facility</Button>
        <Modal
          size="full"
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior={scrollBehavior}
          isCentered
        >
          <ModalOverlay />
          <ModalContent className="facilityModalContent">
            <img src="./../images/Avatar.png" alt="Avatar" />
            {/* <div className="uploadButton">
              <Button colorScheme="white" mr={3} onClick={onClose}>
                <AddIcon boxSize={2} />
                Upload Picture
              </Button>
            </div> */}
            <div className="modalHeader">
              <ModalHeader>
                <h1>Enter Name</h1>
              </ModalHeader>
            </div>
            <ModalFooter display="flex" justifyContent="center">
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
              <Button
                className="saveButton"
                width="250px"
                size="sm"
                bg="#21307a"
                color="white"
                onClick={onClose}
              >
                Save
              </Button>
            </ModalFooter>
            <ModalCloseButton />
            <ModalBody>
              <div className="pointsOfContact">
                <h1>Points of Contact</h1>
                <Button size="sm" colorScheme="gray" color="--cds-grey-1" onClick={onClose}>
                  Add Another Point of Contact
                </Button>
              </div>
              <h3>Facility Name</h3>
              <div className="nameInput">
                <Input placeholder="OC Juvenile Hall" />
              </div>
              <h3>Address</h3>
              <div className="addressInput">
                <Input placeholder="123 Irvine Way Fountain Valley, CA 92728" />
              </div>
              <h3>Notes</h3>
              <div className="notesInput">
                <Input height="150px" padding-top="0px" placeholder="Enter notes here" />
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default AddFacilityModal;
