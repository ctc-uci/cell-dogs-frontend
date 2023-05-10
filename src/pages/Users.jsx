import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import AddNewUserModal from '../components/AddNewUserModal/AddNewUserModal';
import BreadcrumbBar from '../components/BreadcrumbBar/BreadcrumbBar';
import UserPageTable from '../components/UsersTable/UserTable';

import './Users.css';

const Users = () => {
  const {
    isOpen: accountModalisOpen,
    onOpen: accountModalonOpen,
    onClose: accountModalonClose,
  } = useDisclosure();

  return (
    <div>
      <BreadcrumbBar left="Users">
        <Button size="sm" colorScheme="gray" m={0.1} justify="right" onClick={accountModalonOpen}>
          <BsPlusLg />
          Add User
        </Button>
        <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
      </BreadcrumbBar>
      <UserPageTable />
    </div>
  );
};

export default Users;
