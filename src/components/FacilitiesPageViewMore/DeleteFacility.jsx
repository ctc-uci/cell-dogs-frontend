import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

function DeleteFacility({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { backend } = useBackend();
  const handleConfirmDelete = async () => {
    // try {
    //   console.log(`Deleted facility with id ${id}`);
    //   const response = await backend.delete(`/facility/${id}`);
    //   onClose();
    //   if (response.status === 200) {
    //     CreateToast({
    //       description: `${facilityName} deleted successfully`,
    //       status: 'success',
    //       toast,
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };
  function ShowModal({ isOpen: isOpenPassed, onClose: onClosePassed }) {
    return (
      <Modal isOpen={isOpenPassed} onClose={onClosePassed}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Facility</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove the facility from the adoption log? Once you delete
            them, there is no way of getting the information back
          </ModalBody>

          <ModalFooter>
            <Button
              className="cancelButton"
              width="250px"
              size="sm"
              color="--cds-blue-2"
              variant="outline"
              onClick={onClosePassed}
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
                onClick={() => handleConfirmDelete(id)}
              >
                Yes, remove the facility
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

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
