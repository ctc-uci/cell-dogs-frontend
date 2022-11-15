import React from 'react';
import { Container, Image, VStack, Center } from '@chakra-ui/react';
import './ErrorPage.css';
import image2 from '../assets/images/image2.png';

const ErrorPage = () => {
  return (
    <Container id="window">
      <Center id="container">
        <Image w="519px" h="332px" src={image2} alt="Dan Abramov" />
        <Center h="100%">
          <VStack align="flex-start" h="fit-content">
            <h1>Oh no!</h1>
            <h2>This page doesn&apos;t exist.</h2>
            <h4>Try going back to the Adoption Log.</h4>
          </VStack>
        </Center>
      </Center>
    </Container>
  );
};

export default ErrorPage;
