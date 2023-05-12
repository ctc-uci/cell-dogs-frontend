import React from 'react';
import { VStack, Flex, Heading } from '@chakra-ui/react';

import InputElement from './InputElement';

const FormSection = ({ title: formTitle, schema, register, errors }) => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%" h="100%">
      <Heading as="h4" size="l" mb={4} textAlign="left" marginRight="auto">
        {formTitle}
      </Heading>
      <VStack spacing={4} align="stretch" width="100%">
        {schema.map(props => (
          <InputElement
            key={props.key}
            formKey={props.key}
            register={register}
            errors={errors}
            {...props}
          />
        ))}
      </VStack>
    </Flex>
  );
};

export default FormSection;
