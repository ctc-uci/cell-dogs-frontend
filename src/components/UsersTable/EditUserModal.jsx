import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  Text,
  ModalFooter,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Select,
  Center,
  VStack,
  HStack,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import CreateToast from '../Toasts/CreateToast';
import { useBackend } from '../../contexts/BackendContext';
import './EditUserModal.css';

// modal to edit user
const EditUser = ({ setModalStep, onClose, info, setRender, render }) => {
  const [user, setUser] = useState({
    fullName: `${info.firstName} ${info.lastName}`,
    email: `${info.email}`,
    role: 'Developer',
  });

  const changeFullName = e => {
    setUser({
      ...user,
      fullName: e.target.value,
    });
  };

  const changeEmail = e => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const changeRole = e => {
    setUser({
      ...user,
      role: e.target.value,
    });
  };

  // save user after changes
  const { backend } = useBackend();
  const save = async () => {
    const splitName = user.fullName.split(' ');
    const usersData = {
      firstName: splitName[0],
      lastName: splitName[1],
      newEmail: user.email,
      facility: 10,
    };
    await backend.put(`users/${info.email}`, usersData);
    setRender(!render);
    onClose()
  };

  return (
    <>
      {/* TODO: include the profile picture */}
      <ModalHeader>
        <Center>Edit User</Center>
      </ModalHeader>
      <ModalBody>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input value={user.fullName} onChange={changeFullName} />
          <FormLabel mt={5}>Add Email</FormLabel>
          <Input value={user.email} onChange={changeEmail} />
          <FormLabel mt={5}>Add Role</FormLabel>
          <Input value={'Developer'} onChange={changeRole} />
          <Select mt={5}>
            <option value="administrator">Administrator</option>
          </Select>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <VStack w="100%">
          <HStack w="100%">
            <Button
              w="50%"
              variant="outline"
              colorScheme="red"
              onClick={() => setModalStep('removeUser')}
            >
              Remove User
            </Button>
            <Button variant="noHover" bg="#21307A" color="white" w="50%" onClick={() => save()}>
              Save
            </Button>
          </HStack>
          <Button w="100%" variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
        </VStack>
      </ModalFooter>
    </>
  );
};

const RemoveUser = ({ setModalStep, onSubmit, onClose }) => {
  return (
    <>
      <ModalBody>
        <Alert
          bg="white"
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon boxSize="48px" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Remove User
          </AlertTitle>
          <AlertDescription>
            <VStack spacing={0}>
              <Text>Are you sure you want to remove this user from the adoption log? </Text>
              <Text> Once you delete them, there is no way of getting the information back </Text>
            </VStack>
          </AlertDescription>
        </Alert>
      </ModalBody>
      <ModalFooter>
        <div className="buttons-container">
          <Button className="button" variant="outline" onClick={() => setModalStep('editUser')}>
            Cancel
          </Button>
          <Button
            className="button"
            bg="CDSBlue1"
            color="white"
            onClick={() => {
              onSubmit();
              onClose();
              // const toast = useToast();
            }}
          >
            Yes, remove the user
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

// modal for the edit user button
const EditUserModal = ({ info, setRender, render, isMobile }) => {
  const [modalStep, setModalStep] = useState('editUser');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // remove user
  const { backend } = useBackend();
  const removeUser = async () => {
    await backend.delete(`users/${info.email}`);
    setRender(!render);
    CreateToast({
      description: `${info.firstName} removed`,
      status: 'info',
      toast,
    });
  };

  useEffect(() => {
    setModalStep('editUser');
  }, [isOpen]);

  const modalContent = {
    editUser: (
      <EditUser
        setModalStep={setModalStep}
        onClose={onClose}
        info={info}
        setRender={setRender}
        render={render}
      />
    ),
    removeUser: (
      <RemoveUser onSubmit={() => removeUser()} setModalStep={setModalStep} onClose={onClose} />
    ),
  };

  const width1 = { true: '130px', false: '60px' };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="solidNoHover"
        bg="
        #319795"
        color="white"
        width={width1[isMobile]}
      >
        Edit
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="modal-content">{modalContent[modalStep]}</ModalContent>
      </Modal>
    </>
  );
};

EditUserModal.propTypes = {
  info: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  setRender: PropTypes.func.isRequired,
  render: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

EditUser.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  info: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

RemoveUser.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditUserModal;
