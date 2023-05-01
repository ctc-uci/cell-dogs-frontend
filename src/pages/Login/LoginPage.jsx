import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Input,
  Stack,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal-4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal-5.png';
import loginDogImage1 from '../../assets/P_Puppy_Maekawa_Genuine-removebg-preview 1.png';
import styles from './LoginPage.module.css';
import { useAuth } from '../../contexts/AuthContext';

// const schema = yup.object().shape({
//   username: yup.string().required(),
//   password: yup.string().min(4).max(18).required(),
// });
// const Login = ({ setModalStep, onClose, info, setRender, render }) => {
//   const [email, password] = useState({
//     fullName: `${info.firstName} ${info.lastName}`,
//     email: `${info.email}`,
//     role: '',
//   });
// };
// const formDataShape = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// };

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(true);
  // const { currentUser, login } = useAuth();
  const { currentUser } = useAuth();
  /* const loginUser = async event => {
    event.preventDefault();
    const formData = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    // await schema.isValid(formData);

    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (e) {
      setError('Failed to log in');
    }
  }; */
  // const onSubmit = data => console.log(data);
  const onSubmit = async event => {
    event.preventDefault();
    // const { email, password } = event;
    // const formData = {
    //   username: event.target[0].value,
    //   password: event.target[1].value,
    // };
    console.log('hello');
    // await schema.isValid(formData);
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    try {
      setError('');
      await register(emailRef, passwordRef);
      navigate('/');
    } catch (e) {
      setError('Failed to log in');
    }
  };

  // const inputChange = () => {
  //   if (email.current.value !== '' && passwordRef.current.value !== '') {
  //     // setLoading(false);
  //   } else {
  //     // setLoading(true);
  //   }
  // };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  });

  return (
    <div className={styles['login-page']}>
      {/* <Hide below="md"> */}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors?.fullName} className={styles['input-form']}>
              <FormLabel>Email</FormLabel>
              {/* Notice how we dont need to use states */}
              {/* <Input {...register('email')} /> */}
              <Input
                htmlSize={50}
                width="auto"
                placeholder="Email"
                size="md"
                // ref={emailRef}
                // onChange={inputChange}
                ref={
                  register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    ref: { emailRef },
                  }).ref
                }
              />
            </FormControl>
            <FormControl isInvalid={errors?.password} className={styles['input-form']}>
              <Input
                htmlSize={50}
                width="auto"
                placeholder="Password"
                size="md"
                type="password"
                // ref={passwordRef}
                // onChange={inputChange}
                ref={
                  register('password', {
                    required: true,
                    pattern: /^.{6,}$/,
                    ref: { passwordRef },
                  }).ref
                }
              />
            </FormControl>
            <Button
              // isDisabled={loading}
              className={styles['submit-button']}
              bg="CDSBlue1"
              color="white"
              variant="solid"
              type="submit"
              // onClick={() => {
              //   // onSubmit();
              //   onSubmit();
              //   // onClose();
              //   // const toast = useToast();
              // }}
            >
              Log in
            </Button>
            <FormErrorMessage>{errors?.email && errors?.fullName?.message}</FormErrorMessage>
          </form>
          {/* <form className={styles['input-form']} onSubmit={loginUser}>
            <Input
              htmlSize={50}
              width="auto"
              placeholder="Email"
              size="md"
              ref={emailRef}
              onChange={inputChange}
            />
            <Input
              htmlSize={50}
              width="auto"
              placeholder="Password"
              size="md"
              type="password"
              ref={passwordRef}
              onChange={inputChange}
            />
            <Button
              // isDisabled={loading}
              className={styles['submit-button']}
              bg="CDSBlue1"
              color="white"
              variant="solid"
              type="submit"
            >
              Log in
            </Button> */}
          {/* </form> */}
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

// LoginPage.propTypes = {
//   formData: PropTypes.shape({
//     username: PropTypes.string,
//     password: PropTypes.string,
//   }).isRequired,
// }

// LoginPage.propTypes = {
//   formData: PropTypes.shape({
//     username: PropTypes.string,
//     password: PropTypes.string,
//   }).isRequired,
// currentUser: PropTypes.func.isRequired,
// setRender: PropTypes.func.isRequired,
// render: PropTypes.bool.isRequired,
// };

// LoginPage.propTypes = {
//   formData: PropTypes.shape(formDataShape).isRequired,
//   currentUser: PropTypes.func.isRequired,
// };

// EditUser.propTypes = {
//   setModalStep: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
//   info: PropTypes.shape({
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     email: PropTypes.string,
//   }).isRequired,
// };

// LoginPage.propTypes = {
//   setModalStep: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

export default LoginPage;
