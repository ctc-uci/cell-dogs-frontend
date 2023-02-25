import React, { useRef, useState } from 'react';
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
import { useBackend } from '../contexts/BackendContext';

import styles from './AddNewUserModal.module.css';

const AddNewUserModal = ({ isOpen, onClose }) => {
  const { backend } = useBackend();

  // backend
  //   .post('http://localhost:3001/users')
  //   .then(response => {
  //     const jsonData = response.data;
  //     console.log(jsonData); // or do something else with the data
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // ID, email, first name, last name, facility

  // const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [facility, setFacility] = useState(1); // hard coded for now until the input form is updated
  const facility = 1;
  const id = 10; // hard coded for now until id is fixed
  // const [accountType, setAccountType] = useState('');
  // const [role, setRole] = useState('');

  const handleSendEmail = () => {
    const user = {
      id,
      email,
      firstName,
      lastName,
      facility,
      // accountType,
      // role
    };

    backend
      .post('http://localhost:3001/users', user)
      .then(response => {
        console.log(response.data); // or do something else with the data
        onClose(); // close the modal after successfully adding user
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleNameChange = event => {
    // setFullName(event.target.value);
    setFirstName(event.target.value);
    setLastName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  //   const handleFacilityChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleRoleChange = event => {
  //   setRole(event.target.value);
  // };

  // const handleAccountTypeChange = event => {
  //   setAccountType(event.target.value);
  // };

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
              <Input ref={initialRef} placeholder="Full Name" onChange={handleNameChange} />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Add Email</FormLabel>
              <Input placeholder="Add Email" type="email" onChange={handleEmailChange} />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Add Role</FormLabel>
              {/* <Input placeholder="Add Role" onChange={handleRoleChange} /> */}
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
            <Button className={styles.sendEmailButton} onClick={handleSendEmail}>
              Send Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewUserModal;
