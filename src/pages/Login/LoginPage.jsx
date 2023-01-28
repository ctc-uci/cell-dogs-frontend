import React, { useState, useRef } from 'react';
// import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Stack, Button, Text, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal-4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal-5.png';
import loginDogImage1 from '../../assets/P_Puppy_Maekawa_Genuine-removebg-preview 1.png';
import styles from './LoginPage.module.css';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).max(18).required(),
});

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const loginUser = async event => {
    event.preventDefault();
    const formData = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    await schema.isValid(formData);

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (e) {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="information">
        <img className={styles['login-dog-image-1']} src={loginDogImage1} alt="loginDogImage1" />
        <Text>Welcome to the Adoption Log!</Text>
      </div>
      <div className={styles.login}>
        {currentUser && currentUser.email}
        <Stack spacing={3} align="center">
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
          <form className={styles['input-form']} onSubmit={loginUser}>
            <Input htmlSize={50} width="auto" placeholder="Username" size="md" ref={emailRef} />
            <Input
              htmlSize={50}
              width="auto"
              placeholder="Password"
              size="md"
              type="password"
              ref={passwordRef}
            />
            <Button
              disabled={loading}
              className={styles['submit-button']}
              bg="CDSBlue1"
              color="white"
              variant="solid"
              type="submit"
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
