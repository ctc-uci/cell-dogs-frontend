import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Stack, IconButton, Button, Link, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { BsPersonPlus } from 'react-icons/bs';

import AddNewUserModal from '../AddNewUserModal/AddNewUserModal';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import { screenWidthExceeds } from '../../util/utils';

import cellDogsLogo from '../../assets/CellDogs_logo_horizontal 2.png';
import cellDogsSampleProfilePicture from '../../assets/CellDogs_sample_profile_picture.png';

import styles from './Navbar.module.css';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const {
    isOpen: accountModalisOpen,
    onOpen: accountModalonOpen,
    onClose: accountModalonClose,
  } = useDisclosure();
  // const { currentUser } = useAuth();

  const icons = { false: <HamburgerIcon />, true: <CloseIcon /> };
  const isLargerThan1075 = screenWidthExceeds(1075);
  return (
    <div className={styles.navbar}>
      <div className={styles['navbar-long']}>
        <div className={styles['cell-dogs-logo']}>
          <NavLink to="/">
            <img className={styles['cell-dogs-logo-img']} src={cellDogsLogo} alt="Cell Dogs Logo" />
          </NavLink>
        </div>
        <div className={styles['nav-links-and-icons']}>
          <nav className={styles['nav-links']}>
            <ul className={styles['nav-links-ul']}>
              <li>
                <NavLink className={styles['nav-link-desktop']} to="/adoption-log">
                  Adoption Log
                </NavLink>
              </li>
              <li>
                <NavLink className={styles['nav-link-desktop']} to="/facilities">
                  Facilities
                </NavLink>
              </li>
              <li>
                <NavLink className={styles['nav-link-desktop']} to="/users">
                  Users
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles['navbar-right']}>
            <div className={styles['navbar-add-user-button-container']}>
              <Button
                className={styles['navbar-add-user-button']}
                leftIcon={<BsPersonPlus size={24} />}
                onClick={accountModalonOpen}
                bg="rgba(195, 203, 219, 0.1)"
                borderRadius={15}
                padding="23px 14px"
                _hover={{ bg: 'rgba(195, 203, 219, 0.2)' }}
              >
                Add User
              </Button>
              <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
            </div>
            <div className={styles['navbar-user-profile']}>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>

      {!isLargerThan1075 && (
        <>
          <div className={styles['navbar-short']}>
            <div className={styles['hamburger-icon']}>
              <IconButton
                icon={icons[isOpen]}
                onClick={onToggle}
                bg="transparent"
                variant="noHover"
              />
            </div>
            <div className={styles['cell-dogs-logo']}>
              <NavLink to="/">
                <img src={cellDogsLogo} alt="Cell Dogs Logo" />
              </NavLink>
            </div>
            <div className="navbar-right-short">
              <div className="navbar-icon">
                <Button
                  className={styles['navbar-add-user-button']}
                  leftIcon={<BsPersonPlus size={24} />}
                  onClick={accountModalonOpen}
                />
                <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
              </div>

              <img
                className="navbar-user-profile-image"
                src={cellDogsSampleProfilePicture}
                alt="Cell Dogs Sample Profile"
              />
            </div>
          </div>
          <Collapse in={isOpen} padding="0" zIndex="1">
            <Stack>
              <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
                <Link to="/">Adoption Log</Link>
              </Button>
              <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
                <Link to="/facilities">Facilities</Link>
              </Button>
              <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
                <Link to="/">Users</Link>
              </Button>
            </Stack>
          </Collapse>
        </>
      )}
    </div>
  );
};

export default Navbar;
