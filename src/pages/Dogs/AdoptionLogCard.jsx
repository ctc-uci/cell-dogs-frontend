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
  Tbody,
  Tr,
  Td,
  Tag,
  Checkbox,
} from '@chakra-ui/react';
import { useBackend } from '../../contexts/BackendContext';
import styles from './AdoptionLogCard.module.css';
import { screenWidthExceeds } from '../../util/utils';

const AdoptionLogCard = props => {
  const [data, setData] = useState([]);

  const { backend } = useBackend();
  const Navigate = useNavigate();
  const { tableId, tableName } = props;
  const isLargerThan768 = screenWidthExceeds(768);

  const getDogs = async () => {
    try {
      const res = await backend.get('/dog');
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDogs();
  }, []);

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

  const dogTableRow = dog => {
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
      <div>
        <div>
          <Card
            boxShadow="dark-lg"
            m={6}
            size="md"
            rounded="md"
            bg="white"
            margin="30px 0px"
            width="280px"
            justifyContent="flex-end"
            key={props.key}
          >
            <CardHeader borderBottom="1px solid #CBD5E0">
              <Flex direction="row">
                <Flex alignItems="center" flexWrap="nowrap" direction="row">
                  <Avatar
                    marginRight="10px"
                    size="lg"
                    src="https://ca-times.brightspotcdn.com/dims4/default/30a8879/2147483647/strip/false/crop/2048x1152+0+0/resize/1486x836!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5a%2Fc5%2F10a8781f4130240d4b4d42d12794%2Fla-1489021677-ia7m9d0xvx-snap-photo"
                  />
                  <Box maxWidth="100%" maxHeight="100%">
                    <Flex flexDirection="row" flexGrow="1">
                      <Heading fontSize="xl">{dogName}</Heading>
                      <Checkbox marginLeft="50px" />
                    </Flex>
                    <Text size="lg" marginRight="10px">
                      aka {setAltName()}
                    </Text>
                    <Text size="lg" marginRight="10px">
                      Grad Age: {gradAge}
                    </Text>
                    <Text size="lg" marginRight="10px">
                      Breed: {breed}
                    </Text>
                  </Box>
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
                  <Flex gap="3px">
                    <Text>
                      <strong>Facility:</strong>
                    </Text>
                    <Text>{facility}</Text>
                  </Flex>
                </Box>
                <Box>
                  <Text as="b">Adopter</Text>
                  <Text>Name: {adopter}</Text>
                  <Text>Phone: {phoneNumber}</Text>
                  <Text>Email: {email}</Text>
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
                onClick={() =>
                  handleViewMore(dogName, facility, adopter, phoneNumber, email, address)
                }
              >
                View More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* for now, only displaying tables that have names (!!tableName) */}
      {!!tableName && isLargerThan768 && (
        <div>
          <div className={styles.tableHeader}>
            <Box margin="auto 50px">
              <Heading as="lg" size="24px">
                {tableName}
              </Heading>
              <Button size="sm" variant="outline">
                Select Facility
              </Button>
              <Button size="sm" variant="outline">
                Copy Adopter&apos;s Email
              </Button>
            </Box>
          </div>
          <SimpleGrid columns={[1, 2, 3, 4]} margin="auto 50px" className="cards">
            {data.map(dog => dogTableRow(dog))}
          </SimpleGrid>
        </div>
      )}
      {/* for now, only displaying tables that have names (!!tableName) */}
      {!!tableName && !isLargerThan768 && (
        <div>
          <div className={styles.tableHeader}>
            <Box width="100%" display="flex" justifyContents="center" alignItems="center">
              <Flex flexDirection="column">
                <Heading as="lg" size="lg">
                  {tableName}
                </Heading>
                <Button size="sm" variant="outline">
                  Copy Adopter&apos;s Email
                </Button>
              </Flex>
            </Box>
          </div>
          <SimpleGrid
            columns={1}
            className="cards"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {data.map(dog => dogTableRow(dog))}
          </SimpleGrid>
        </div>
      )}
    </>
  );
};

export default AdoptionLogCard;
