import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const BreadcrumbBar = ({ left, children }) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      p={3}
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      align="center"
    >
      <Box>
        <Text fontSize="md" color="gray.800" margin="auto">
          {left}
        </Text>
      </Box>

      <Box>{children}</Box>
    </Flex>
  );
};

export default BreadcrumbBar;
