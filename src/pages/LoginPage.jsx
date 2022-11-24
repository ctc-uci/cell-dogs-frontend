import React from 'react';
// import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { Input, Stack, Button, Text } from '@chakra-ui/react';
import cellDogsLogoHorizontal4 from '../assets/CellDogs_logo_horizontal 4.png';
import cellDogsLogoHorizontal5 from '../assets/CellDogs_logo_horizontal 5.png';
import loginDogImage1 from '../assets/P_Puppy_Maekawa_Genuine-removebg-preview 1.png';
import './LoginPage.css';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).max(10).required(),
});

const loginUser = async event => {
  event.preventDefault();
  const formData = {
    username: event.target[0].value,
    password: event.target[1].value,
  };
  const isValid = await schema.isValid(formData);
  console.log(isValid);
};

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="information">
        <img className="login-dog-image-1" src={loginDogImage1} alt="loginDogImage1" />
        <Text>Welcome to the Adoption Log!</Text>
      </div>
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
          <form className="input-form" onSubmit={loginUser}>
            <Input htmlSize={50} width="auto" placeholder="Username" size="md" />
            <Input htmlSize={50} width="auto" placeholder="Password" size="md" type="password" />
            <Button className="submit-button" colorScheme="blue" variant="solid" type="submit">
              Submit
            </Button>
          </form>
          <NavLink to="/forgotpassword">Forgot Password?</NavLink>
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
