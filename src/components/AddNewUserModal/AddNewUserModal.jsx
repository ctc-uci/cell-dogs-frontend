import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  ModalCloseButton,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useBackend } from '../../contexts/BackendContext';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import CreateToast from '../Toasts/CreateToast';

const AddNewUserModal = ({ isOpen, onClose }) => {
  const { backend } = useBackend();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // ID, email, first name, last name, facility

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const facility = 1;

  const toast = useToast();

  const handleSendEmail = async () => {
    try {
      const user = {
        email,
        firstName,
        lastName,
        facility,
      };
      setLoading(true);

      const response = await backend.post('/users', user);

      onClose();

      // attempting to add toast
      if (response.status === 200) {
        CreateToast({
          description: `${user.firstName} invited to the adoption log`,
          status: 'success',
          toast,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = event => {
    setFirstName(event.target.value.split(' ')[0]);
    setLastName(event.target.value.split(' ')[1]);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={2} width="100%" mt={4}>
              {/* <Avatar /> */}
              <UploadAvatar />
              <Heading fontWeight={500} size="md">
                Add New User
              </Heading>

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
              <Flex direction="row" width="100%" gap={2} pt={3}>
                <Button flex={1} color="black" variant="outline">
                  Cancel
                </Button>
                <Button
                  flex={1}
                  bg="#21307A"
                  color="white"
                  onClick={() => {
                    handleSendEmail();
                  }}
                  isLoading={loading}
                >
                  Send Email
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewUserModal;
