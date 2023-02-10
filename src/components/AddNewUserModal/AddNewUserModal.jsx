import React, { useRef } from 'react';

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
  Avatar,
} from '@chakra-ui/react';

import styles from './AddNewUserModal.module.css';

const AddNewUserModal = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent className={styles.box} m={8}>
          <ModalHeader className={styles.modalHeader}>
            <Avatar className={styles.profilePic} />
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
              <Input placeholder="Add Role" />
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
