import { React, useState, useEffect } from 'react';
import {
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from '@chakra-ui/react';

import { useBackend } from '../../contexts/BackendContext';

import styles from './AdoptionLog.module.css';

// import { DropDownList } from "@progress/kendo-react-dropdowns";
const AdoptionLog = props => {
  const [data, setData] = useState([]);

  const { backend } = useBackend();
  const { tableName } = props;

  const getDogs = async () => {
    try {
      const res = await backend.get('/dog');
      setData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
      dogid
    } = dog;

    if (shelter !== tableName) {
      return null;
    }

    const dogName = dogname;
    const gradAge = calculateDogAgeAtGraduation(graddate, age);
    const facility = shelter;
    const adopter = adoptername;
    const phoneNumber = adopterphone;
    const email = adoptemail;
    const address = `${addrline} ${adoptcity} ${adoptstate}`;

    return (
      <Tr key={dogid}>
        <Td>
          <Checkbox />
        </Td>
        {/* <Td>{dogName}{nickname ? " aka " : null}{nickname}</Td> */}
        <Td>
          <div className={styles.dogName}>{dogName}</div>
          <div className={styles.dogNameSub}>Grad Age: {gradAge}</div>
          <div className={styles.dogNameSub}>Breed: {breed}</div>
        </Td>
        {/* <Td>{tags}</Td> */}
        <Td>{facility}</Td>
        <Td>{adopter}</Td>
        <Td>
          <div>{phoneNumber}</div>
          <div>{email}</div>
        </Td>
        <Td>{address}</Td>
        <Td>
          <Button colorScheme="teal" size="sm">
            View More
          </Button>
        </Td>
      </Tr>
    );
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <div className={styles.adoptionLog}>
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
      <div className="table">
        <TableContainer>
          <Table className={styles.table} variant="simple" borderRadius="10">
            <Thead backgroundColor="#F7FAFC">
              <Tr>
                <Th>
                  <Checkbox />
                </Th>
                <Th>Dog Name</Th>
                {/* <Th>Tags</Th> */}
                <Th>Facility</Th>
                <Th>Adopter</Th>
                <Th>Contact Info</Th>
                <Th>Address</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor="#FDFDFD">
              {data.map(dog => dogTableRow(dog))}
              <Tr />
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdoptionLog;
