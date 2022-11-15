import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionOutlineIcon, PlusSquareIcon } from '@chakra-ui/icons';
import './Navbar.css';
import cellDogsLogoHorizontal2 from '../assets/CellDogs_logo_horizontal 2.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="cell-dogs-logo">
        <Link to="/">
          <img src={cellDogsLogoHorizontal2} alt="Cell Dogs Logo Horizontal 2" />
        </Link>
      </div>

      <nav className="nav-links">
        <ul>
          <li>
            <Link class="nav-page" to="/adoption-log">
              Adoption Log
            </Link>
          </li>
          <li>
            <Link class="nav-page" to="/facilities">
              Facilities
            </Link>
          </li>
          <li>
            <Link class="nav-page" to="/users">
              Users
            </Link>
          </li>
        </ul>
      </nav>

      <div className="navbar-right">
        <div className="navbar-icons">
          <button type="button" onClick={() => alert('Navbar Icon 1 Button Clicked')}>
            <QuestionOutlineIcon w={25} h={25} />
          </button>

          <button type="button" onClick={() => alert('Navbar Icon 2 Button Clicked')}>
            <PlusSquareIcon w={25} h={25} />
          </button>
        </div>
        <div className="navbar-user-profile">
          <button type="button" onClick={() => alert('User Profile Button Clicked')}>
            PLACEHOLDER (USER PROFILE)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
