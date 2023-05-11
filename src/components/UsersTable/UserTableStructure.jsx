import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import EditUserModal from './EditUserModal';

const CellStructure = (setRender, render, isMobile) => {
  /* eslint-disable react/destructuring-assignment, react/prop-types */
  const cellStructure = [
    {
      id: 'names',
      Header: (
        <>
          <HStack>
            <Icon color="#2D3748" as={BsPersonFill} boxSize={4} />
            <Text color="#2D3748">Names</Text>
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
            <Icon color="#2D3748" as={InfoOutlineIcon} boxSize={4} />
            <Text color="#2D3748">Email Addresses</Text>
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
            <Icon color="#2D3748" as={InfoOutlineIcon} boxSize={4} />
            <Text color="#2D3748">Role</Text>
          </HStack>
        </>
      ),
      accessor: 'role',
      Cell: ({ value }) => <Text>{value || 'N/A'}</Text>,
    },
    {
      id: 'type',
      Header: (
        <>
          <HStack>
            <Icon color="#2D3748" as={InfoOutlineIcon} boxSize={4} />
            <Text color="#2D3748">Account Type</Text>
          </HStack>
        </>
      ),
      accessor: 'accountType',
      Cell: ({ value }) => <Text>{value || 'N/A'}</Text>,
    },
    {
      id: 'edit',
      Header: '',
      accessor: d => ({
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        role: d.role,
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
