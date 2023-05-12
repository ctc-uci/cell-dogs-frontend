/* eslint-disable */
import { WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/AddFacility/AddFacility.css';
import { screenWidthExceeds } from '../util/utils';
import './ShowCancelModal.css';

function ShowCancelModal({ isOpen, onClose, pageName, discardNavigationLocation }) {
  const isLargerThan768 = screenWidthExceeds(768);
  const Navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="modal">
      <ModalOverlay />
      <ModalContent className="modal">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <WarningIcon w="2rem" h="2rem" color="red.500" marginTop="2rem" />
          <ModalHeader>Changes not saved!</ModalHeader>
        </Flex>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to discard all changes made? By clicking 'Discard all changes' you
          will be sent back to the {pageName} page.
        </ModalBody>
        {isLargerThan768 && (
          <ModalFooter width="100%" display="flex" justifyContent="space-between">
            <Button
              className="cancelButton"
              // width="250px"
              width="16rem"
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
                width="12rem"
                size="sm"
                bg="#21307a"
                color="white"
                onClick={() => Navigate(`/${discardNavigationLocation}`)}
              >
                Discard all changes
              </Button>
            </ButtonGroup>
          </ModalFooter>
        )}
        {!isLargerThan768 && (
          <ModalFooter width="100%" display="flex" flexDirection="column" gap="10px">
            <ButtonGroup variant="outline" spacing="6" width="100%">
              <Button
                className="deleteButton"
                size="sm"
                width="100%"
                bg="#21307a"
                color="white"
                onClick={() => Navigate(`/${discardNavigationLocation}`)}
              >
                Discard all changes
              </Button>
            </ButtonGroup>
            <Button
              className="cancelButton"
              width="100%"
              size="sm"
              color="--cds-blue-2"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ShowCancelModal;
