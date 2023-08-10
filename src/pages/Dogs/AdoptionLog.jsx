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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateToast from '../../components/Toasts/CreateToast';
import { useBackend } from '../../contexts/BackendContext';
import ShowTags from '../AddDog/ShowTags';
import styles from './AdoptionLog.module.css';
import calculateDogAgeAtGraduation from './calculateDogAgeAtGraduation';
// import { DropDownList } from "@progress/kendo-react-dropdowns";
const AdoptionLog = props => {
  const Navigate = useNavigate();
  const { backend } = useBackend();
  const { filter, tableName, tableId, data, getCheckedDogs } = props;
  const [copyEmails, setCopyEmails] = useState(new Set());
  const toast = useToast();

  const filteredDogs = data.filter(
    dogs =>
      (dogs[filter] == true ||
        filter == '' ||
        filter == 'all' ||
        (filter == 'allMales' && dogs.gender == 'Male') ||
        (filter == 'allFemales' && dogs.gender == 'Female')) &&
      dogs.facilityid == tableId,
  );

  useEffect(() => {
    if (filteredDogs.length > 0) {
      setCopyEmails(new Set());
    }
    filteredDogs.map(dog => {
      setCopyEmails(copyEmails => new Set([...copyEmails, dog.adoptemail]));
    });
  }, [filteredDogs]);

  const [checked, setChecked] = useState(filteredDogs.map(() => false));
  const [allChecked, setAllChecked] = useState(checked.every(Boolean));
  const isIndeterminate = checked.some(Boolean) && checked.includes(false);

  const handleViewMore = dogid => {
    Navigate(`/dog/${dogid}`);
  };

  const handleSelectFacility = () => {
    setChecked(data.map(() => !allChecked));
    setAllChecked(!allChecked);
  };

  const handleCopyEmail = () => {
    CreateToast({
      description: `Copied Adopters Emails!`,
      status: 'success',
      toast,
    });
    navigator.clipboard.writeText([...copyEmails].join(', '));
  };

  const handleAllDogSelection = e => {
    setChecked(filteredDogs.map(() => e.target.checked));

    const allDogs = JSON.parse(e.target.value);

    allDogs.map(dog => {
      getCheckedDogs(JSON.stringify(dog)); // this needs to be fixed
    });
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
      image,
    } = dog;

    const dogName = dogname;
    const gradAge = calculateDogAgeAtGraduation(graddate, age);
    const facility = shelter;
    const adopter = adoptername;
    const phoneNumber = adopterphone;
    const email = adoptemail;
    const address = `${addrline} ${adoptcity} ${adoptstate}`;

    const handleDogSelection = (e, index) => {
      setChecked([...checked.slice(0, index), e.target.checked, ...checked.slice(index + 1)]);
      getCheckedDogs(e.target.value);
    };

    return (
      <Tr key={props.key}>
        <Td>
          <Checkbox
            isChecked={checked[index]}
            onChange={e => handleDogSelection(e, index)}
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
  if (filteredDogs.length > 0) {
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
                      isChecked={!checked.includes(false)}
                      isIndeterminate={isIndeterminate}
                      onChange={e => handleAllDogSelection(e)}
                      value={JSON.stringify(filteredDogs)}
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
  }
};

export default AdoptionLog;
