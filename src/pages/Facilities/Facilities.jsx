import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Button,
  Avatar,
  IconButton,
  Flex,
  Icon,
  Text,
  Heading,
  Hide,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  VStack,
  Box,
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
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';

const Facilities = () => {
  // This is ALL OF THE FACILITIES
  const Navigate = useNavigate();
  /* eslint-disable  no-unused-vars */
  const [facilities, setFacilities] = useState([]);
  const [pagedFacilities, setPagedFacilities] = useState([[]]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const navigateViewMore = (
    username,
    address,
    desc,
    id,
    contactPerson,
    title,
    phoneNumber,
    email,
  ) => {
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
    <Flex direction="column" width="100%" height="100%" align="center">
      <BreadcrumbBar left="Facilities">
        <Button
          size="sm"
          colorScheme="gray"
          m={0.1}
          justify="right"
          onClick={() => {
            Navigate('/add-facility');
          }}
        >
          <BsPlusLg />
          Add Facility
        </Button>
      </BreadcrumbBar>
      {/* I dont like this but im tired  */}
      <Flex width="90%" justifyContent={['center', 'flex-start']} my={5}>
        <Heading
          as="h4"
          color="black"
          mr="auto"
          fontFamily="Quicksand"
          fontWeight="600"
          fontSize="48px"
        >
          Facilities
        </Heading>
      </Flex>

      <Hide below="md">
        <Flex width="90%" direction="column">
          <TableContainer variant="simple" justify="left" width="100%">
            <Table size="sm" borderWidth={1}>
              <Thead height="40px" borderTopRadius="lg">
                <Tr bgColor="#F7FAFC">
                  <Th />
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
                    <Th key={header}>
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
                    contact_person: contactPerson,
                    title,
                    phoneNumber,
                    email,
                  }) => (
                    <Tr key={name} py={2}>
                      <Td>
                        <Avatar
                          marginRight="10px"
                          size="sm"
                          src="https://i0.wp.com/fullertonobserver.com/wp-content/uploads/2020/12/OCJail.jpg?resize=829%2C436&ssl=1"
                        />
                      </Td>
                      <Td>{name}</Td>
                      <Td>{addressLine}</Td>
                      <Td>{description}</Td>
                      <Td>Some Random Contact</Td>
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
                              contactPerson,
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
              contact_person: contactPerson,
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
                        contactPerson,
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
    </Flex>
  );
};
export default Facilities;
