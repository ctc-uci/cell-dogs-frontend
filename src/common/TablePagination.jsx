import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Select, Text, IconButton, Spacer } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

// pagination that is represented at the bottom of the table
const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageSize,
  pageIndex,
  setPageSize,
  previousPage,
  nextPage,
  totalData,
}) => {
  const rowText = () => {
    const left = pageIndex === 0 ? 1 : pageIndex * pageSize + 1;
    const right = Math.min(totalData, pageSize * (pageIndex + 1));
    return totalData === 0 ? `0` : `${left}-${right} of ${totalData}`;
  };

  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              canPreviousPage,
              canNextPage,
              pageSize,
              pageIndex,
              totalData,
            },
            null,
            2,
          )}
        </code>
      </pre> */}
      <Flex
        bg="white"
        alignItems={{ md: 'center', base: 'flex-end' }}
        pl="24px"
        pt="8px"
        pb="8px"
        pr="24px"
        borderBottom="1px solid #EDF2F7"
        borderBottomRadius={10}
        direction={{ md: 'row', base: 'column' }}
      >
        <Flex alignItems="center">
          <Flex pr="8px">
            <Text color="#2D3748">Show rows per page</Text>
          </Flex>
          <Flex>
            <Select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
              bg="white"
              w="75px"
            >
              {[5, 10, 15, 20].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <Spacer />
        <Flex>
          <Flex alignItems="center" pr="15px">
            <Text color="#2D3748">{rowText()}</Text>
          </Flex>
          <Flex alignItems="center" pr="4px">
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              icon={<ChevronLeftIcon color="#2D3748" />}
              isDisabled={!canPreviousPage}
              onClick={() => {
                previousPage();
              }}
            />
          </Flex>
          <Flex>
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              icon={<ChevronRightIcon color="#2D3748" />}
              isDisabled={!canNextPage}
              onClick={() => {
                nextPage();
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

Pagination.propTypes = {
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  totalData: PropTypes.number.isRequired,
};

export default Pagination;
