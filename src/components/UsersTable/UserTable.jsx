/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Table, Tr, Td, Tbody, Box } from '@chakra-ui/react';
import UserPageHeader from './UserTableHeader';
import CellStructure from './UserTableStructure';

import Pagination from '../../common/TablePagination';
import { useBackend } from '../../contexts/BackendContext';

// TODO: Fill in parameters with following: Table Data, Page Count, Page Settings (index, page size)

const UserPageTable = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [settings, setSettings] = useState({ pageIndex: 0, pageSize: 5 });
  const [render, setRender] = useState(false);
  const { backend } = useBackend();

  const getUsers = async () => {
    try {
      const res = await backend.get('/users');
      setData(res.data);
      setPageCount(Math.ceil(res.data.length / settings.pageSize));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = useMemo(() => CellStructure(setRender, render), [setRender, render]);
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
    <Box p={10}>
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
  );
};
export default UserPageTable;
