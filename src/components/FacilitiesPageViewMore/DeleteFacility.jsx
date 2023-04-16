import React from 'react';
import {
    useDisclosure,
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { useBackend } from '../../contexts/BackendContext';


function DeleteFacility(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { backend } = useBackend();
    function ShowModal({ isOpen, onClose }) {
        return (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Remove Facility</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to remove the facility from the adoption log? Once you
                delete them, there is no way of getting the information back
              </ModalBody>
    
              <ModalFooter>
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
                <ButtonGroup variant="outline" spacing="6">
                  <Button
                    className="deleteButton"
                    width="250px"
                    size="sm"
                    bg="#21307a"
                    color="white"
                    onClick={() => handleConfirmDelete(props.id)}
                  >
                    Yes, remove the facility
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        );
    }
    
    const handleConfirmDelete = async id => {
    try {
        console.log(`Deleted facility with id ${id}`);
        const response = await backend.delete(`/facility/${id}`);

        onClose();

        if (response.status === 200) {
            CreateToast({
                description: `${facilityName} deleted successfully`,
                status: 'success',
                toast,
            });
        }

        } finally {
            setLoading(false);
        }
    };
    
  return (
    <React.Component>
        <Button colorScheme="red" width="250px" size="sm" onClick={onOpen}>
            Remove Facility
        </Button>

        <ShowModal isOpen={isOpen} onClose={onClose} />
    </React.Component>
  );
}

export default DeleteFacility;