import React from 'react';
import { Flex } from '@chakra-ui/react';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import SelectInput from './SelectInput';

const InputElement = ({
  errors,
  formKey,
  register,
  childrenInputs,
  type,
  title,
  placeholder,
  ...props
}) => {
  if (type === 'split' && childrenInputs) {
    return (
      <Flex direction="row" align="center" justify="center" gap={2}>
        {childrenInputs.map(childProps => {
          return (
            <InputElement
              {...props}
              {...childProps}
              key={childProps.key}
              title={childProps.title}
              placeholder={childProps.placeholder}
              formKey={childProps.key}
              type={childProps.type}
              register={register}
              errors={errors}
            />
          );
        })}
      </Flex>
    );
  }
  if (type === 'text') {
    return (
      <TextInput
        key={formKey}
        title={title}
        register={register}
        errors={errors}
        formKey={formKey}
        placeholder={placeholder}
        {...props}
      />
    );
  }
  if (type === 'number') {
    return (
      <TextInput
        key={formKey}
        title={title}
        register={register}
        errors={errors}
        formKey={formKey}
        placeholder={placeholder}
        type="number"
        defaultValue={0}
        {...props}
      />
    );
  }
  if (type === 'date') {
    return (
      <TextInput
        key={formKey}
        title={title}
        register={register}
        errors={errors}
        formKey={formKey}
        placeholder={placeholder}
        type="date"
        defaultValue={0}
        {...props}
      />
    );
  }
  if (type === 'textarea') {
    return (
      <TextareaInput
        key={formKey}
        title={title}
        register={register}
        errors={errors}
        formKey={formKey}
        placeholder={placeholder}
        type="textarea"
        {...props}
      />
    );
  }
  if (type === 'select') {
    return (
      <SelectInput
        key={formKey}
        title={title}
        register={register}
        errors={errors}
        formKey={formKey}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  return <></>;
};

export default InputElement;
