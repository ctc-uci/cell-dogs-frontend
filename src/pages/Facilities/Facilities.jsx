/* eslint-disable camelcase */
import { AddIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Hide,
  Icon,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  BsChevronLeft,
  BsChevronRight,
  BsFillClockFill,
  BsFillTagFill,
  BsPersonFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { useBackend } from '../../contexts/BackendContext';

const Facilities = () => {
  const Navigate = useNavigate();
  /* eslint-disable  no-unused-vars */
  const [facilities, setFacilities] = useState([]);
  const [pagedFacilities, setPagedFacilities] = useState([[]]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const navigateViewMore = (username, address, desc, id) => {
    Navigate('/view-more', {
      state: {
        name: username,
        addressLine: address,
        description: desc,
        id,
      },
    });
  };

  useEffect(() => {
    console.log(pagedFacilities);
    // have it so that each page has resultsPerPage facilities
    setPage(0);
    const temp = facilities.reduce((acc, cur, i) => {
      if (i % resultsPerPage === 0) {
        acc.push([cur]);
      } else {
        acc[acc.length - 1].push(cur);
      }
      return acc;
    }, []);

    setPagedFacilities(temp);
  }, [facilities, resultsPerPage]);

  const { backend } = useBackend();
  const getFacilities = async () => {
    const { data } = await backend.get('/facility');

    setFacilities(data);
  };

  useEffect(() => {
    getFacilities();
  }, []);
  return (
    <>
      <BreadcrumbBar left="Facilities">
        <Button
          leftIcon={<AddIcon />}
          size="sm"
          onClick={() => {
            Navigate('/add-facility');
          }}
        >
          Add Facility
        </Button>
      </BreadcrumbBar>

      <Box p={10}>
        <Flex width="90%" justifyContent={['center', 'flex-start']} my={5}>
          <h2>Facilities</h2>
        </Flex>

        <Hide below="md">
          <Flex width="100%" direction="column">
            <TableContainer variant="simple" justify="left" width="100%">
              <Table w="full" borderWidth="1px">
                <Thead height="40px" borderTopRadius="lg">
                  <Tr bgColor="#F7FAFC">
                    {[
                      {
                        header: 'Facilities',
                        HeaderIcon: BsPersonFill,
                      },
                      {
                        header: 'Address',
                        HeaderIcon: BsFillClockFill,
                      },
                      {
                        header: 'Notes',
                        HeaderIcon: BsFillTagFill,
                      },
                      {
                        header: 'Contact Person',
                        HeaderIcon: BsPersonFill,
                      },
                    ].map(({ header, HeaderIcon }) => (
                      <Th key={header} fontSize="md">
                        <Flex
                          direction="row"
                          justify="center"
                          height="100%"
                          my="auto"
                          justifyContent="flex-start"
                        >
                          <Icon as={HeaderIcon} my="auto" mr={1} boxSize="4" />
                          {header}
                        </Flex>
                      </Th>
                    ))}

                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* This is where we map over the facilities we want to display */}
                  {pagedFacilities[page]?.map(
                    ({
                      name,
                      address_line: addressLine,
                      description,
                      id,
                      facility_contacts,
                      title,
                      phoneNumber,
                      email,
                    }) => (
                      <Tr key={name} py={2}>
                        <Td style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            marginRight="10px"
                            size="md"
                            src="https://i0.wp.com/fullertonobserver.com/wp-content/uploads/2020/12/OCJail.jpg?resize=829%2C436&ssl=1"
                          />
                          {name}
                        </Td>
                        <Td>{addressLine}</Td>
                        <Td>{description}</Td>
                        <Td>{facility_contacts !== null ? facility_contacts : 'N/A'}</Td>
                        <Td>
                          <Button
                            size="sm"
                            colorScheme="teal"
                            p={3}
                            onClick={() =>
                              navigateViewMore(
                                name,
                                addressLine,
                                description,
                                id,
                                facility_contacts,
                                title,
                                phoneNumber,
                                email,
                              )
                            }
                          >
                            View More
                          </Button>
                        </Td>
                      </Tr>
                    ),
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex
              width="100%"
              justifyContent="space-between"
              direction="row"
              p={3}
              borderWidth={1}
              borderTopWidth={0}
              borderBottomRadius="lg"
            >
              <Flex direction="row" justify="center">
                <Text margin="auto" fontSize="sm" mr={5} whiteSpace="nowrap">
                  Show Pages Per Page
                </Text>
                <Select
                  maxWidth={100}
                  size="sm"
                  variant="outline"
                  borderRadius="md"
                  value={resultsPerPage}
                  onChange={e => setResultsPerPage(e.target.value)}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                    <option key={number}>{number + 1}</option>
                  ))}
                </Select>
              </Flex>
              <Flex direction="row" justify="center">
                <Text margin="auto" fontSize="sm" mr={3}>
                  Page {page + 1} of {pagedFacilities.length}
                </Text>
                <IconButton
                  aria-label="Previous Page"
                  icon={<BsChevronLeft />}
                  size="sm"
                  variant="ghost"
                  colorScheme="gray.500"
                  margin="auto"
                  onClick={() => setPage(page - 1)}
                  isDisabled={page - 1 < 0}
                />
                <IconButton
                  aria-label="Next Page"
                  icon={<BsChevronRight />}
                  size="sm"
                  variant="ghost"
                  colorScheme="gray.500"
                  margin="auto"
                  onClick={() => setPage(page + 1)}
                  isDisabled={page + 1 > pagedFacilities.length - 1}
                />
              </Flex>
            </Flex>
          </Flex>
        </Hide>
        <Hide above="md">
          <VStack gap={3}>
            {facilities.map(
              ({
                name,
                address_line: addressLine,
                description,
                id,
                title,
                phoneNumber,
                email,
                facility_contacts,
              }) => (
                <Card
                  boxShadow="dark-lg"
                  m={6}
                  size="md"
                  p="4"
                  rounded="md"
                  bg="white"
                  minWidth="90%"
                  maxWidth="90%"
                  justifyContent="flex-end"
                  key={name}
                >
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar
                          marginRight="10px"
                          size="xl"
                          src="https://ca-times.brightspotcdn.com/dims4/default/30a8879/2147483647/strip/false/crop/2048x1152+0+0/resize/1486x836!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5a%2Fc5%2F10a8781f4130240d4b4d42d12794%2Fla-1489021677-ia7m9d0xvx-snap-photo"
                        />
                        <Box>
                          <Heading size="lg" marginRight="10px">
                            {name}
                          </Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Flex direction="column" gap={2}>
                      <Box>
                        <Text as="b">Address</Text>
                        <Text>{addressLine}</Text>
                      </Box>
                      <Box>
                        <Text as="b">Notes</Text>
                        <Text>{description}</Text>
                      </Box>
                    </Flex>
                  </CardBody>
                  <CardFooter justifyContent="flex-end" display="flex" width="100%">
                    <Button
                      size="sm"
                      colorScheme="teal"
                      p={3}
                      onClick={() =>
                        navigateViewMore(
                          name,
                          addressLine,
                          description,
                          id,
                          facility_contacts,
                          title,
                          phoneNumber,
                          email,
                        )
                      }
                    >
                      View More
                    </Button>
                  </CardFooter>
                </Card>
              ),
            )}
          </VStack>
        </Hide>
      </Box>
    </>
  );
};
export default Facilities;
