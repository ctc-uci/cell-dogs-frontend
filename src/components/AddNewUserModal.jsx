import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
// import styles from './AddNe// wUserModal.module.css';
//
// const AddNewUserModal = () => {
//   return <div className={styles.box}></div>;
// };

const AddNewUserModal = ({ accountModalisOpen, accountModalonOpen, accountModalonClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={accountModalonOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={accountModalisOpen}
        onClose={accountModalonClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input ref={initialRef} placeholder="Full Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Add Email</FormLabel>
              <Input placeholder="Add Email" type="email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Add Role</FormLabel>
              <Input placeholder="Add Roll" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Add Role</FormLabel>
              <Input placeholder="Add Roll" />
            </FormControl>

            <FormControl>
              <Select placeholder="Select Account TYpe">
                <option>Guest</option>
                <option>Administrator</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={accountModalonClose}>Cancel</Button>
            <Button colorScheme="blue" mr={3}>
              Send Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewUserModal;
