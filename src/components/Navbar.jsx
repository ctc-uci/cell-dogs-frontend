import React from 'react';
import { NavLink } from 'react-router-dom';
import { QuestionOutlineIcon, PlusSquareIcon, HamburgerIcon } from '@chakra-ui/icons';
import './Navbar.css';
import cellDogsLogoHorizontal2 from '../assets/CellDogs_logo_horizontal 2.png';
import cellDogsSampleProfilePicture from '../assets/CellDogs_sample_profile_picture.png';
import ProfileMenuModal from './PorfileMenuModal';

const Navbar = () => {
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
              <button type="button" onClick={() => alert('Navbar Icon 1 Button Clicked')}>
                <QuestionOutlineIcon w={25} h={25} />
              </button>
            </div>
            <div className="navbar-icon">
              <button
                type="button"
                className="navbar-icon"
                onClick={() => alert('Navbar Icon 2 Button Clicked')}
              >
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
          <HamburgerIcon w={20} h={20} />
        </div>
        <div className="cell-dogs-logo">
          <NavLink to="/">
            <img src={cellDogsLogoHorizontal2} alt="Cell Dogs Logo Horizontal 2" />
          </NavLink>
        </div>
        <div className="navbar-right-short">
          <div className="navbar-icon">
            <button type="button" onClick={() => alert('Navbar Icon 2 Button Clicked')}>
              <PlusSquareIcon w={20} h={20} />
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
  );
};

export default Navbar;
