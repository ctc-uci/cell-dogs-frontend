import React, { useRef, useState } from 'react';
// import { useToast } from '@chakra-ui/react';
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
  // Avatar,
  VStack,
  Heading,
  ModalCloseButton,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useBackend } from '../../contexts/BackendContext';
import CreateToast from '../Toasts/CreateToast';
// import UploadAvatar from '../UploadAvatar/UploadAvatar';
import UploadAvatar from '../UploadAvatar/UploadAvatar';

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
  const [loading, setLoading] = useState(false);
  // const [facility, setFacility] = useState(1); // hard coded for now until the input form is updated
  const facility = 1;
  // const id = 10; // hard coded for now until id is fixed
  // const [accountType, setAccountType] = useState('');
  // const [role, setRole] = useState('');
  // const toast = useToast();

  // const successToast = CreateToast('{user.firstName} invited to the adoption log', 'success');

  // return (
  //   <div>
  //     <Input type="file" onChange={handleAvatarChange} />
  //     {avatar && <Image src={avatar} boxSize="150px" objectFit="cover" />}
  //   </div>
  // );

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
      // console.log(response.status);

      // attempting to add toast
      if (response.status === 200) {
        console.log('inside 200 ');
        CreateToast({
          description: `michelle invited to the adoption log`,
          status: 'success',
          toast: { toast },
        });
        //   // toast({
        //   //   position: 'bottom-right',
        //   //   description: `${user.firstName} invited to the adoption log`,
        //   //   status: 'success',
        //   //   duration: 3000,
        //   //   isClosable: true,
        //   // });
        //   // <CreateToast description={(`${user.firstName} invited to the adoption log`, 'success')} />;
      } else if (response.status <= 499) {
        // CreateToast(`${user.firstName} unable to be invited to the adoption log`, 'error', toast);
        //   toast({
        //     position: 'bottom-right',
        //     description: `${user.firstName} invited to the adoption log`,
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        //   // <CreateToast
        //   //   description={(`${user.firstName} unable to be invited to the adoption log`, 'error')}
        //   // />;
        // }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = event => {
    // setFullName(event.target.value);
    setFirstName(event.target.value.split(' ')[0]);
    setLastName(event.target.value.split(' ')[1]);
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
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={2} width="100%" mt={4}>
              {/* <Avatar
                // onClick={() => {
                //   console.log('it worked');
                // }}
                // onClick={() => {
                //   handleAvatarChange();
                // }}
              /> */}
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
                    // CreateToast({
                    //   description: `${firstName} added to adoption log`,
                    //   status: 'success',
                    //   toast: { toast },
                    // });
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
