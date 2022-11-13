import React from 'react';
import { Container, Image, VStack, Center } from '@chakra-ui/react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <Container id="window" h="100vh">
      <Center id="container" h="100%">
        <Image w="519px" h="332" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        <Center h="100%">
          <VStack align="flex-start" h="fit-content">
            <h1>Add Text Here</h1>
          </VStack>
        </Center>
      </Center>
    </Container>
  );
};

export default ErrorPage;
