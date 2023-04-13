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
} from '@chakra-ui/react';
import { useBackend } from '../../contexts/BackendContext';
import styles from './AdoptionLogCard.module.css';

const AdoptionLogCard = props => {
  const [data, setData] = useState([]);

  const { backend } = useBackend();
  const Navigate = useNavigate();
  const { tableId, tableName } = props;

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

    // const potentialTags = {
    //   serviceTag: service,
    //   therapyTag: therapy,
    //   staffAdoptionTag: staffAdoption,
    //   specialNeedsTag: specialNeeds,
    //   deceasedTag: deceased,
    // };
    // const tags = [];
    // for(let i = 0; i < potentialTags.length; i++) {
    //   if (potentialTags[i]) {

    //   }
    // }
    const dogName = dogname;
    const gradAge = calculateDogAgeAtGraduation(graddate, age);
    const facility = shelter;
    const adopter = adoptername;
    const phoneNumber = adopterphone;
    const email = adoptemail;
    const address = `${addrline} ${adoptcity} ${adoptstate}`;

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
            p="4"
            rounded="md"
            bg="white"
            /* width="280px"
            height="327px" */
            overflow="hidden"
            maxW="sm"
            justifyContent="flex-end"
            key={props.key}
          >
            <CardHeader>
              <Flex spacing="4" direction="row">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap" direction="row">
                  <Avatar
                    marginRight="10px"
                    size="md"
                    src="https://ca-times.brightspotcdn.com/dims4/default/30a8879/2147483647/strip/false/crop/2048x1152+0+0/resize/1486x836!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5a%2Fc5%2F10a8781f4130240d4b4d42d12794%2Fla-1489021677-ia7m9d0xvx-snap-photo"
                  />
                  <Box maxWidth="100%" maxHeight="100%">
                    <Heading size="lg" marginRight="10px">
                      {dogName}
                    </Heading>
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
            </CardHeader>
            <CardBody>
              <Flex gap={2}>
                <Box>
                  <Text as="b">Facility: {shelter}</Text>
                </Box>
                <Box>
                  <Text as="b">Adopter: {adopter}</Text>
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
    <div>
      <div className={styles.tableHeader}>
        <Heading as="lg" size="l">
          {tableName}
        </Heading>
        <Button size="sm" variant="outline">
          Select Facility
        </Button>
        <Button size="sm" variant="outline">
          Copy Adopter&apos;s Email
        </Button>
      </div>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={1} className="cards">
        {data.map(dog => dogTableRow(dog))}
      </SimpleGrid>
    </div>
  );
};

export default AdoptionLogCard;
