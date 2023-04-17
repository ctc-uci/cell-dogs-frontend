/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heading,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Flex,
  Box,
  SimpleGrid,
  Tag,
  Checkbox,
} from '@chakra-ui/react';
import { useBackend } from '../../contexts/BackendContext';
import styles from './AdoptionLogCard.module.css';
import { screenWidthExceeds } from '../../util/utils';

const AdoptionLogCard = props => {
  const Navigate = useNavigate();
  const { tableId, tableName, data, searchDog } = props;
  const isLargerThan768 = screenWidthExceeds(768);

  const calculateDogAgeAtGraduation = (graduationDate, currentAge) => {
    // Step 1: Convert graduation date to JavaScript Date object
    const gradDate = new Date(graduationDate);

    // Step 2: Calculate birth year of dog based on current age
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - currentAge;

    // Step 3: Calculate age of dog at graduation in milliseconds
    const birthDate = new Date(birthYear, 0, 1); // January 1st of the birth year
    const ageAtGraduationInMs = gradDate - birthDate;

    // Step 4: Convert age of dog at graduation from milliseconds to years
    const ageAtGraduationInYears = ageAtGraduationInMs / (1000 * 60 * 60 * 24 * 365);

    return Math.floor(ageAtGraduationInYears);
  };

  const dogTableRow = (dog, width) => {
    const {
      altName,
      shelter,
      dogname,
      graddate,
      age,
      breed,
      adoptername,
      adopterphone,
      adoptemail,
      addrline,
      adoptcity,
      adoptstate,
      dogid,
      service,
      therapy,
      staffAdoption,
      specialNeeds,
      deceased,
      facilityid,
    } = dog;

    if (facilityid !== tableId) {
      return null;
    }

    const dogName = dogname;
    const gradAge = calculateDogAgeAtGraduation(graddate, age);
    const facility = shelter;
    const adopter = adoptername;
    const phoneNumber = adopterphone;
    const email = adoptemail;
    const address = `${addrline} ${adoptcity} ${adoptstate}`;
    const addressline1 = `${addrline}`;
    const addressline2 = `${adoptcity} ${adoptstate}`;

    const handleViewMore = () => {
      Navigate(`/dog/${dogid}`);
    };

    function setAltName() {
      return altName || 'n/a';
    }

    return (
      <Card
        boxShadow="dark-lg"
        m={6}
        size="md"
        rounded="md"
        bg="white"
        justifyContent="flex-end"
        key={props.key}
        maxWidth={350}
      >
        <CardHeader borderBottom="1px solid #CBD5E0">
          <Flex alignItems="center" flexWrap="nowrap" direction="row">
            <Avatar
              marginRight="10px"
              size="xl"
              src="https://ca-times.brightspotcdn.com/dims4/default/30a8879/2147483647/strip/false/crop/2048x1152+0+0/resize/1486x836!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5a%2Fc5%2F10a8781f4130240d4b4d42d12794%2Fla-1489021677-ia7m9d0xvx-snap-photo"
              marginBottom="15px"
            />
            <Flex flexDirection="column" flexGrow="1">
              <Flex flexDirection="row" alignItems="flex-start">
                <Flex>
                  <Heading fontSize="xl">{dogName}</Heading>
                </Flex>
                <Flex flexGrow="1" />
                <Checkbox />
              </Flex>
              <Text size="lg" marginRight="10px" width="100%">
                aka {setAltName()}
              </Text>
              <Text size="lg" marginRight="10px">
                Grad Age: {gradAge}
              </Text>
              <Text size="lg" marginRight="10px" width="100%">
                Breed: {breed}
              </Text>
            </Flex>
          </Flex>
          <Flex gap="5px" flexWrap="wrap">
            {service && (
              <Tag background="#48BB78" color="#FFFFFF">
                Service
              </Tag>
            )}
            {therapy && (
              <Tag background="#4299E1" color="#FFFFFF">
                Therapy
              </Tag>
            )}
            {staffAdoption && (
              <Tag background="#ECC94B" color="#FFFFFF">
                Stf Adpt
              </Tag>
            )}
            {specialNeeds && (
              <Tag background="#ED8936" color="#FFFFFF">
                Special
              </Tag>
            )}
            {deceased && (
              <Tag background="#C53030" color="#FFFFFF">
                Decsd
              </Tag>
            )}
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex gap={2} flexDirection="column">
            <Box>
              <Flex gap="3px" alignItems="baseline">
                <Heading fontSize="md">Facility:</Heading>
                <Text>{facility}</Text>
              </Flex>
            </Box>
            <Box>
              <Heading fontSize="md" marginBottom="5px">
                Adopter
              </Heading>
              <Text>Name: {adopter}</Text>
              <Flex gap="3px">
                <Text>Phone: </Text>
                <Text color="#3182ce" textDecoration="underline">
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </Text>
              </Flex>
              <Flex gap="3px">
                <Text>Email:</Text>
                <Text color="#3182ce" textDecoration="underline">
                  <a href={`mailto:${email}`}>{email}</a>
                </Text>
              </Flex>
              <Text>Address: </Text>
              <Text>{addressline1}</Text>
              <Text>{addressline2}</Text>
            </Box>
          </Flex>
        </CardBody>
        <CardFooter justifyContent="flex-end" display="flex" width="100%">
          <Button
            size="sm"
            colorScheme="teal"
            p={3}
            onClick={() => handleViewMore(dogName, facility, adopter, phoneNumber, email, address)}
          >
            View More
          </Button>
        </CardFooter>
      </Card>
    );
  };
  return (
    <>
      {/* for now, only displaying tables that have names (!!tableName) */}
      {!!tableName && isLargerThan768 && (
        <Flex flexDirection="column">
          <Flex className={styles.tableHeader} margin="auto 135px" gap="10px" wrap="nowrap">
            <Heading as="lg" size="lg">
              {tableName}
            </Heading>
            <Button size="sm" variant="outline">
              Select Facility
            </Button>
            <Button size="sm" variant="outline">
              Copy Adopter&apos;s Email
            </Button>
          </Flex>
          <SimpleGrid
            columns={[1, 1, 1, 1]}
            maxWidth="100%"
            width="auto"
            minChildWidth={300}
            gap={3}
          >
            {data.map(dog => dogTableRow(dog, 280))}
          </SimpleGrid>
        </Flex>
      )}
      {/* for now, only displaying tables that have names (!!tableName) */}
      {!!tableName && !isLargerThan768 && (
        <Flex flexDirection="column" alignItems="center">
          <Flex flexDirection="column" justifyContents="center" gap="10px" marginRight="145px">
            <Heading as="lg" size="lg" marginBottom="10px" marginTop="10px">
              {tableName}
            </Heading>
            <Button size="sm" variant="outline" fontSize="12px">
              Copy Adopter&apos;s Email
            </Button>
          </Flex>
          <SimpleGrid columns={1}>{data.map(dog => dogTableRow(dog, 313))}</SimpleGrid>
        </Flex>
      )}
    </>
  );
};

export default AdoptionLogCard;
