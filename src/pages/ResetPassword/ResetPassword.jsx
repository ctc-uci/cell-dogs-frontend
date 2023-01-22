import React from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { Input, Stack, Button, Text } from '@chakra-ui/react';
import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal 4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal 5.png';
import dogArmy from '../../assets/dog army.png';
import './ResetPassword.css';

// const loginUser = async event => {
//   event.preventDefault();
//   const formData = {
//     username: event.target[0].value,
//     password: event.target[1].value,
//   };
//   await schema.isValid(formData);
//   // console.log(isValid);
// };

const schema = yup.object().shape({
  newPassword: yup.string().min(6).max(10).required(),
  validatePassword: yup
    .string()
    .min(6)
    .max(10)
    .oneOf([yup.ref('newPassword')])
    .required(),
});

const resetPassword = async event => {
  event.preventDefault();
  const formData = {
    newPassword: event.target[0].value,
    validatePassword: event.target[1].value,
  };
  await schema.isValid(formData);
};

const ResetPassword = () => {
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
          <form className="reset-input-form" onSubmit={resetPassword}>
            <Text className="reset-info-text">
              Please create and confirm a new password for this account.
            </Text>
            <div className="reset-passwords-container">
              <div className="reset-password-container">
                <Text className="password">New Password</Text>
                <Input
                  htmlSize={50}
                  width="auto"
                  placeholder="Password"
                  size="md"
                  type="password"
                />
              </div>
              <div className="reset-password-container">
                <Text className="password">Confirm Password</Text>
                <Input
                  htmlSize={50}
                  width="auto"
                  placeholder="Password"
                  size="md"
                  type="password"
                />
              </div>
            </div>

            <Button
              className="reset-submit-button"
              variant="outline"
              width="200px"
              type="submit"
              color="white"
            >
              Reset Password
            </Button>
          </form>
        </Stack>
      </div>
    </div>
  );
};

export default ResetPassword;
