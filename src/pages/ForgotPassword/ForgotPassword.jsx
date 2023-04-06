/* eslint-disable */
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import {
  Input,
  Stack,
  Button,
  Text,
  Image,
  Box,
  Flex,
  Heading,
  Hide,
  Show,
  useToast,
} from '@chakra-ui/react';

import { sendPasswordResetEmail } from 'firebase/auth';

import { useAuth } from '../../contexts/AuthContext';

import cellDogsLogoHorizontal4 from '../../assets/CellDogs_logo_horizontal-4.png';
import cellDogsLogoHorizontal5 from '../../assets/CellDogs_logo_horizontal-5.png';
import dogArmy from '../../assets/dog-army.png';
import './ForgotPassword.css';
import { useState } from 'react';

const ForgotPassword = () => {
  const { currentUser, sendPwdResetEmail } = useAuth();
  const navigate = useNavigate();

  const toast = useToast();
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  });

  const sendEmail = async () => {
    try {
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regexEmail.test(email)) {
        return toast({
          title: 'Invalid Email',
          description: 'Please enter a valid email address',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      await sendPwdResetEmail(email);
      setSuccessfullySubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      width="100%"
      height="100%"
      direction={{
        base: 'column',
        md: 'row',
      }}
    >
      <Show below="md">
        <Flex direction="row" py={3} justifyContent={'center'}>
          <Image src={cellDogsLogoHorizontal4} width={75} />
          <Image src={cellDogsLogoHorizontal5} width={75} objectFit="contain" />
        </Flex>
      </Show>
      <Flex
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        direction="column"
        bg="#21307A"
        height="100%"
        color="white"
      >
        <Image src={dogArmy} boxSize={325} />
        <Heading pb={3}>Forgot your password?</Heading>
      </Flex>

      <Flex flex={1} justifyContent={'center'} alignItems={'center'} direction="column">
        <Flex direction="column" justifyContent={'center'}>
          <Image src={cellDogsLogoHorizontal4} width={100} />
          <Image src={cellDogsLogoHorizontal5} width={100} />
        </Flex>
        {successfullySubmitted ? (
          <Flex
            direction="column"
            justifyContent={'center'}
            maxWidth={450}
            px={4}
            textAlign={'center'}
          >
            We’ve sent password reset instructions to: {email} If it doesn't arrive soon, check your
            spam folder or send the email again.
            <Button bg="#21307A" color="white" size="md" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </Flex>
        ) : (
          <Flex
            direction="column"
            justifyContent={'center'}
            maxWidth={450}
            px={4}
            textAlign={'center'}
          >
            <Text>
              Enter the email address associated with your account and we'll send you a link to
              reset your password.
            </Text>
            <Stack spacing={3} mt={10}>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <Flex direction="row" justifyContent="center">
                <Button type="submit" bg="#21307A" color="white" size="md" onClick={sendEmail}>
                  Send Reset Link
                </Button>
              </Flex>
            </Stack>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
