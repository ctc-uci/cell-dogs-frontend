/* eslint-disable */
import { Button, Input, Avatar, Textarea, Box, Flex } from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import './ViewMore.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';
import { BsPlusLg } from 'react-icons/bs';
import { ArrowBackIcon } from '@chakra-ui/icons';

// export const theme = extendTheme({
//   colors: {
//     brand: {
//       50: '#21307a',
//       60: '#c3cbdb',
//       70: '#f6f7fa',
//       80: '#96c93d',
//       90: '#25222a'
//     }
//   }
// })

const ViewMore = () => {
  const [facilityName, setFacilityName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { backend } = useBackend();

  const { state } = useLocation();

  const Navigate = useNavigate();

  const onClose = () => {
    Navigate('/facilities');
  };

  const showFacilityName = () => {
    if (facilityName == '') {
      return 'Enter Name';
    }
    return facilityName;
  };

  return (
    <Box>
      {console.log(state)}
      <BreadcrumbBar left={'Facilities > ' + showFacilityName()}>
        <Button
          size="sm"
          colorScheme="gray"
          m={0.1}
          justify="right"
          onClick={() => {
            Navigate('/add-facility');
          }}
        >
          <BsPlusLg />
          Add Facility
        </Button>
      </BreadcrumbBar>
      <Flex width="100%" justifyContent="flex-start" pt={4} ml={10}>
        <Button variant="link" leftIcon={<ArrowBackIcon />} onClick={() => Navigate('/facilities')}>
          Go Back
        </Button>
      </Flex>
      <Box className="facilityModalContent" p={5}>
        <div className="userInfoButtons">
          <div className="placeholder">
            <Avatar height="100px" width="100px" />
          </div>
          <div className="modalHeader">
            <h1 className="enterName">{showFacilityName()}</h1>
          </div>
          <div className="buttons">
            <Button className="editButton" width="62.5px" size="sm" color="gray" variant="outline">
              Edit
            </Button>
          </div>
        </div>

        <h3>Facility Name</h3>
        <div className="nameInput">
          <Input
            placeholder="OC Juvenile Hall"
            value={facilityName}
            onChange={e => setFacilityName(e.target.value)}
          />
        </div>
        <h3>Address</h3>
        <div className="addressInput">
          <Input placeholder="123 Irvine Way Fountain Valley, CA 92728" />
        </div>
        <h3>Notes</h3>
        <div className="notesInput">
          <Textarea height="150px" padding-top="0px" placeholder="Enter notes here" />
        </div>
        <div className="pocRow1">
          <div className="pocName">
            <h3>Name</h3>
            <div className="pocNameInput">
              <Input placeholder="Jane Smith" />
            </div>
          </div>
          <div className="pocTitle">
            <h3>Title</h3>
            <div className="pocTitleInput">
              <Input placeholder="Programs Officer" />
            </div>
          </div>
        </div>
        <div className="pocRow2">
          <div className="pocPhoneNumber">
            <h3>Phone Number</h3>
            <div className="pocPhoneNumberInput">
              <Input placeholder="(123)456-7890" />
            </div>
          </div>
          <div className="pocEmail">
            <h3>Email</h3>
            <div className="pocEmailInput">
              <Input placeholder="email@uci.edu" />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default ViewMore;
