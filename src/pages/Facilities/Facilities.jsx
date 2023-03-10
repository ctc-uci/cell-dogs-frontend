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
  const [page, setPage] = useState(1);

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
        <Heading as="h4" color="black" mr="auto">
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
              <Tbody height="200px">
                {/* This is where we map over the facilities we want to display */}
                {facilities.map(
                  ({
                    name,
                    address_line: addressLine,
                    description,
                    contact_person: contactPerson,
                  }) => (
                    <Tr key={name}>
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
                        {' '}
                        <Button size="sm" colorScheme="teal" p={3}>
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
              <Select maxWidth={100} size="sm" variant="outline" borderRadius="md">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                  <option key={number}>{number}</option>
                ))}
              </Select>
            </Flex>
            <Flex direction="row" justify="center">
              <Text margin="auto" fontSize="sm" mr={3}>
                Page {page} of 10
              </Text>
              <IconButton
                aria-label="Previous Page"
                icon={<BsChevronLeft />}
                size="sm"
                variant="ghost"
                colorScheme="gray.500"
                margin="auto"
              />
              <IconButton
                aria-label="Next Page"
                icon={<BsChevronRight />}
                size="sm"
                variant="ghost"
                colorScheme="gray.500"
                margin="auto"
              />
            </Flex>
          </Flex>
        </Flex>
      </Hide>
      <Hide above="md">
        <VStack gap={3}>
          {facilities.map(
            ({ name, address_line: addressLine, description, contact_person: contactPerson }) => (
              <Card
                size="md"
                boxShadow="sm"
                borderWidth={1}
                borderColor="gray.200"
                p="4"
                rounded="md"
                bg="white"
                key={name}
                width={500}
                cursor="pointer"
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
                  <Button size="sm" colorScheme="teal">
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
