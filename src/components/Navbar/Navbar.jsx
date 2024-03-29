import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button, Collapse, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

import { screenWidthExceeds } from '../../util/utils';
import AddNewUserModal from '../AddNewUserModal/AddNewUserModal';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

import cellDogsLogo from '../../assets/CellDogs_logo_horizontal 2.png';

import styles from './Navbar.module.css';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const {
    isOpen: accountModalisOpen,
    onOpen: accountModalonOpen,
    onClose: accountModalonClose,
  } = useDisclosure();
  // const { currentUser } = useAuth();

  const icons = { false: <HamburgerIcon boxSize={6} />, true: <CloseIcon boxSize={4} /> };
  const isLargerThan1075 = screenWidthExceeds(1075);
  return (
    <div className={styles.navbar}>
      {/* Desktop navbar */}
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
                <NavLink
                  className={({ isActive }) =>
                    `${styles['nav-link-desktop']} ${isActive && styles['nav-link-desktop-active']}`
                  }
                  to="/"
                >
                  Adoption Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles['nav-link-desktop']} ${isActive && styles['nav-link-desktop-active']}`
                  }
                  to="/facilities"
                >
                  Facilities
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles['nav-link-desktop']} ${isActive && styles['nav-link-desktop-active']}`
                  }
                  to="/users"
                >
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
              <ProfileDropdown mobile={!isLargerThan1075} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navbar */}
      {!isLargerThan1075 && (
        <>
          <div className={styles['navbar-short']}>
            <div className={styles['navbar-short-left-icon']}>
              <IconButton
                icon={icons[isOpen]}
                onClick={onToggle}
                bg="transparent"
                variant="noHover"
              />
            </div>
            <div className={styles['cell-dogs-logo']}>
              <NavLink to="/">
                <img
                  className={styles['navbar-short-cds-logo']}
                  src={cellDogsLogo}
                  alt="Cell Dogs Logo"
                />
              </NavLink>
            </div>
            <div className={styles['navbar-short-right']}>
              <div className={styles['navbar-icon']}>
                <IconButton
                  className={styles['navbar-add-user-button']}
                  icon={<BsPersonPlus size={24} />}
                  onClick={accountModalonOpen}
                  bg="rgba(195, 203, 219, 0.1)"
                  borderRadius={15}
                  padding="23px 10px"
                  _hover={{ bg: 'rgba(195, 203, 219, 0.2)' }}
                />
                <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
              </div>
              <ProfileDropdown mobile={!isLargerThan1075} />
            </div>
          </div>
          <Collapse in={isOpen} padding="0" zIndex="1">
            <Stack className={styles['navbar-short-links']} spacing="0">
              <Link className={styles['navbar-short-link']} to="/">
                <Button
                  className={styles['navbar-short-link-button']}
                  bg="white"
                  justifyContent="left"
                  w="100%"
                  textDecoration="none"
                >
                  Adoption Log
                </Button>
              </Link>
              <Link className={styles['navbar-short-link']} to="/facilities">
                <Button
                  className={styles['navbar-short-link-button']}
                  bg="white"
                  justifyContent="left"
                  w="100%"
                  textDecoration="none"
                >
                  Facilities
                </Button>
              </Link>
              <Link className={styles['navbar-short-link']} to="/users">
                <Button
                  className={styles['navbar-short-link-button']}
                  bg="white"
                  justifyContent="left"
                  w="100%"
                  paddingTop="10px"
                  paddingLeft="20px"
                  textDecoration="none"
                >
                  Users
                </Button>
              </Link>
            </Stack>
          </Collapse>
        </>
      )}
    </div>
  );
};

export default Navbar;
