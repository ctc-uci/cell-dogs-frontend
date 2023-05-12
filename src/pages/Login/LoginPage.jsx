import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal-4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal-5.png';
import loginDogImage1 from '../../assets/P_Puppy_Maekawa_Genuine-removebg-preview 1.png';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginPage.module.css';

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email.').required('Please enter an email.'),
  password: yup
    .string()
    .min(4, 'Invalid password.')
    .max(18, 'Invalid password.')
    .required('Please enter a password.'),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { currentUser, login } = useAuth();

  const onSubmitHandler = async data => {
    const { email, password } = data;
    try {
      await login(email, password);
      navigate('/');
      reset();
    } catch (e) {
      setError('Failed to log in');
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  });

  return (
    <div className={styles['login-page']}>
      <div className="information">
        <img className={styles['login-dog-image-1']} src={loginDogImage1} alt="loginDogImage1" />
        <Text>Welcome to the Adoption Log!</Text>
      </div>
      <div className={styles.login}>
        <Stack spacing={3} align="center">
          <div className={styles['cell-dogs-logo']}>
            <NavLink to="/">
              <img
                className={styles['cds-logo-horizontal-4']}
                src={cellDogsLogoHorizontal4}
                alt="cellDogsLogoHorizontal4"
              />
              <img
                className={styles['cds-logo-horizontal-5']}
                src={cellDogsLogoHorizontal5}
                alt="cellDogsLogoHorizontal4"
              />
            </NavLink>
          </div>
          {/* Form Control for every input */}
          <form className={styles['input-form']} onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl isInvalid={errors?.email} className={styles['input-form']}>
              <Input width="auto" placeholder="Email" size="md" {...register('email')} />
              <FormErrorMessage>{errors?.email && errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.password} className={styles['input-form']}>
              <Input
                width="auto"
                placeholder="Password"
                size="md"
                type="password"
                {...register('password')}
                // onChange={inputChange}
              />
              <FormErrorMessage>{errors?.password && errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              // isDisabled={loading}
              className={styles['submit-button']}
              bg="CDSBlue1"
              color="white"
              variant="solid"
              type="submit"
              onClick={() => {
                onSubmitHandler();
              }}
            >
              Log in
            </Button>
          </form>
          {error && (
            <Alert status="error" width={200} justifyContent="center">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <NavLink to="/forgot-password">Forgot Password?</NavLink>
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
