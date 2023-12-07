import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { possibleDogTags } from '../../util/utils';

const AdoptionLogFacilityCards = ({
  dogs,
  selected,
  // info,
  // calculateDogAgeAtGraduation,
  toggleCheck,
  facilityName,
}) => {
  const Navigate = useNavigate();

  // const { shelter } = info;
  return (
    <Flex justifyContent="center" alignItems="center" width="100%">
      <SimpleGrid minChildWidth={225} spacing={3} mt={10} mb={10} width="100%">
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
            adoptstate,
            zip,
            image,
            ...rest
          }) => {
            const tags = Object.keys(possibleDogTags).filter(tag => rest[tag]);
            return (
              <Card width={225} key={dogid} marginX="auto">
                <CardHeader>
                  <Flex direction="column">
                    <Flex justifyContent="space-between">
                      <Flex direction="row" gap={1}>
                        <Image
                          boxSize={10}
                          borderRadius="500px"
                          src={image || 'http://via.placeholder.com/250x250'}
                          alt="Segun Adebayo"
                        />
                        <Flex direction="column">
                          <Text fontWeight="bold" fontSize="md">
                            {dogname}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Grad Date: {new Date(graddate).getMonth() + 1}/
                            {new Date(graddate).getFullYear()}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Breed: {breed}
                          </Text>
                        </Flex>
                      </Flex>
                      <Checkbox
                        marginBottom="auto"
                        isChecked={selected.includes(dogid)}
                        onChange={e => {
                          e.stopPropagation();
                          toggleCheck(dogid);
                        }}
                      />
                    </Flex>
                    <SimpleGrid minChildWidth={30} spacing={1}>
                      {tags.map(tag => (
                        <Tag
                          maxW={70}
                          textAlign="center"
                          key={tag}
                          size="sm"
                          variant="solid"
                          color="white"
                          bg={possibleDogTags[tag].color}
                        >
                          {possibleDogTags[tag].display}
                        </Tag>
                      ))}
                    </SimpleGrid>
                  </Flex>
                </CardHeader>
                <CardBody borderTopWidth={1}>
                  <VStack spacing={1} align="stretch">
                    <Stack direction="row">
                      <Text fontWeight="bold" fontSize="md" textDecoration="underline">
                        Facility:
                      </Text>
                      <Text fontSize="md" margin="auto">
                        {facilityName}
                      </Text>
                    </Stack>
                    <Text fontSize="md" textDecoration="underline">
                      Adopter
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Name: {adoptername}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Email: {adoptemail}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Phone: {adopterphone}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Address: {addrline}, {adoptcity}, {adoptstate} {zip}
                    </Text>
                  </VStack>
                </CardBody>
                <CardFooter>
                  <Button
                    marginLeft="auto"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                      Navigate(`/dog/${dogid}`);
                    }}
                    bg="#319795"
                    color="white"
                  >
                    View More
                  </Button>
                </CardFooter>
              </Card>
            );
          },
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default AdoptionLogFacilityCards;
