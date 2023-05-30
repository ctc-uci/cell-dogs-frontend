/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { usePagination, useTable } from 'react-table';
import UserPageHeader from './UserTableHeader';
import CellStructure from './UserTableStructure';

import Pagination from '../../common/TablePagination';
import { useBackend } from '../../contexts/BackendContext';
import { screenWidthExceeds } from '../../util/utils';
import EditUserModal from './EditUserModal';

// TODO: Fill in parameters with following: Table Data, Page Count, Page Settings (index, page size)

const UserPageTable = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [settings, setSettings] = useState({ pageIndex: 0, pageSize: 5 });
  const [render, setRender] = useState(false);
  const { backend } = useBackend();
  const isLargerThan1075 = screenWidthExceeds(1075);

  const getUsers = async () => {
    try {
      const res = await backend.get('/users');
      setData(res.data);
      setPageCount(Math.ceil(res.data.length / settings.pageSize));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = useMemo(
    () => CellStructure(setRender, render, !isLargerThan1075),
    [setRender, render, isLargerThan1075],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      // manualPagination: true,
      pageCount,
    },
    usePagination,
  );

  useEffect(() => {
    setSettings({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  useEffect(() => {
    getUsers();
  }, [render]);

  return (
    <>
      {isLargerThan1075 && (
        <Box p={10}>
          <h2 style={{ marginBottom: '0.5em' }}>Users</h2>
          <Table {...getTableProps()} borderWidth={1}>
            <UserPageHeader headerGroups={headerGroups} />
            <Tbody {...getTableBodyProps()}>
              {page.length === 0 && (
                <Tr>
                  <Td colSpan="6" textAlign="center" py="10">
                    No results
                  </Td>
                </Tr>
              )}
              {page.map(row => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Pagination
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            previousPage={previousPage}
            nextPage={nextPage}
            totalData={data.length}
          />
        </Box>
      )}
      {!isLargerThan1075 && (
        <Grid>
          {data.map(user => {
            return (
              <Card boxShadow="dark-lg" m={6} size="md" p="4" rounded="md" bg="white" key={user.id}>
                <CardHeader>
                  <Heading>
                    {user.firstName} {user.lastName}
                  </Heading>
                  <Text>{user.admin}</Text>
                </CardHeader>

                <CardBody>
                  <Stack>
                    <Heading size="xs">Email</Heading>
                    <Text>{user.email}</Text>
                    <Heading size="xs">Role</Heading>
                    <Text>{user.role}</Text>
                  </Stack>
                </CardBody>
                <Flex minWidth="max-content" w="100%" justifyContent="flex-end">
                  <CardFooter>
                    <Flex>
                      <EditUserModal
                        info={user}
                        setRender={setRender}
                        render={render}
                        isMobile={!isLargerThan1075}
                      />
                    </Flex>
                  </CardFooter>
                </Flex>
              </Card>
            );
          })}
        </Grid>
      )}
      ;
    </>
  );
};
export default UserPageTable;
