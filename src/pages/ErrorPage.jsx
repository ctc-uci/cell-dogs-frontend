import React from 'react';
import { Container, Image, Flex } from '@chakra-ui/react';
import styles from './ErrorPage.module.css';
import errorPageLogo from '../assets/images/errorPageLogo.png';

const ErrorPage = () => (
  <Container className={styles.window}>
    <Flex className={styles.container}>
      <Image w="519px" h="332px" src={errorPageLogo} alt="Error Dog Picture" />
      <Flex alignItems="center">
        <Flex className={styles.stack}>
          <h1 className={styles.error_h1}>Oh no!</h1>
          <h2 className={styles.error_h2}>This page doesn&apos;t exist.</h2>
          {/* Add Adoption Link  */}
          <h4 className={styles.error_h4}>Try going back to the Adoption Log.</h4>
        </Flex>
      </Flex>
    </Flex>
  </Container>
);

export default ErrorPage;
