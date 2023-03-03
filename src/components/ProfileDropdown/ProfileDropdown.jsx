import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';

import cellDogsSampleProfilePicture from '../../assets/CellDogs_sample_profile_picture.png';
import styles from './ProfileDropdown.module.css';

const ProfileDropdown = () => {
  const { currentUser, logout } = useAuth();
  const { backend } = useBackend();
  const [userData, setUserData] = useState({});

  const fetchUserData = async email => {
    const { data: userInfo } = await backend.get(`/users/${email}`);
    setUserData(userInfo);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.email);
    }
  }, []);

  return (
    <Menu>
      <MenuButton
        className={styles['navbar-profile-button']}
        as={Button}
        bg="rgba(195, 203, 219, 0.1)"
        borderRadius="15px 0 0 15px"
        height="100%"
        padding="7px 25px 8px 15px"
        _hover={{ bg: 'none' }}
        _expanded={{ bg: 'rgba(195, 203, 219, 0.2)' }}
      >
        <div className={styles['navbar-user-profile']}>
          <img
            className={styles['profile-pic']}
            src={cellDogsSampleProfilePicture}
            alt="Cell Dogs Sample Profile"
          />
          <div className={styles['profile-text']}>
            <p className={styles['profile-preview-name']}>
              {userData.firstName} {userData.lastName}
            </p>
            <p className={styles['profile-role']}>{userData.role}</p>
          </div>
        </div>
      </MenuButton>
      <MenuList
        border="none"
        filter="drop-shadow(0 3px 10px rgba(0, 0, 0, 0.07))"
        minWidth="320px"
        marginTop="-7px"
      >
        <div className={styles['user-profile-dropdown']}>
          <img
            className={styles['dropdown-pic']}
            src={cellDogsSampleProfilePicture}
            alt="Cell Dogs Sample Profile"
          />
          <p className={styles['dropdown-name']}>
            {userData.firstName} {userData.lastName}
          </p>
          <p className={styles['dropdown-email']}>{currentUser.email}</p>
          <p className={styles['dropdown-role']}>{userData.role}</p>
          <div className={styles.profileMenuButtons}>
            <Button
              className={styles.signOutButton}
              onClick={logout}
              width="250px"
              bg="var(--cds-blue-1)"
              borderRadius="10px"
              color="white"
              marginTop="5px"
              marginBottom="20px"
              _hover={{ bg: 'var(--cds-blue-1)' }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </MenuList>
    </Menu>
  );
};

export default ProfileDropdown;
