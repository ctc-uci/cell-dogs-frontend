import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Image,
  Flex,
  Heading,
  Text,
  Hide,
} from '@chakra-ui/react';
import React from 'react';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';
import './ProfileMenuModal.css';
import { useAuth } from '../contexts/AuthContext';

const ProfileMenuModal = () => {
  const { logout } = useAuth();
  return (
    <Menu>
      <MenuButton
        as={Flex}
        height="100%"
        borderLeftRadius={20}
        bg="rgba(195, 203, 219, 0.2)"
        alignItems="center"
        justifyContent="center"
        _hover={{
          bg: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
        }}
      >
        <Flex height="100%" direction="row" alignItems="center" mx={5}>
          <Image
            margin="auto"
            src={cellDogsSampleProfilePicture}
            alt="Cell Dogs Sample Profile"
            borderRadius={50}
          />
          <Hide below="md">
            <Flex direction="column" color="white">
              <Heading size="sm" color="white">
                Janette Thomas
              </Heading>
              <Text marginLeft="auto" fontSize="xs">
                Exective Director
              </Text>
            </Flex>
          </Hide>
        </Flex>
      </MenuButton>
      <MenuList
        minWidth="300px"
        as={Flex}
        direction="column"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        <Image
          my={3}
          src={cellDogsSampleProfilePicture}
          alt="Cell Dogs Sample Profile"
          borderRadius={50}
        />
        <Text>Janette Thomas</Text>
        <Flex direction="column" alignItems="center" justifyContent="center" mt={5}>
          <Text color="gray.500">test@gmail.com</Text>
          <Text color="gray.500">Exective Director</Text>
        </Flex>
        <Button width="100%" mt={5} onClick={logout} bg="#21307A" color="white">
          Logout
        </Button>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenuModal;
