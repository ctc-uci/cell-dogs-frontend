import React from 'react';
import { Container, Image, Flex, Link, VStack, AbsoluteCenter, Text } from '@chakra-ui/react';
import errorPageLogo from '../../assets/dog-army.png';
import styles from './ErrorPage.module.css';

const ErrorPage = () => (
  <Container h="100vh" className={styles.window}>
    <AbsoluteCenter>
      <Flex
        margin="auto"
        flexDirection="row"
        gap="60px"
        align="center"
        className={styles.container}
      >
        <Flex>
          <Image h="380px" w="419px" src={errorPageLogo} alt="Error Dog Picture" />
        </Flex>
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
                  <Link as="span" color="#0075FF" href="/">
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
