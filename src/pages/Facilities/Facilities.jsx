/* eslint-disable no-unused-vars */
import React from 'react';
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
  Hide,
  useMediaQuery,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Text,
  Stack,
  SimpleGrid,
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

const Facilities = () => {
  const Navigate = useNavigate();
  const [isLargerThan1012] = useMediaQuery('(min-width: 1012px)');
  return (
    <>
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
      <Hide below="md">
        <div>
          <TableContainer
            borderRadius="10px"
            padding="20px"
            variant="simple"
            marginLeft="84px"
            justify="left"
            width="90%"
          >
            <Table size="sm" borderRadius="6px" border="1px solid #E2E8F0">
              <Thead height="40px">
                <Tr bgColor="#F7FAFC">
                  <Th width="320px">
                    <Flex direction="row" justify="center">
                      <BsPersonFill paddingRight="10px" />
                      Facilities
                    </Flex>
                  </Th>
                  <Th width="fill">
                    <Flex direction="row" justify="center">
                      <BsFillClockFill />
                      Address
                    </Flex>
                  </Th>
                  <Th width="fill">
                    <Flex direction="row" justify="center">
                      <BsFillTagFill />
                      Notes
                    </Flex>
                  </Th>
                  <Th width="fill">
                    <Flex direction="row" justify="center">
                      <BsPersonFill />
                      Contacts
                    </Flex>
                  </Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody height="200px">
                <Tr>
                  <Td>
                    <Avatar
                      marginRight="10px"
                      size="sm"
                      src="https://newsantaana.com/wp-content/uploads/2021/05/Orange-County-Juvenile-Hall-.jpg"
                    />
                    OC Probation
                  </Td>
                  <Td>
                    <p>123 Irvine Way</p>
                    <p>Fountain Valley, CA</p>
                  </Td>
                  <Td>
                    <p>There will be a meeting</p>
                    <p>once a month</p>
                  </Td>
                  <Td>Jane Smith</Td>
                  <Td>
                    {' '}
                    <Button size="xs" colorScheme="teal" m={0.1}>
                      View More
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Avatar
                      marginRight="10px"
                      size="sm"
                      src="https://ca-times.brightspotcdn.com/dims4/default/30a8879/2147483647/strip/false/crop/2048x1152+0+0/resize/1486x836!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5a%2Fc5%2F10a8781f4130240d4b4d42d12794%2Fla-1489021677-ia7m9d0xvx-snap-photo"
                    />
                    Theo Lacy Facility
                  </Td>
                  <Td>
                    <p>123 Irvine Way</p>
                    <p>Fountain Valley, CA</p>
                  </Td>
                  <Td>-</Td>
                  <Td>Howard Gillman, Jack Smith</Td>
                  <Td>
                    {' '}
                    <Button size="xs" colorScheme="teal" m={0.1}>
                      View More
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Avatar
                      marginRight="10px"
                      size="sm"
                      src="https://i0.wp.com/fullertonobserver.com/wp-content/uploads/2020/12/OCJail.jpg?resize=829%2C436&ssl=1"
                    />
                    OC Sheriff&apos;s Department - James A. Musick Facility
                  </Td>
                  <Td>
                    <p>123 Irvine Way</p>
                    <p>Fountain Valley, CA</p>
                  </Td>
                  <Td>
                    <p>There will be a new dog</p>
                    <p>coming in tomorrow exp..</p>
                  </Td>
                  <Td>Kevin Hart</Td>
                  <Td>
                    {' '}
                    <Button size="xs" colorScheme="teal" m={0.1}>
                      View More
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Td>
                  <Flex direction="row" width="100%" justify="left" align="center">
                    <Center>Show rows per page</Center>
                    <Select
                      placeholder="8"
                      size="sm"
                      height="30px"
                      width="75px"
                      autosize="false"
                      marginLeft="10px"
                    >
                      <option value="8">7</option>
                      <option value="7">6</option>
                      <option value="6">5</option>
                    </Select>
                    <Spacer />
                  </Flex>
                </Td>
                <Td />
                <Td />
                <Td />
                <Flex direction="row" justify="left">
                  <Center fontSize="14px">1-1 of 1</Center>
                  <IconButton bgColor="white" icon={<BsChevronLeft h={6} w={6} color="black" />} />
                  <IconButton bgColor="white" icon={<BsChevronRight h={6} w={6} color="black" />} />
                </Flex>
              </Tfoot>
            </Table>
          </TableContainer>
        </div>
      </Hide>
      {!isLargerThan1012 && (
        <div>
          {/* <Stack spacing="4"> */}
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            <Card size="md" boxShadow="dark-lg" p="4" rounded="md" bg="white">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      marginRight="10px"
                      size="xl"
                      src="https://newsantaana.com/wp-content/uploads/2021/05/Orange-County-Juvenile-Hall-.jpg"
                    />
                    <Box>
                      <Heading size="lg" marginRight="10px">
                        OC Probation
                      </Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text as="b">Address</Text>
                <Text>123 Irvine Way</Text>
                <Text>Fountain Valley, CA</Text>
                <Text as="b">Contact Person</Text>
                <Text>Howard Gillman, Jack Smith</Text>
                <Text as="b">Notes</Text>
                <Text>There will be a meeting once a month.</Text>
              </CardBody>
              <CardFooter>
                <Button colorScheme="blue">View More</Button>
              </CardFooter>
            </Card>
            <Card size="md" boxShadow="dark-lg" p="4" rounded="md" bg="white">
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
                        Theo Lacy Facility
                      </Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text as="b">Address</Text>
                <Text>123 Irvine Way</Text>
                <Text>Fountain Valley, CA</Text>
                <Text as="b">Contact Person</Text>
                <Text>Howard Gillman, Jack Smith</Text>
                <Text as="b">Notes</Text>
              </CardBody>
              <CardFooter>
                <Button colorScheme="blue">View More</Button>
              </CardFooter>
            </Card>
            {/* </Stack> */}
          </SimpleGrid>
        </div>
      )}
    </>
  );
};
export default Facilities;
