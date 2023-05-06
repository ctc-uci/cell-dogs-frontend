import React from 'react';
import {
  Container,
  Image,
  Flex,
  Link,
  VStack,
  AbsoluteCenter,
  Text,
  Box,
  // Hide,
} from '@chakra-ui/react';
import errorPageLogo from '../../assets/dog-army.png';
import styles from './ErrorPage.module.css';

const ErrorPage = () => (
  <Container h="100vh" className={styles.window}>
    <AbsoluteCenter>
      <Flex
        margin="auto"
        gap="60px"
        alignItems="center"
        justifyContent="flex-end"
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <Box>
          <Image
            className={styles.errorDogPic}
            maxWidth="none"
            h="380px"
            w="419px"
            src={errorPageLogo}
            alt="Error Dog Picture"
          />
        </Box>
        <Flex>
          <VStack align="flex-start">
            <Flex>
              <Text>
                <h1 className={styles.error_h1}>Oh no!</h1>
              </Text>
            </Flex>
            <Flex>
              <Text>
                <h2 className={styles.error_h2}>This page doesn&apos;t exist.</h2>
              </Text>
            </Flex>
            <Flex>
              <Text>
                <h4 className={styles.error_h4}>
                  Try going back to the{' '}
                  <Link color="#0075FF" href="/">
                    Adoption Log
                  </Link>
                  .
                </h4>
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </AbsoluteCenter>
  </Container>
);

export default ErrorPage;
