import React from 'react';
import { Container, Image, VStack, Center } from '@chakra-ui/react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <Container id="window">
      <Center id="container">
        <Image w="519px" h="332px" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
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
