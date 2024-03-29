import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import CreateToast from '../Toasts/CreateToast';
import UploadAvatar from '../UploadAvatar/UploadAvatar';

const AddNewUserModal = ({ isOpen, onClose }) => {
  const { backend } = useBackend();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // ID, email, first name, last name, facility

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [accountType, setAccountType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const facility = 1;

  const toast = useToast();

  const handleSendEmail = async () => {
    try {
      const user = {
        email,
        firstName,
        lastName,
        facility,
        role,
        accountType,
        image,
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
    } catch (error) {
      CreateToast({
        description: `Invitation failed: ${error.data}`,
        status: 'error',
        toast,
      });
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

  const handleRoleChange = event => {
    setRole(event.target.value);
  };

  const handleAccountTypeChange = event => {
    setAccountType(event.target.value);
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
              <UploadAvatar setUrl={setImage} />
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
                <Input placeholder="Add Role" onChange={handleRoleChange} />
              </FormControl>

              <FormControl mt={6}>
                <Select placeholder="Select Account Type" onChange={handleAccountTypeChange}>
                  <option>Guest</option>
                  <option>Administrator</option>
                </Select>
              </FormControl>
              <Flex direction="row" width="100%" gap={2} pt={3}>
                <Button flex={1} color="black" variant="outline" onClick={() => onClose()}>
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
