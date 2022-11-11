import React from 'react';
import { Container, Image, Box, Center, VStack, Spacer } from '@chakra-ui/react';

const ErrorPage = () => {
  return (
    <Container h="100vh" padding="172px 68px">
      <Container h="100%">
        <Center h="100%" float="left" bg="red" padding="auto">
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Center>
        <Spacer />
        <Box h="100%" float="right" bg="blue" margin="auto">
          <VStack h="100%" align="flex-start">
            <h1>Oh no!</h1>
            <h2>This page doesn&apos;t exist</h2>
            <h3>Try going back to the Adoption Log</h3>
          </VStack>
        </Box>
      </Container>
    </Container>
  );
};

export default ErrorPage;
