import { Menu, MenuButton, MenuList, MenuItem, Button, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';

const ProfileMenuModal = () => {
  return (
    <ChakraProvider>
      <Menu>
        <MenuButton as={Button} height="100%">
          <div className="navbar-user-profile">
            <img src={cellDogsSampleProfilePicture} alt="Cell Dogs Sample Profile" />
            <div className="profile-text">
              <p className="profile-name">Rayvan Dog</p>
              <p className="profile-role">Developer</p>
            </div>
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <div className="user-profile-dropdown">
              <img src={cellDogsSampleProfilePicture} alt="Cell Dogs Sample Profile" />
              <p className="profile-name">Rayvan Dog</p>
              <p className="email">rayvandog@gmail.com</p>
              <p className="role">Developer</p>
              <div className="profileMenuButtons">
                <div className="helpButtonWrapper">
                  <Button className="helpButton" colorScheme="green" width="20px">
                    Help
                  </Button>
                </div>
                <div className="signOutDiv">
                  <Button className="signOutButton" colorScheme="red" width="20px">
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </ChakraProvider>
  );
};

export default ProfileMenuModal;
