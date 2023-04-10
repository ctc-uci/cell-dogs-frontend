import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Avatar, Textarea, Box, Flex } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';

const ViewDog = () => {
  const { id: dogId } = useParams();
  const { backend } = useBackend();
  const Navigate = useNavigate();

  const [editable, setEditable] = useState(false);
  const [dog, setDog] = useState({});
  const [adopterName, setAdopterName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [altName, setAltName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [grad, setGrad] = useState(0);
  const [chip, setChip] = useState('');
  const [chipNum, setChipNum] = useState(0);
  const [addrline, setAddrLine] = useState('');
  const [adoptcity, setAdoptCity] = useState('');
  const [adoptstate, setAdoptState] = useState('');
  const [zip, setZip] = useState('');
  const [adoptemail, setAdoptEmail] = useState('');
  const [fees, setFees] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [facility, setFacilities] = useState([]);
  const [unit, setUnit] = useState('');
  const [gradDate, setGradDate] = useState(new Date());
  const [groupNum, setGroupNum] = useState(0);
  const [shelter, setShelter] = useState('');
  const [animalID, setAnimalID] = useState(0);
  const [notes, setNotes] = useState('');

  const onClose = () => {
    Navigate('/');
  };

  const handleEditButton = () => {
    setEditable(true);
  };

  const getDog = async () => {
    try {
      const res = await backend.get(`/dog/${dogId}`);
      setDog(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  return (
    <Box>
      <BreadcrumbBar left={`Adoption Log > ${dog.dogname}`}>
        <Button
          leftIcon={<AddIcon />}
          size="sm"
          onClick={() => {
            Navigate('/dogs/new');
          }}
        >
          Add Dog
        </Button>
      </BreadcrumbBar>
      <Flex width="100%" justifyContent="flex-start" pt={4} ml={10}>
        <Button variant="link" leftIcon={<ArrowBackIcon />} onClick={onClose}>
          Go Back
        </Button>
      </Flex>
      <Box className="facilityModalContent" p={5}>
        <div className="userInfoButtons">
          <div className="placeholder">
            <Avatar height="100px" width="100px" />
          </div>
          <div className="modalHeader">
            <h1 className="enterName">{dog.dogname}</h1>
          </div>
          <div className="buttons">
            <Button
              className="editButton"
              // width="62.5px"
              size="sm"
              color="gray"
              variant="outline"
              onClick={() => handleEditButton()}
            >
              Edit Dog
            </Button>
          </div>
        </div>

        <h2>Adopter Info</h2>
        <h3>Name</h3>
        <div className="nameInput">
          <Input
            value={adopterName}
            disabled={!editable}
            onChange={e => setAdopterName(e.target.value)}
          />
        </div>
        <h3>Email</h3>
        <div className="addressInput">
          <Input disabled={!editable} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <h3>Notes</h3>
        <div className="notesInput">
          <Textarea
            disabled={!editable}
            height="150px"
            padding-top="0px"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
        <div className="pocRow1">
          <div className="pocName">
            <h3>Name</h3>
            <div className="pocNameInput">
              <Input
                disabled={!editable}
                value={contactName}
                onChange={e => setContactName(e.target.value)}
              />
            </div>
          </div>
          <div className="pocTitle">
            <h3>Title</h3>
            <div className="pocTitleInput">
              <Input disabled={!editable} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="pocRow2">
          <div className="pocPhoneNumber">
            <h3>Phone Number</h3>
            <div className="pocPhoneNumberInput">
              <Input
                disabled={!editable}
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="pocEmail">
            <h3>Email</h3>
            <div className="pocEmailInput">
              <Input disabled={!editable} value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ViewDog;
