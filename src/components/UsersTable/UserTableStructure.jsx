import React from 'react';
import { Text, Icon, HStack, Box } from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import EditUserModal from './EditUserModal';

const CellStructure = (setRender, render, isMobile) => {
  console.log(isMobile);
  /* eslint-disable react/destructuring-assignment, react/prop-types */
  const cellStructure = [
    {
      id: 'names',
      Header: (
        <>
          <HStack>
            <Icon color="#2D3748" as={BsPersonFill} boxSize={3} />
            <Text color="#2D3748">Name</Text>
          </HStack>
        </>
      ),
      accessor: d => ({
        firstName: d.firstName,
        lastName: d.lastName,
      }),

      Cell: props => (
        <Text>
          {props.value.firstName} {props.value.lastName}
        </Text>
      ),
    },
    {
      id: 'email',
      Header: (
        <>
          <HStack>
            <Icon color="#2D3748" as={AiOutlineInfoCircle} boxSize={3} />
            <Text color="#2D3748">Email</Text>
          </HStack>
        </>
      ),
      accessor: 'email',
      Cell: ({ value }) => <Text>{value}</Text>,
    },
    {
      id: 'role',
      Header: (
        <>
          <HStack>
            <Icon color="#2D3748" as={AiOutlineInfoCircle} boxSize={3} />
            <Text color="#2D3748">Role</Text>
          </HStack>
        </>
      ),
      accessor: 'role',
      Cell: ({ value }) => <Text>{'Developer'}</Text>,
    },
    {
      id: 'edit',
      Header: '',
      accessor: d => ({
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
      }),
      Cell: ({ value }) => (
        <Box align="right" mr="30px">
          <EditUserModal info={value} setRender={setRender} render={render} isMobile={isMobile} />
        </Box>
      ),
    },
  ];
  return cellStructure;
};

export default CellStructure;
