import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Button,
  Avatar,
  IconButton,
  Flex,
  Spacer,
  Center,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillClockFill,
  BsPlusLg,
  BsFillTagFill,
  BsPersonFill,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { useBackend } from '../../contexts/BackendContext';

const Facilities = () => {
  // This is ALL OF THE FACILITIES
  const Navigate = useNavigate();
  /* eslint-disable  no-unused-vars */
  const [facilities, setFacilities] = useState([
    {
      name: 'OC Probation',
      address: '123 Irvine Way',
      state_zip: 'Irvine, CA',
      note: 'There will be a meeting once a month',
      contact: 'Jane Smith',
    },
    {
      name: 'Facility 2',
      address: '123 Irvine Way',
      state_zip: 'Irvine, CA',
      note: 'There will be a meeting once a month',
      contact: 'San Francisco',
    },
    {
      name: 'Facility 3',
      address: '789 Main St',
      state_zip: 'Irvine, CA',
      note: 'There will be a meeting once a month',
      contact: 'San Francisco',
    },
  ]);

  // This is only the facilities we'd like to display
  const [displayedFacilities, setDisplayedFacilities] = useState([]);

  // This is the current page we're on
  const [page, setPage] = useState(1);

  const [pageLength, setPageLength] = useState(8);

  const [totalPages, setTotalPages] = useState(Math.ceil(facilities.length / pageLength));

  const { backend } = useBackend();
  const [jsonData, setJsonData] = useState([]);
  // This useEffect will run the function that is passed into it whenever the page state changes
  useEffect(() => {
    // Each page has two facilities
    // We want to display the facilities that are on the current page
    setPageLength(pageLength);
    setDisplayedFacilities(facilities.slice((page - 1) * pageLength, page * pageLength));
    setTotalPages(Math.ceil(facilities.length / pageLength));
  }, [pageLength, page, totalPages]);

  useEffect(() => {
    backend
      .get('/facility')
      .then(response => {
        // const jsonData = response.data;
        setJsonData(response.data);
        // console.log(jsonData); // or do something else with the data
      })
      .catch(error => {});
  }, []);
  return (
    <div>
      <Flex width="100%" p={3}>
        <p border="10px solid" fontSize="60px">
          Facilities
        </p>
        <Spacer />
        <Button
          size="xs"
          colorScheme="gray"
          m={0.1}
          justify="right"
          onClick={() => {
            Navigate('/add-facility');
          }}
        >
          <BsPlusLg boxSize={3} marginRight="4px" />
          Add Facility
        </Button>
      </Flex>
      <hr />
      <TableContainer
        borderRadius="10px"
        padding="20px"
        variant="simple"
        marginLeft="84px"
        justify="left"
        width="90%"
      >
        <Text
          fontSize="48px"
          as="b"
          fontFamily="Quicksand"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="60px"
          color="black"
        >
          {' '}
          Facilities{' '}
        </Text>
        <Table size="sm" borderRadius="6px" border="1px solid #E2E8F0">
          <Thead height="40px">
            <Tr bgColor="#F7FAFC">
              <Th width="fill">
                <Flex direction="row" justify="center">
                  <BsPersonFill paddingRight="10px" />
                  Facilities
                </Flex>
              </Th>
              <Th width="fill">
                <Flex direction="row" justify="center">
                  <BsFillClockFill paddingRight="10px" />
                  Address
                </Flex>
              </Th>
              <Th width="fill">
                <Flex direction="row" justify="center">
                  <BsFillTagFill paddingRight="10px" />
                  Notes
                </Flex>
              </Th>
              <Th width="fill">
                <Flex direction="row" justify="center">
                  <BsPersonFill paddingRight="10px" />
                  Contact Person
                </Flex>
              </Th>
              <Th> </Th>
            </Tr>
          </Thead>
          <Tbody height="200px">
            {/* This is where we map over the facilities we want to display */}
            {jsonData.map(item => (
              <Tr key={item.name}>
                <Td>
                  <Avatar
                    marginRight="10px"
                    size="sm"
                    src="https://i0.wp.com/fullertonobserver.com/wp-content/uploads/2020/12/OCJail.jpg?resize=829%2C436&ssl=1"
                  />
                  {item.name}
                </Td>
                <Td>{item.address_line}</Td>
                <Td>{item.description}</Td>
                <Td> </Td>
                <Td>
                  {' '}
                  <Button size="xs" colorScheme="teal" m={0.1}>
                    View More
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot justifyContent="right">
            <Td>
              <Flex direction="row" width="100%" justify="left" align="center">
                <Center>Show {pageLength} rows per page</Center>
                <Select
                  size="sm"
                  height="30px"
                  width="75px"
                  autosize="false"
                  marginLeft="10px"
                  onChange={e => {
                    // update page number
                    setPageLength(parseInt(e.target.value, 10));
                  }}
                >
                  <option value="8" selected>
                    8
                  </option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                </Select>
                <Spacer />
              </Flex>
            </Td>
            <Td> </Td>
            <Td> </Td>
            <Td> </Td>
            <Td>
              <Flex direction="row">
                <Center fontSize="14px" justifyContent="left">
                  {page} of {totalPages}
                </Center>
                <IconButton
                  onClick={() => {
                    // increment the page state by 1
                    if (page - 1 > 0) {
                      setPage(page - 1);
                    }
                  }}
                  bgColor="white"
                  size="xs"
                  icon={<BsChevronLeft h={6} w={6} color="black" />}
                />
                <IconButton
                  onClick={() => {
                    // increment the page state by 1
                    if (page + 1 <= totalPages) {
                      setPage(page + 1);
                    }
                  }}
                  bgColor="white"
                  size="xs"
                  icon={<BsChevronRight h={6} w={6} color="black" />}
                />
              </Flex>
            </Td>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Facilities;
