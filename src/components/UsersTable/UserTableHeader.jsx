/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Thead, Tr, Th } from '@chakra-ui/react';

const UserTableHeader = ({ headerGroups }) => {
  return (
    <Thead>
      {headerGroups.map(headerGroup => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Tr id="table-head" w="parent" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <Th
              color="white"
              bgColor="#F7FAFC"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...column.getHeaderProps()}
            >
              {column.render('Header')}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

UserTableHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.array.isRequired,
};

export default UserTableHeader;
