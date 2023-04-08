import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Avatar, Textarea, Box, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import BreadcrumbBar from '../../components/BreadcrumbBar/BreadcrumbBar';

const ViewDog = () => {
  const { id: dogId } = useParams();
  const [editable, setEditable] = useState(false);
  const { backend } = useBackend();
  const Navigate = useNavigate();

  const [dog, setDog] = useState({});

  const handleEditButton = () => {
    setEditable(true);
  };

  const getDog = async () => {
    try {
      const res = await backend.get(`/dog/${dogId}`);
      setDog(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  return (
    <Box>
      <BreadcrumbBar left={`Adoption Log > ${dog.name}`}>
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
    </Box>
  );
};

export default ViewDog;
