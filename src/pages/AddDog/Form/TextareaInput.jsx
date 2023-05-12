import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Textarea } from '@chakra-ui/react';

const TextAreaInput = ({ register, errors, formKey, title, placeholder, ...props }) => {
  return (
    <FormControl isInvalid={errors[formKey]} key={formKey}>
      <FormLabel htmlFor="name">{title}</FormLabel>
      <Textarea id="name" placeholder={placeholder} {...{ ...props, ...register(formKey) }} />
      <FormErrorMessage>{errors[formKey] && errors[formKey]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextAreaInput;
