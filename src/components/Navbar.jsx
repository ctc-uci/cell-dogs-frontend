import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Stack,
  IconButton,
  Button,
  Link,
  useDisclosure,
  useMediaQuery,

  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  // FormControl,
  // FormLabel,
  // Input,
  // Select,
} from '@chakra-ui/react';
import { QuestionOutlineIcon, PlusSquareIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import AddNewUserModal from './AddNewUserModal';
import './Navbar.css';
import cellDogsLogoHorizontal2 from '../assets/CellDogs_logo_horizontal 2.png';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';
import ProfileMenuModal from './ProfileMenuModal';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const {
    isOpen: accountModalisOpen,
    onOpen: accountModalonOpen,
    onClose: accountModalonClose,
  } = useDisclosure();
  // const { currentUser } = useAuth();

  const icons = { false: <HamburgerIcon />, true: <CloseIcon /> };
  const [isLargerThan1012] = useMediaQuery('(min-width: 1012px)');
  return (
    <div className="navbar">
      <div className="navbar-long">
        <div className="cell-dogs-logo">
          <NavLink to="/">
            <img src={cellDogsLogoHorizontal2} alt="Cell Dogs Logo Horizontal 2" />
          </NavLink>
        </div>
        <div className="nav-links-and-icons">
          <div className="nav-links">
            <nav>
              <ul>
                <li>
                  <NavLink to="/adoption-log">Adoption Log</NavLink>
                </li>
                <li>
                  <NavLink to="/facilities">Facilities</NavLink>
                </li>
                <li>
                  <NavLink to="/users">Users</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="navbar-right">
            <div className="navbar-icon">
              <button type="button">
                <QuestionOutlineIcon w={25} h={25} />
              </button>
            </div>
            <div className="navbar-icon">
              <button type="button" className="navbar-icon">
                <PlusSquareIcon w={25} h={25} />
              </button>
            </div>
            <div className="navbar-user-profile">
              <ProfileMenuModal />
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-short">
        <div className="hamburger-icon">
          <IconButton icon={icons[isOpen]} onClick={onToggle} bg="transparent" variant="noHover" />
        </div>
        <div className="cell-dogs-logo">
          <NavLink to="/">
            <img src={cellDogsLogoHorizontal2} alt="Cell Dogs Logo Horizontal 2" />
          </NavLink>
        </div>
        <div className="navbar-right-short">
          <div className="navbar-icon">
            <button type="button" className="navbar-icon" onClick={accountModalonOpen}>
              <BsFillPersonPlusFill size={28} />
            </button>
            <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
          </div>

          <img
            className="navbar-user-profile-image"
            src={cellDogsSampleProfilePicture}
            alt="Cell Dogs Sample Profile"
          />
        </div>
      </div>
      {!isLargerThan1012 && (
        <Collapse in={isOpen} padding="0" zIndex="1">
          <Stack>
            <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
              <Link href="/">Adoption Log</Link>
            </Button>
            <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
              <Link href="/facilities">Facilities</Link>
            </Button>
            <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
              <Link href="/">Users</Link>
            </Button>
          </Stack>
        </Collapse>
      )}
    </div>
  );
};

export default Navbar;
