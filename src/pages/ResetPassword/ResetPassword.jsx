/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  Image,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(4, 'New password must be at least 4 characters.')
    .max(18, 'New password must be less than 18 characters.')
    .required('Please enter a new password.'),
  validatePassword: yup
    .string()
    .required('Please confirm password.')
    .oneOf([yup.ref('newPassword')], "Passwords don't match")
    .min(4, "Passwords don't match")
    .max(18, "Passwords don't match"),
});

const ResetPassword = ({ newPassword, validatePassword }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [oobCode, setOobCode] = useState(null);
  const [newAccount, setNewAccount] = useState(false);
  const { setPasswordWithOobCode } = useAuth();
  useEffect(() => {
    if (searchParams.get('oobCode')) {
      setOobCode(searchParams.get('oobCode'));
      setNewAccount(Boolean(searchParams.get('newAccount')));
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  });

  const resetPassword = async data => {
    // data.preventDefault();
    await setPasswordWithOobCode(oobCode, data.newPassword);
    toast({
      title: 'Password reset successful.',
      description: 'You can now log in with your new password.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    await navigate('/');
    reset();
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
            <Image width={150} src={cellDogsLogoHorizontal4} alt="Cell Dogs Logo" />
            <Image width={150} src={cellDogsLogoHorizontal5} alt="Cell Dogs Header" />
          </NavLink>
          <form className={styles.reset_input_form} onSubmit={handleSubmit(resetPassword)}>
            <Text className={styles.reset_info_text}>
              Please create and confirm a new password for this account.
            </Text>
            <div className={styles.reset_passwords_container}>
              <div className={styles.reset_password_container}>
                <Text className={styles.password}>New Password</Text>
                <FormControl isInvalid={errors?.newPassword} className={styles['input-form']}>
                  <Input
                    htmlSize={50}
                    width="auto"
                    placeholder="Password"
                    size="md"
                    type="password"
                    {...register('newPassword')}
                  />
                  <FormErrorMessage>
                    {errors?.newPassword && errors?.newPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </div>
              <div className={styles.reset_password_container}>
                <Text className={styles.password}>Confirm Password</Text>
                <FormControl isInvalid={errors?.validatePassword} className={styles['input-form']}>
                  <Input
                    htmlSize={50}
                    width="auto"
                    placeholder="Confirm Password"
                    size="md"
                    type="password"
                    {...register('validatePassword')}
                  />
                  <FormErrorMessage>
                    {errors?.validatePassword && errors?.validatePassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </div>
            </div>

            <Button
              // isDisabled={loading}
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

export default ResetPassword;
