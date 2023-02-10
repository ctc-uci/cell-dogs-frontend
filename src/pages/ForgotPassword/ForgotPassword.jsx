import React, { useEffect } from 'react';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Stack, Button, Text } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal-4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal-5.png';
import dogArmy from '../../assets/dog-army.png';
import './ForgotPassword.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const submitEmail = async event => {
  event.preventDefault();
  const formData = {
    email: event.target[0].value,
  };
  const isValid = await schema.isValid(formData); // isValid = true if valid input entered
  return isValid;
};

const ForgotPassword = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  });

  return (
    <div className="login-page">
      <div className="information">
        <img className="dog-army" src={dogArmy} alt="dogArmy" />
        <Text>Forgot your password?</Text>
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
          <form className="input-form" onSubmit={submitEmail}>
            <div className="info-text">
              <Text>
                Enter the email address associated with your account and we&apos;ll send you a link
                to reset your password.
              </Text>
              <Text className="email-text">Email</Text>
            </div>

            <Input
              htmlSize={50}
              width="auto"
              placeholder="Enter a valid email address"
              size="md"
              _focusVisible={{ bg: 'gray.200' }}
            />
            <Button
              className="submit-button"
              bg="CDSBlue1"
              color="white"
              variant="outline"
              width="200px"
              type="submit"
              _focusVisible={{ bg: 'gray.200' }}
            >
              Continue
            </Button>
          </form>
        </Stack>
      </div>
    </div>
  );
};

export default ForgotPassword;
