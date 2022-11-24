import React from 'react';
// import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { Input, Stack, Button } from '@chakra-ui/react';
import cellDogsLogoHorizontal4 from '../assets/CellDogs_logo_horizontal 4.png';
import cellDogsLogoHorizontal5 from '../assets/CellDogs_logo_horizontal 5.png';

import './LoginPage.css';

// const schema = yup.object().shape({
//   Username: yup.string().required(),
//   Password: yup.string().required(),
// });

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="information">Welcome to the Adoption Log!</div>
      <div className="login">
        <Stack spacing={3} align="center">
          <NavLink to="/">
            <img
              className="cds-logo-horizontal-4"
              src={cellDogsLogoHorizontal4}
              alt="cellDogsLogoHorizontal4"
            />
            <img
              className="cds-logo-horizontal-5"
              src={cellDogsLogoHorizontal5}
              alt="cellDogsLogoHorizontal4"
            />
          </NavLink>
          <Input placeholder="Username" size="md" />
          <Input placeholder="Password" size="md" />
          <Button colorScheme="blue" variant="solid">
            Submit
          </Button>
          <NavLink to="/forgotpassword">Forgot Password</NavLink>
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
