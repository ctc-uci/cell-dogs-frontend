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
import { AddIcon } from '@chakra-ui/icons';
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
  return (
    <>
      <div className="addFacilityModal">
        <Button onClick={onOpen}>+ Add Facility</Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <img src="./../images/Avatar.png" alt="Avatar" />
            <div className="uploadButton">
              <Button colorScheme="white" mr={3} onClick={onClose}>
                <AddIcon boxSize={2} />
                Upload Picture
              </Button>
            </div>
            <div className="modalHeader">
              <ModalHeader>Add Facility</ModalHeader>
            </div>
            <ModalCloseButton />
            <ModalBody>
              <p>Name</p>
              <div className="nameInput">
                <Input placeholder="OC Juvenile Hall" />
              </div>
              <p>Address</p>
              <div className="addressInput">
                <Input placeholder="123 Irvine Way Fountain Valley, CA 92728" />
              </div>
              <p>Notes</p>
              <div className="notesInput">
                <Input placeholder="Enter notes here" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onClose}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default AddFacilityModal;
