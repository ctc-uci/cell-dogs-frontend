import React, { useEffect, useState } from 'react';
import { FormErrorMessage, FormLabel, FormControl, Select } from '@chakra-ui/react';
import { useBackend } from '../../../contexts/BackendContext';

const SelectInput = ({ register, errors, formKey, title, placeholder, dataset, ...props }) => {
  const { backend } = useBackend();
  const [options, setOptions] = useState([]);
  const getFacilities = async () => {
    const { data } = await backend.get('/facility');

    setOptions(
      data.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    );
  };

  useEffect(() => {
    if (!props.options) {
      getFacilities();
    } else {
      setOptions(
        props.options.map(option => ({
          value: option,
          label: option,
        })),
      );
    }
  }, []);
  return (
    <FormControl isInvalid={errors[formKey]} key={formKey}>
      <FormLabel htmlFor={formKey}>{title}</FormLabel>
      <Select id={formKey} placeholder={placeholder} {...{ ...props, ...register(formKey) }}>
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errors[formKey] && errors[formKey]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SelectInput;
