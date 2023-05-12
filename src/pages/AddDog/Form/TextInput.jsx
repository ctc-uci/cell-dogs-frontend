import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/react';

const TextInput = ({ register, errors, formKey, title, placeholder, ...props }) => {
  return (
    <FormControl isInvalid={errors[formKey]} key={formKey}>
      <FormLabel htmlFor="name">{title}</FormLabel>
      <Input id="name" placeholder={placeholder} {...{ ...props, ...register(formKey) }} />
      <FormErrorMessage>{errors[formKey] && errors[formKey]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
