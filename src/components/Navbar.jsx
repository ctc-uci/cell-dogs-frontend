import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Stack,
  IconButton,
  useDisclosure,
  Button,
  Link,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { QuestionOutlineIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { BsFillPersonPlusFill } from 'react-icons/bs';

// import AddNewUserModal from './AddNewUserModal';
import './Navbar.css';
import cellDogsLogoHorizontal2 from '../assets/CellDogs_logo_horizontal 2.png';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: accountModalisOpen,
    onOpen: accountModalonOpen,
    onClose: accountModalonClose,
  } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { currentUser } = useAuth();

  const [isLargerThan1012] = useMediaQuery('(min-width: 1012px)');
  const icons = { false: <HamburgerIcon />, true: <CloseIcon /> };

  return !currentUser ? (
    <></>
  ) : (
    <>
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
                <button type="button" onClick={() => alert('Navbar Icon 1 Button Clicked')}>
                  <QuestionOutlineIcon w="1.75em" h="1.75em" />
                </button>
              </div>
              <div className="navbar-icon">
                <button type="button" className="navbar-icon" onClick={accountModalonOpen}>
                  <BsFillPersonPlusFill size={28} />
                </button>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={accountModalisOpen}
                  onClose={accountModalonClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add New User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input ref={initialRef} placeholder="Full Name" />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Add Email</FormLabel>
                        <Input placeholder="Add Email" type="email" />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Add Role</FormLabel>
                        <Input placeholder="Add Roll" />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Add Role</FormLabel>
                        <Input placeholder="Add Roll" />
                      </FormControl>

                      <FormControl>
                        <Select placeholder="Select Account Type">
                          <option>Guest</option>
                          <option>Administrator</option>
                        </Select>
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={accountModalonClose}>Cancel</Button>
                      <Button colorScheme="blue" mr={3}>
                        Send Email
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
              <div className="navbar-user-profile">
                <button type="button" onClick={() => alert('User Profile Button Clicked')}>
                  <img src={cellDogsSampleProfilePicture} alt="Cell Dogs Sample Profile" />
                  <div className="profile-text">
                    <p className="profile-name">Rayvan Dog</p>
                    <p className="profile-role">Developer</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-short">
          <div className="hamburger-icon">
            <IconButton
              icon={icons[isOpen]}
              onClick={onToggle}
              bg="transparent"
              variant="noHover"
            />
          </div>
          <div className="cell-dogs-logo">
            <NavLink to="/">
              <img src={cellDogsLogoHorizontal2} alt="Cell Dogs Logo Horizontal 2" />
            </NavLink>
          </div>
          <div className="navbar-right-short">
            <div className="navbar-icon">
              <button type="button" onClick={() => alert('Navbar Icon 2 Button Clicked')}>
                <BsFillPersonPlusFill />
              </button>
            </div>

            <img
              className="navbar-user-profile-image"
              src={cellDogsSampleProfilePicture}
              alt="Cell Dogs Sample Profile"
            />
          </div>
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
      )
    </>
  );
};

export default Navbar;
