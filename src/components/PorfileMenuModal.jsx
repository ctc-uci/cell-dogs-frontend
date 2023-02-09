import { Menu, MenuButton, MenuList, Button, ChakraProvider, MenuItem } from '@chakra-ui/react';
import React from 'react';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';
import './ProfileMenuModal.css';

const ProfileMenuModal = () => {
  return (
    <ChakraProvider>
      <Menu>
        <MenuButton as={Button} height="100%">
          <div className="navbar-user-profile">
            <img
              id="profilePic"
              src={cellDogsSampleProfilePicture}
              alt="Cell Dogs Sample Profile"
            />
            <div className="profile-text">
              <p className="profile-name-button">Rayvan Dog</p>
              <p className="profile-role">Developer</p>
            </div>
          </div>
        </MenuButton>
        <MenuList minWidth="300px">
          <div className="user-profile-dropdown">
            <img
              className="menuPic"
              src={cellDogsSampleProfilePicture}
              alt="Cell Dogs Sample Profile"
            />
            <p className="profile-name">Rayvan Dog</p>
            <p className="email">rayvandog@gmail.com</p>
            <p className="role">Developer</p>
            <div className="profileMenuButtons">
              <MenuItem>
                <div className="helpButtonWrapper">
                  <Button className="helpButton" colorScheme="blue">
                    {' '}
                    Help{' '}
                  </Button>
                </div>
                <div className="signOutDiv">
                  <Button type="button" className="signOutButton">
                    {' '}
                    Sign Out{' '}
                  </Button>
                </div>
              </MenuItem>
            </div>
          </div>
        </MenuList>
      </Menu>
    </ChakraProvider>
  );
};

export default ProfileMenuModal;
