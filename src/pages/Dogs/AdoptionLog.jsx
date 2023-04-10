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
  Avatar,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import ShowTags from '../AddDog/ShowTags';
import styles from './AdoptionLog.module.css';

// import { DropDownList } from "@progress/kendo-react-dropdowns";
const AdoptionLog = props => {
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
      dogid,
      service,
      therapy,
      staffAdoption,
      specialNeeds,
      deceased,
      facilityid
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

    const handleViewMore = () => {
      Navigate(`/dog/${dogid}`);
    };

    return (
      <Tr key={props.key}>
        <Td>
          <Checkbox />
        </Td>
        {/* <Td>{dogName}{nickname ? " aka " : null}{nickname}</Td> */}
        <Td>
          <div className={styles.avatarContainer}>
            <Avatar
              marginTop="10px"
              marginRight="10px"
              size="md"
              src="https://i0.wp.com/fullertonobserver.com/wp-content/uploads/2020/12/OCJail.jpg?resize=829%2C436&ssl=1"
            />
            <div className={styles.dogInfoContainer}>
              <div className={styles.dogName}>{dogName}</div>
              <div className={styles.dogNameSub}>Grad Age: {gradAge}</div>
              <div className={styles.dogNameSub}>Breed: {breed}</div>
            </div>
          </div>
        </Td>
        <Td>
          <ShowTags
            serviceTag={service}
            therapyTag={therapy}
            staffAdoptionTag={staffAdoption}
            specialTag={specialNeeds}
            disabledTag={deceased}
          />
        </Td>
        <Td>{facility}</Td>
        <Td>{adopter}</Td>
        <Td>
          <div>{phoneNumber}</div>
          <div>{email}</div>
        </Td>
        <Td>{address}</Td>
        <Td>
          <Button colorScheme="teal" size="sm" onClick={() => handleViewMore()}>
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
                <Th>Tags</Th>
                <Th>Facility</Th>
                <Th>Adopter</Th>
                <Th>Contact Info</Th>
                <Th>Address</Th>
                <Th />
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
