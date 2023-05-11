import { AddIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
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
        <Button leftIcon={<AddIcon />} size="sm" onClick={accountModalonOpen}>
          Add User
        </Button>
        <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
      </BreadcrumbBar>
      <UserPageTable />
    </div>
  );
};

export default Users;
