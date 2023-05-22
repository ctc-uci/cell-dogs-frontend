import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';

import cellDogsSampleProfilePicture from '../../assets/CellDogs_sample_profile_picture.png';
import styles from './ProfileDropdown.module.css';

const ProfileDropdown = ({ mobile }) => {
  const { currentUser, logout } = useAuth();
  const { backend } = useBackend();
  const [userData, setUserData] = useState({});

  const fetchUserData = async email => {
    if (!email) {
      return;
    }
    const { data: userInfo } = await backend.get(`/users/${email}`);
    setUserData(userInfo);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser?.email);
    }
  }, []);

  return (
    <Menu>
      {mobile ? (
        <MenuButton>
          <img
            className={styles['profile-pic']}
            src={userData?.image || cellDogsSampleProfilePicture}
            alt="Cell Dogs Sample Profile"
          />
        </MenuButton>
      ) : (
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
              src={userData?.image || cellDogsSampleProfilePicture}
              alt="Cell Dogs Sample Profile"
            />
            <div className={styles['profile-text']}>
              <p className={styles['profile-preview-name']}>
                {userData?.firstName} {userData?.lastName}
              </p>
              {/* <p className={styles['profile-role']}>{userData?.role}</p> */}
              <p className={styles['profile-role']}>{userData?.role}</p>
            </div>
          </div>
        </MenuButton>
      )}
      <MenuList
        border="none"
        filter="drop-shadow(0 3px 10px rgba(0, 0, 0, 0.07))"
        minWidth="320px"
        marginTop={mobile ? '5px' : '-7px'}
      >
        <div className={styles['user-profile-dropdown']}>
          <img
            className={styles['dropdown-pic']}
            src={userData?.image || cellDogsSampleProfilePicture}
            alt="Cell Dogs Sample Profile"
          />
          <p className={styles['dropdown-name']}>
            {userData?.firstName} {userData?.lastName}
          </p>
          <p className={styles['dropdown-email']}>{currentUser?.email}</p>
          <p className={styles['dropdown-role']}>{userData?.role}</p>
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

ProfileDropdown.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

export default ProfileDropdown;
