import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

import newProfilePic from '../assets/new-user-avatar.svg';
import styles from './AddNewUserModal.module.css';
//
// const AddNewUserModal = () => {
//   return <div className={styles.box}></div>;
// };

const AddNewUserModal = ({ isOpen, onClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className={styles.box} maxW="56vw" m={8}>
          <ModalHeader className={styles.modalHeader}>
            <img
              src={newProfilePic}
              className={styles.profilePic}
              alt="A default profile for new users"
            />
            Add New User
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input ref={initialRef} placeholder="Full Name" />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Add Email</FormLabel>
              <Input placeholder="Add Email" type="email" />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Add Role</FormLabel>
              <Input placeholder="Add Roll" />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Add Role</FormLabel>
              <Input placeholder="Add Roll" />
            </FormControl>

            <FormControl mt={6}>
              <Select placeholder="Select Account Type">
                <option>Guest</option>
                <option>Administrator</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter className={styles.buttonContainer}>
            <Button onClick={onClose}>Cancel</Button>
            <Button className={styles.sendEmailButton}>Send Email</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewUserModal;
