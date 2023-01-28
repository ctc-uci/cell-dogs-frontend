import { React } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Stack,
  IconButton,
  useDisclosure,
  Button,
  Link,
  useMediaQuery,
} from '@chakra-ui/react';
import { QuestionOutlineIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import './Navbar.css';
import cellDogsLogoHorizontal2 from '../assets/CellDogs_logo_horizontal 2.png';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLargerThan1012] = useMediaQuery('(min-width: 1012px)');
  const icons = { false: <HamburgerIcon />, true: <CloseIcon /> };

  return (
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
                <button
                  type="button"
                  className="navbar-icon"
                  onClick={() => alert('Navbar Icon 2 Button Clicked')}
                >
                  <BsFillPersonPlusFill size={28} />
                </button>
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
