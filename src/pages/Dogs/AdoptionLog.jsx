/* eslint-disable */
import {
  Avatar,
  Button,
  Checkbox,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import ShowTags from '../AddDog/ShowTags';
import styles from './AdoptionLog.module.css';

// import { DropDownList } from "@progress/kendo-react-dropdowns";
const AdoptionLog = props => {
  const Navigate = useNavigate();
  const { backend } = useBackend();
  const { filter, tableName, tableId, data, setCheckedDogs, checkedDogs } = props;
  const [checked, setChecked] = useState(data.map(() => false));
  // const [checkedDogs, setCheckedDogs] = useState([]);
  const [allChecked, setAllChecked] = useState(checked.every(Boolean));
  const isIndeterminate = checked.some(Boolean) && !allChecked;

  const [copyEmails, setCopyEmails] = useState(new Set());

  const filteredDogs = data.filter(
    dogs =>
      dogs[filter] == true ||
      filter == '' ||
      filter == 'all' ||
      (filter == 'allMales' && dogs.gender == 'Male') ||
      (filter == 'allFemales' && dogs.gender == 'Female'),
  );

  const handleViewMore = dogid => {
    Navigate(`/dog/${dogid}`);
  };

  const handleSelectFacility = () => {
    setChecked(data.map(() => !allChecked));
    setAllChecked(!allChecked);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText([...copyEmails].join(', '));
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

  const dogTableRow = (dog, index) => {
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
      facilityid,
      gender,
      altname,
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

    useEffect(() => {
      setCopyEmails(copyEmails => new Set([...copyEmails, email]));
    }, [email]);

    const handleDogSelection = e => {
      console.log(e.target.value);
      setChecked([...checked.slice(0, index), e.target.checked, ...checked.slice(index + 1)]);
      console.log('test');
      let updateDogsList = [...checkedDogs];
      if (e.target.checked) {
        updateDogsList = [...checkedDogs, e.target.value];
      } else {
        updateDogsList.splice(checkedDogs.indexOf(e.target.value), 1);
      }
      setCheckedDogs(updateDogsList);
    };

    return (
      <Tr key={props.key}>
        <Td>
          <Checkbox
            isChecked={checked[index]}
            onChange={e => handleDogSelection(e)}
            value={JSON.stringify(dog)}
          />
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
              <div className={styles.dogName}>
                {dogName}
                <div className={styles.altName}>aka "{altname}"</div>
              </div>
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
          <Button colorScheme="teal" size="sm" onClick={() => handleViewMore(dogid)}>
            View More
          </Button>
        </Td>
      </Tr>
    );
  };

  return (
    <div className={styles.adoptionLog}>
      <div className={styles.tableHeader}>
        <Heading as="lg" size="l">
          {tableName}
        </Heading>
        <Button size="sm" variant="outline" onClick={() => handleSelectFacility()}>
          Select Facility
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleCopyEmail()}>
          Copy Adopters&apos; Emails
        </Button>
      </div>
      <div className="table">
        <TableContainer>
          <Table className={styles.table} variant="simple" borderRadius="10">
            <Thead backgroundColor="#F7FAFC">
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={e => setChecked(data.map(() => e.target.checked))}
                  />
                </Th>
                <Th>Dog Name</Th>
                <Th>Tags</Th>
                <Th>Facility</Th>
                <Th>Adopter</Th>
                <Th>Contact Info</Th>
                <Th>Address</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor="#FDFDFD">
              {filteredDogs.map((dog, index) => dogTableRow(dog, index))}
              <Tr />
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdoptionLog;
