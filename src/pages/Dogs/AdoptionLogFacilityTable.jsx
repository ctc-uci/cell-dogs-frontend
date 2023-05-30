import {
  Button,
  Checkbox,
  Flex,
  Image,
  Link,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { possibleDogTags } from '../../util/utils';
// import ShowTags from '../AddDog/ShowTags';
const AdoptionLogFacilityTable = ({
  dogs,
  selected,

  calculateDogAgeAtGraduation,
  toggleCheck,
  facilitySelected,
  toggleFacilitySelected,
}) => {
  const Navigate = useNavigate();
  return (
    <TableContainer mt={5} overflowX="scroll" borderWidth={1} borderRadius="lg">
      <Table
        size={{
          base: 'sm',
          md: 'md',
        }}
      >
        <Thead bg="gray.100">
          <Tr>
            <Th>
              <Checkbox
                bg="white"
                size="md"
                borderWidth={1}
                borderColor="gray.300"
                isChecked={facilitySelected}
                onChange={e => {
                  e.stopPropagation();
                  toggleFacilitySelected();
                }}
              />
            </Th>
            <Th>Dog Name</Th>
            <Th>Tags</Th>
            {/* Facility, Adoptor, Contact Info, Address */}

            <Th>Adoptor</Th>
            <Th>Contact Info</Th>
            <Th>Address</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody maxHeight="500px">
          {dogs.map(
            ({
              dogid,
              dogname,
              graddate,
              age,
              breed,
              adoptername,
              adoptemail,
              adopterphone,
              addrline,
              adoptcity,
              image,
              adoptstate,
              zip,
              ...rest
            }) => {
              const tags = Object.keys(possibleDogTags).filter(tag => rest[tag]);
              return (
                <Tr
                  key={dogid}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  // onClick={() => Navigate(`/dog/${dogid}`)}
                >
                  <Td>
                    <Checkbox
                      isChecked={selected.includes(dogid)}
                      onChange={e => {
                        e.stopPropagation();
                        toggleCheck(dogid);
                      }}
                    />
                  </Td>
                  <Td>
                    <Flex direction="row" gap={1}>
                      <Image
                        boxSize={10}
                        borderRadius="500px"
                        src={image || 'http://via.placeholder.com/250x250'}
                        fallbackSrc="http://via.placeholder.com/250x250"
                        alt="Segun Adebayo"
                      />
                      <Flex direction="column">
                        <Text fontWeight="bold" fontSize="md">
                          {dogname}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Grad Age: {calculateDogAgeAtGraduation(graddate, age)}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Breed: {breed}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    <VStack spacing={1}>
                      {tags.map(tag => (
                        <Tag
                          key={tag}
                          size="sm"
                          variant="solid"
                          color="white"
                          bg={possibleDogTags[tag].color}
                        >
                          {possibleDogTags[tag].display}
                        </Tag>
                      ))}
                    </VStack>
                  </Td>

                  <Td>{adoptername}</Td>
                  <Td>
                    <Flex direction="column">
                      <Link
                        href={`mailto:${adoptemail}`}
                        color="blue.500"
                        fontSize="sm"
                        textDecoration="underline"
                      >
                        {adoptemail}
                      </Link>
                      <Link
                        href={`tel:${adopterphone}`}
                        color="blue.500"
                        textDecoration="underline"
                        fontSize="sm"
                      >
                        {adopterphone}
                      </Link>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex direction="column">
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${addrline}+${adoptcity}+${adoptstate}+${zip}`}
                        color="blue.500"
                        target="_blank"
                        fontSize="sm"
                        textDecoration="underline"
                      >
                        <Text fontSize="xs">{addrline}</Text>

                        <Text fontSize="xs">
                          {adoptcity},{adoptstate} {zip}
                        </Text>
                      </Link>
                    </Flex>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      onClick={() => {
                        Navigate(`/dog/${dogid}`);
                      }}
                      bg="#319795"
                      color="white"
                    >
                      View More
                    </Button>
                  </Td>
                </Tr>
              );
            },
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdoptionLogFacilityTable;
