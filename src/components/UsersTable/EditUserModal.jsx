import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBackend } from '../../contexts/BackendContext';
import CreateToast from '../Toasts/CreateToast';
import EditUserSchema from './EditUser.schema';
import './EditUserModal.css';

// modal to edit user
const EditUser = ({ setModalStep, onClose, info, setRender, render }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(EditUserSchema),
  });

  // save user after changes
  const { backend } = useBackend();
  const onSubmitHandler = async data => {
    const { fullName, email } = data;
    const splitName = fullName.split(' ');
    const usersData = {
      firstName: splitName[0],
      lastName: splitName[1],
      newEmail: email,
      facility: 10,
    };
    await backend.put(`users/${info.email}`, usersData);
    setRender(!render);
    onClose();

    reset();
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <>
      {/* TODO: include the profile picture */}
      <ModalHeader>
        <Center>Edit User</Center>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {/* Form Control for every input */}
          <FormControl isInvalid={errors?.fullName}>
            <FormLabel>Full Name</FormLabel>
            {/* Notice how we dont need to use states */}
            <Input {...register('fullName')} />
            <FormErrorMessage>{errors?.fullName && errors?.fullName?.message}</FormErrorMessage>
          </FormControl>
          {/* Notice how we dont need to use states */}

          <FormControl isInvalid={errors?.email}>
            <FormLabel mt={5}>Add Email</FormLabel>
            <Input {...register('email')} />
            <FormErrorMessage>{errors?.email && errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors?.role}>
            <FormLabel mt={5}>Add Role</FormLabel>
            {/* Notice how we dont need to use states */}

            <Select mt={5} {...register('role')} defaultValue={info.role}>
              <option value="administrator">Administrator</option>
            </Select>
            <FormErrorMessage>{errors?.role && errors?.role?.message}</FormErrorMessage>
          </FormControl>
          <HStack w="100%" mt={5}>
            <Button
              w="50%"
              variant="outline"
              colorScheme="red"
              onClick={() => setModalStep('removeUser')}
            >
              Remove User
            </Button>
            {/* Notice how this is type="submit" and there's not callback */}
            <Button variant="noHover" bg="#21307A" color="white" w="50%" type="submit">
              Save
            </Button>
          </HStack>
        </form>
      </ModalBody>

      <ModalFooter>
        <VStack w="100%">
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
