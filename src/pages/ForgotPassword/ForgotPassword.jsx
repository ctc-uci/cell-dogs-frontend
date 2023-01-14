import React from 'react';
// import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { Input, Stack, Button, Text } from '@chakra-ui/react';
import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal 4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal 5.png';
import dogArmy from '../../assets/dog army.png';
import './ForgotPassword.css';

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
  await schema.isValid(formData);
  // console.log(isValid);
};

const ForgotPassword = () => {
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
          <form className="input-form" onSubmit={loginUser}>
            <div className="info-text">
              <Text>
                Enter the email address associated with your account and we&apos;ll send you a link
                to reset your password.
              </Text>
              <Text className="email-text">Email</Text>
            </div>

            <Input htmlSize={50} width="auto" placeholder="Enter a valid email address" size="md" />
            <Button
              className="submit-button"
              bg="CDSBlue1"
              variant="outline"
              width="200px"
              type="submit"
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
