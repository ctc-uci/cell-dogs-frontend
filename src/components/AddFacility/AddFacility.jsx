import { Button, Input, Avatar, Textarea, Box } from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import './AddFacility.css';
import { useNavigate } from 'react-router-dom';

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

const AddFacility = () => {
  const Navigate = useNavigate();
  const onClose = () => {
    Navigate('/facilities');
  };
  return (
    <Box className="facilityModalContent" p={5}>
      <div className="placeholder">
        <Avatar height="100px" width="100px" />
      </div>
      <div className="modalHeader">
        <h1 className="enterName">Enter Name</h1>
      </div>

      <div className="buttons">
        <Button
          className="cancelButton"
          width="250px"
          size="sm"
          color="--cds-blue-2"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="saveButton"
          width="250px"
          size="sm"
          bg="#21307a"
          color="white"
          onClick={onClose}
        >
          Save
        </Button>
      </div>
      <div className="pointsOfContact">
        <h1 className="POCText">Points of Contact</h1>
        <Button size="sm" colorScheme="gray" color="--cds-grey-1" onClick={onClose}>
          Add Another Point of Contact
        </Button>
      </div>
      <h3>Facility Name</h3>
      <div className="nameInput">
        <Input placeholder="OC Juvenile Hall" />
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
  );
};
export default AddFacility;
