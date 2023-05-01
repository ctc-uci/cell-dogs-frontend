import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
// import * as yup from 'yup';
import { Input, Stack, Button, Text } from '@chakra-ui/react';
// import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';

import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal-4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal-5.png';
import dogArmy from '../../assets/dog-army.png';
import styles from './ResetPassword.module.css';

// const loginUser = async event => {
//   event.preventDefault();
//   const formData = {
//     username: event.target[0].value,
//     password: event.target[1].value,
//   };
//   await schema.isValid(formData);
//   // console.log(isValid);
// };

/* const schema = yup.object().shape({
  newPassword: yup.string().min(6).max(10).required(),
  validatePassword: yup
    .string()
    .oneOf([yup.ref('newPassword')])
    .required(),
});
 */
const resetPassword = async event => {
  event.preventDefault();
  // TODO: Revamp form structure
  /* const formData = {
    newPassword: event.target[0].value,
    validatePassword: event.target[1].value,
  };
  await schema.isValid(formData); */
};

const ResetPassword = ({ newPassword, validatePassword }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  });

  const inputChange = () => {
    // const formData = {
    //   newPassword: event.target[0].value,
    //   validatePassword: event.target[1].value,
    // };
    // console.log(schema.isValid(resetPassword.formData));
    if (newPassword && validatePassword) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.information}>
        <img className={styles.dog_army} src={dogArmy} alt="Dog Army" />
        <Text>Forgot your password?</Text>
      </div>
      <div className={styles.login}>
        <Stack spacing={3} align="center">
          <NavLink to="/">
            <img
              className={styles.cds_logo_horizontal_4}
              src={cellDogsLogoHorizontal4}
              alt="Cell Dogs Logo"
            />
            <img
              className={styles.cds_logo_horizontal_5}
              src={cellDogsLogoHorizontal5}
              alt="Cell Dogs Header"
            />
          </NavLink>
          <form className={styles.reset_input_form} onSubmit={resetPassword}>
            <Text className={styles.reset_info_text}>
              Please create and confirm a new password for this account.
            </Text>
            <div className={styles.reset_passwords_container}>
              <div className={styles.reset_password_container}>
                <Text className={styles.password}>New Password</Text>
                <Input
                  htmlSize={50}
                  width="auto"
                  placeholder="Password"
                  size="md"
                  type="password"
                  onChange={inputChange}
                />
              </div>
              <div className={styles.reset_password_container}>
                <Text className={styles.password}>Confirm Password</Text>
                <Input
                  htmlSize={50}
                  width="auto"
                  placeholder="Password"
                  size="md"
                  type="password"
                  onChange={inputChange}
                />
              </div>
            </div>

            <Button
              isDisabled={loading}
              className={styles.reset_submit_button}
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

/* ResetPassword.propTypes = {
  formData: PropTypes.shape({
    newPassword: PropTypes.string,
    validatePassword: PropTypes.string,
  }).isRequired,
}; */

export default ResetPassword;
